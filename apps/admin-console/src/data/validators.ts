import type { MockDatasets } from './types';

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

  validateArray('organizations', data.organizations, issues);
  validateArray('users', data.users, issues);
  validateArray('roles', data.roles, issues);
  validateArray('wallets', data.wallets, issues);
  validateArray('policies', data.policies, issues);
  validateArray('approvals', data.approvals, issues);
  validateArray('riskReviews', data.riskReviews, issues);
  validateArray('auditEvents', data.auditEvents, issues);
  validateArray('webhooks', data.webhooks, issues);

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

  inspectValue('all', data, issues);

  return issues;
}
