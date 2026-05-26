import type { MockDatasets } from './types';
import { canonicalEvents, canonicalStatuses, forbiddenPublicEvents } from './canonical';

export interface ValidationIssue {
  dataset: string;
  message: string;
}

const secretIndicators = [
  /ghp_/i,
  /github_pat_/i,
  /\bsk-[a-z0-9_-]{8,}\b/i,
  /BEGIN RSA PRIVATE KEY/i,
  /BEGIN OPENSSH PRIVATE KEY/i,
  /password=/i,
  /api_key=/i,
  /secret=/i
];

function inspectValue(dataset: string, value: unknown, issues: ValidationIssue[]): void {
  if (typeof value === 'string') {
    const matched = secretIndicators.find((pattern) => pattern.test(value));
    if (matched) {
      issues.push({ dataset, message: `Value matches forbidden indicator ${matched.source}` });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => inspectValue(dataset, item, issues));
    return;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((nestedValue) => inspectValue(dataset, nestedValue, issues));
  }
}

function validateArray(dataset: string, records: Array<{ id?: string }>, issues: ValidationIssue[]): void {
  if (!Array.isArray(records)) {
    issues.push({ dataset, message: 'Dataset must be a JSON array.' });
    return;
  }

  if (records.length === 0) {
    issues.push({ dataset, message: 'Dataset must be non-empty for the public demo.' });
  }

  records.forEach((record, index) => {
    if (!record.id) {
      issues.push({ dataset, message: `Record at index ${index} is missing an id.` });
    }
  });
}

export function validateMockData(data: MockDatasets): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const validStatuses = new Set<string>(canonicalStatuses);
  const validEvents = new Set<string>(canonicalEvents);
  const forbiddenEvents = new Set<string>(forbiddenPublicEvents);

  validateArray('organizations', data.organizations, issues);
  validateArray('users', data.users, issues);
  validateArray('roles', data.roles, issues);
  validateArray('wallets', data.wallets, issues);
  validateArray('policies', data.policies, issues);
  validateArray('approvals', data.approvals, issues);
  validateArray('riskReviews', data.riskReviews, issues);
  validateArray('auditEvents', data.auditEvents, issues);
  validateArray('webhooks', data.webhooks, issues);
  validateArray('reconciliation', data.reconciliation, issues);

  data.policies.forEach((policy) => {
    if (policy.mockOnly !== true) {
      issues.push({ dataset: 'policies', message: `${policy.id} must be labeled mockOnly.` });
    }
  });

  data.riskReviews.forEach((review) => {
    if (review.mockOnly !== true) {
      issues.push({ dataset: 'riskReviews', message: `${review.id} must be labeled mockOnly.` });
    }
  });

  data.webhooks.forEach((webhook) => {
    if (!webhook.target.includes('example.invalid') && !webhook.target.toLowerCase().includes('redacted')) {
      issues.push({ dataset: 'webhooks', message: `${webhook.id} target must be mock or redacted.` });
    }
  });

  const statusRecords: Array<[string, string, string]> = [
    ...data.organizations.map((record) => ['organizations', record.id, record.status] as [string, string, string]),
    ...data.users.map((record) => ['users', record.id, record.status] as [string, string, string]),
    ...data.wallets.map((record) => ['wallets', record.id, record.status] as [string, string, string]),
    ...data.policies.map((record) => ['policies', record.id, record.status] as [string, string, string]),
    ...data.approvals.map((record) => ['approvals', record.id, record.status] as [string, string, string]),
    ...data.riskReviews.map((record) => ['riskReviews', record.id, record.status] as [string, string, string]),
    ...data.webhooks.map((record) => ['webhooks', record.id, record.status] as [string, string, string]),
    ...data.webhooks.map((record) => ['webhooks', record.id, record.lastDeliveryStatus] as [string, string, string]),
    ...data.webhooks.map((record) => ['webhooks', record.id, record.secretStatus] as [string, string, string]),
    ...data.reconciliation.map((record) => ['reconciliation', record.id, record.status] as [string, string, string])
  ];

  statusRecords.forEach(([dataset, id, status]) => {
    if (!validStatuses.has(status)) {
      issues.push({ dataset, message: `${id} uses non-canonical status ${status}.` });
    }
  });

  data.auditEvents.forEach((event) => {
    if (forbiddenEvents.has(event.action)) {
      issues.push({ dataset: 'auditEvents', message: `${event.id} uses forbidden public event ${event.action}.` });
    }

    if (!validEvents.has(event.action)) {
      issues.push({ dataset: 'auditEvents', message: `${event.id} uses non-canonical event ${event.action}.` });
    }
  });

  data.webhooks.forEach((webhook) => {
    webhook.eventTypes.forEach((eventType) => {
      if (forbiddenEvents.has(eventType)) {
        issues.push({ dataset: 'webhooks', message: `${webhook.id} uses forbidden public event ${eventType}.` });
      }

      if (!validEvents.has(eventType)) {
        issues.push({ dataset: 'webhooks', message: `${webhook.id} uses non-canonical event ${eventType}.` });
      }
    });
  });

  inspectValue('all', data, issues);

  return issues;
}
