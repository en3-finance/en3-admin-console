export type ModuleId =
  | 'dashboard'
  | 'organizations'
  | 'users'
  | 'roles'
  | 'wallets'
  | 'reconciliation'
  | 'policies'
  | 'approvals'
  | 'simulation'
  | 'risk'
  | 'audit'
  | 'webhooks';

export interface ModuleDefinition {
  id: ModuleId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface Organization {
  id: string;
  name: string;
  status: string;
  market: string;
  productType: string;
  operatingMode: string;
  createdAt: string;
}

export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  roleId: string;
  status: string;
  lastActiveAt: string | null;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  scope: string;
  permissions: string[];
}

export type WalletOwnerType = 'user' | 'operating' | 'settlement' | 'system';

export interface Wallet {
  id: string;
  organizationId: string;
  label: string;
  ownerType: WalletOwnerType;
  ownerId: string;
  asset: string;
  network: string;
  balance: string;
  status: string;
  controlMode: string;
}

export interface PolicyRule {
  type: string;
  action: string;
  asset?: string;
  threshold?: string;
  status?: string;
  signal?: string;
}

export interface Policy {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  status: string;
  scope: string;
  mockOnly: boolean;
  rules: PolicyRule[];
}

export interface TransactionSimulation {
  id: string;
  sourceWalletId: string;
  destination: string;
  asset: string;
  amount: string;
  network: string;
  policyResult: string;
  riskResult: string;
  disclaimer: string;
}

export interface Approval {
  id: string;
  organizationId: string;
  transactionId: string;
  policyId: string;
  riskReviewId: string;
  status: string;
  reason: string;
  requestedBy: string;
  createdAt: string;
  transaction: TransactionSimulation;
}

export interface RiskReview {
  id: string;
  organizationId: string;
  transactionId: string;
  status: string;
  severity: string;
  signals: string[];
  recommendedAction: string;
  mockOnly: boolean;
}

export interface AuditEvent {
  id: string;
  organizationId: string;
  actorType: string;
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  summary: string;
  createdAt: string;
}

export interface Webhook {
  id: string;
  organizationId: string;
  label: string;
  eventTypes: string[];
  target: string;
  status: string;
  lastDeliveryStatus: string;
  secretStatus: string;
}

export interface ReconciliationItem {
  id: string;
  organizationId: string;
  statementDate: string;
  asset: string;
  expectedBalance: string;
  observedBalance: string;
  variance: string;
  status: string;
  owner: string;
  summary: string;
}

export interface MockDatasets {
  organizations: Organization[];
  users: User[];
  roles: Role[];
  wallets: Wallet[];
  policies: Policy[];
  approvals: Approval[];
  riskReviews: RiskReview[];
  auditEvents: AuditEvent[];
  webhooks: Webhook[];
  reconciliation: ReconciliationItem[];
}

export interface ApprovalDecision {
  status: 'approved' | 'rejected';
  decidedAt: string;
  note: string;
}
