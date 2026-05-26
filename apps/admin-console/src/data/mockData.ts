import organizationsJson from '../../../../mock/organizations.json';
import usersJson from '../../../../mock/users.json';
import rolesJson from '../../../../mock/roles.json';
import walletsJson from '../../../../mock/wallets.json';
import policiesJson from '../../../../mock/policies.json';
import approvalsJson from '../../../../mock/approvals.json';
import riskReviewsJson from '../../../../mock/risk-reviews.json';
import auditEventsJson from '../../../../mock/audit-events.json';
import webhooksJson from '../../../../mock/webhooks.json';
import type {
  Approval,
  AuditEvent,
  MockDatasets,
  ModuleDefinition,
  Organization,
  Policy,
  RiskReview,
  Role,
  User,
  Wallet,
  Webhook
} from './types';

export const moduleDefinitions: ModuleDefinition[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    shortLabel: 'Dashboard',
    description: 'Mock posture across tenants, wallets, approvals, risk, audit, and integrations.'
  },
  {
    id: 'organizations',
    label: 'Organizations',
    shortLabel: 'Orgs',
    description: 'Reference tenants and product operating modes.'
  },
  {
    id: 'users',
    label: 'Users',
    shortLabel: 'Users',
    description: 'Mock admin and operator identities.'
  },
  {
    id: 'roles',
    label: 'Roles / RBAC',
    shortLabel: 'RBAC',
    description: 'Reference roles, scopes, and permissions.'
  },
  {
    id: 'wallets',
    label: 'Wallet Registry',
    shortLabel: 'Wallets',
    description: 'User, settlement, treasury, and system wallet records.'
  },
  {
    id: 'treasury',
    label: 'Treasury / System Wallets',
    shortLabel: 'Treasury',
    description: 'Operational wallet posture in mock form.'
  },
  {
    id: 'policies',
    label: 'Policies',
    shortLabel: 'Policies',
    description: 'Non-enforcing policy examples and approval rules.'
  },
  {
    id: 'approvals',
    label: 'Pending Approvals',
    shortLabel: 'Approvals',
    description: 'Mock approval queue and transaction detail.'
  },
  {
    id: 'simulation',
    label: 'Transaction Simulation',
    shortLabel: 'Simulation',
    description: 'Deterministic no-execution transfer review.'
  },
  {
    id: 'risk',
    label: 'Risk Review',
    shortLabel: 'Risk',
    description: 'Mock KYT, sanctions, and address-risk style signals.'
  },
  {
    id: 'audit',
    label: 'Audit Log',
    shortLabel: 'Audit',
    description: 'Reference event timeline for operational visibility.'
  },
  {
    id: 'webhooks',
    label: 'Webhooks',
    shortLabel: 'Webhooks',
    description: 'Mock event subscriptions without delivery.'
  }
];

export const datasets: MockDatasets = {
  organizations: organizationsJson as Organization[],
  users: usersJson as User[],
  roles: rolesJson as Role[],
  wallets: walletsJson as Wallet[],
  policies: policiesJson as Policy[],
  approvals: approvalsJson as Approval[],
  riskReviews: riskReviewsJson as RiskReview[],
  auditEvents: auditEventsJson as AuditEvent[],
  webhooks: webhooksJson as Webhook[]
};

export const treasuryWallets = datasets.wallets.filter((wallet) =>
  ['treasury', 'system', 'settlement'].includes(wallet.ownerType)
);

export const simulationTransactions = datasets.approvals.map((approval) => ({
  ...approval.transaction,
  approvalId: approval.id,
  organizationId: approval.organizationId,
  policyId: approval.policyId,
  riskReviewId: approval.riskReviewId
}));

export function getOrganizationName(id: string): string {
  return datasets.organizations.find((organization) => organization.id === id)?.name ?? id;
}

export function getRoleName(id: string): string {
  return datasets.roles.find((role) => role.id === id)?.name ?? id;
}

export function getWalletLabel(id: string): string {
  return datasets.wallets.find((wallet) => wallet.id === id)?.label ?? id;
}

export function getUserName(id: string): string {
  return datasets.users.find((user) => user.id === id)?.name ?? id;
}

export function findPolicy(id: string): Policy | undefined {
  return datasets.policies.find((policy) => policy.id === id);
}

export function findRiskReview(id: string): RiskReview | undefined {
  return datasets.riskReviews.find((review) => review.id === id);
}

export function findSourceWallet(approval: Approval): Wallet | undefined {
  return datasets.wallets.find((wallet) => wallet.id === approval.transaction.sourceWalletId);
}

export function auditEventsForResource(resourceId: string): AuditEvent[] {
  return datasets.auditEvents.filter((event) => event.resourceId === resourceId);
}
