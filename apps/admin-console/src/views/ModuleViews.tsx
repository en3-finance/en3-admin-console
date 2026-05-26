import { Eye } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import {
  datasets,
  findPolicy,
  findRiskReview,
  findSourceWallet,
  getOrganizationName,
  getRoleName,
  operatingWallets
} from '../data/mockData';
import { formatAmount, formatDateTime, humanize } from '../data/formatters';
import type {
  Approval,
  ApprovalDecision,
  Policy,
  ReconciliationItem,
  RiskReview,
  Role,
  User,
  Wallet,
  Webhook
} from '../data/types';
import { PolicyDetail } from './PolicyDetail';
import { ApprovalDetail } from './ApprovalDetail';

function tagList(values: string[]) {
  return (
    <div className="tag-list">
      {values.map((value) => (
        <span className="tag" key={value}>
          {value}
        </span>
      ))}
    </div>
  );
}

export function OrganizationsView() {
  return (
    <section className="view-stack" aria-label="Organizations">
      <DataTable
        rows={datasets.organizations}
        getRowKey={(row) => row.id}
        emptyTitle="No organizations"
        emptyMessage="Mock organization records would appear here."
        columns={[
          { key: 'name', header: 'Organization', render: (row) => <strong>{row.name}</strong> },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
          { key: 'market', header: 'Market', render: (row) => row.market },
          { key: 'product', header: 'Product', render: (row) => row.productType },
          { key: 'mode', header: 'Operating mode', render: (row) => row.operatingMode }
        ]}
      />
    </section>
  );
}

export function UsersView() {
  return (
    <section className="view-stack" aria-label="Users">
      <DataTable<User>
        rows={datasets.users}
        getRowKey={(row) => row.id}
        emptyTitle="No users"
        emptyMessage="Mock operator identities would appear here."
        columns={[
          { key: 'name', header: 'User', render: (row) => <strong>{row.name}</strong> },
          { key: 'org', header: 'Organization', render: (row) => getOrganizationName(row.organizationId) },
          { key: 'role', header: 'Role', render: (row) => getRoleName(row.roleId) },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
          { key: 'active', header: 'Last active', render: (row) => formatDateTime(row.lastActiveAt) }
        ]}
      />
    </section>
  );
}

export function RolesView() {
  return (
    <section className="view-stack" aria-label="Roles and RBAC">
      <DataTable<Role>
        rows={datasets.roles}
        getRowKey={(row) => row.id}
        emptyTitle="No roles"
        emptyMessage="Mock RBAC role records would appear here."
        columns={[
          { key: 'name', header: 'Role', render: (row) => <strong>{row.name}</strong> },
          { key: 'scope', header: 'Scope', render: (row) => humanize(row.scope) },
          { key: 'description', header: 'Description', render: (row) => row.description },
          { key: 'permissions', header: 'Permissions', render: (row) => tagList(row.permissions) }
        ]}
      />
    </section>
  );
}

export function WalletRegistryView() {
  return (
    <section className="view-stack" aria-label="Wallet Registry">
      <DataTable<Wallet>
        rows={datasets.wallets}
        getRowKey={(row) => row.id}
        emptyTitle="No wallets"
        emptyMessage="Mock wallet registry entries would appear here."
        columns={[
          { key: 'label', header: 'Wallet', render: (row) => <strong>{row.label}</strong> },
          { key: 'owner', header: 'Owner type', render: (row) => humanize(row.ownerType) },
          { key: 'balance', header: 'Balance', render: (row) => formatAmount(row.balance, row.asset) },
          { key: 'network', header: 'Network', render: (row) => row.network },
          { key: 'control', header: 'Control mode', render: (row) => row.controlMode },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> }
        ]}
      />
    </section>
  );
}

export function ReconciliationView() {
  return (
    <section className="view-stack" aria-label="Reconciliation">
      <div className="reference-banner">
        <div>
          <p className="eyebrow">Synthetic reconciliation</p>
          <h3>Balance checks and exception states without ledger integration</h3>
        </div>
        <StatusBadge value="open" label="Mock review queue" />
      </div>
      <DataTable<ReconciliationItem>
        rows={datasets.reconciliation}
        getRowKey={(row) => row.id}
        emptyTitle="No reconciliation items"
        emptyMessage="Synthetic reconciliation exceptions would appear here."
        columns={[
          { key: 'id', header: 'Item', render: (row) => <strong>{row.id}</strong> },
          { key: 'org', header: 'Organization', render: (row) => getOrganizationName(row.organizationId) },
          { key: 'date', header: 'Statement date', render: (row) => row.statementDate },
          { key: 'expected', header: 'Expected', render: (row) => formatAmount(row.expectedBalance, row.asset) },
          { key: 'observed', header: 'Observed', render: (row) => formatAmount(row.observedBalance, row.asset) },
          { key: 'variance', header: 'Variance', render: (row) => formatAmount(row.variance, row.asset) },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
          { key: 'summary', header: 'Summary', render: (row) => row.summary }
        ]}
      />
      <article className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Operating wallet context</p>
            <h3>Display-only balances used by the synthetic review</h3>
          </div>
          <span className="count-pill">{operatingWallets.length} wallets</span>
        </div>
        <DataTable<Wallet>
          rows={operatingWallets}
          getRowKey={(row) => row.id}
          emptyTitle="No operating wallets"
          emptyMessage="Operating, settlement, and system wallets would appear here in mock form."
          columns={[
            { key: 'label', header: 'Wallet', render: (row) => <strong>{row.label}</strong> },
            { key: 'type', header: 'Type', render: (row) => humanize(row.ownerType) },
            { key: 'balance', header: 'Mock balance', render: (row) => formatAmount(row.balance, row.asset) },
            { key: 'control', header: 'Control mode', render: (row) => row.controlMode },
            { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> }
          ]}
        />
      </article>
    </section>
  );
}

interface PoliciesViewProps {
  selectedPolicyId: string;
  onSelectPolicy: (policyId: string) => void;
}

export function PoliciesView({ selectedPolicyId, onSelectPolicy }: PoliciesViewProps) {
  const selectedPolicy = findPolicy(selectedPolicyId) ?? datasets.policies[0];

  return (
    <section className="split-grid split-grid--detail" aria-label="Policies">
      <div className="view-stack">
        <DataTable<Policy>
          rows={datasets.policies}
          getRowKey={(row) => row.id}
          emptyTitle="No policies"
          emptyMessage="Mock policy examples would appear here."
          columns={[
            { key: 'name', header: 'Policy', render: (row) => <strong>{row.name}</strong> },
            { key: 'scope', header: 'Scope', render: (row) => humanize(row.scope) },
            { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
            {
              key: 'actions',
              header: 'Detail',
              render: (row) => (
                <button type="button" className="table-action" onClick={() => onSelectPolicy(row.id)}>
                  <Eye aria-hidden="true" size={15} />
                  View policy
                </button>
              )
            }
          ]}
        />
      </div>
      <PolicyDetail policy={selectedPolicy} />
    </section>
  );
}

interface ApprovalsViewProps {
  selectedApprovalId: string;
  decisions: Record<string, ApprovalDecision>;
  onSelectApproval: (approvalId: string) => void;
  onDecision: (approvalId: string, status: ApprovalDecision['status']) => void;
}

export function ApprovalsView({
  selectedApprovalId,
  decisions,
  onSelectApproval,
  onDecision
}: ApprovalsViewProps) {
  const selectedApproval =
    datasets.approvals.find((approval) => approval.id === selectedApprovalId) ?? datasets.approvals[0];
  const linkedPolicy = selectedApproval ? findPolicy(selectedApproval.policyId) : undefined;
  const linkedRiskReview = selectedApproval ? findRiskReview(selectedApproval.riskReviewId) : undefined;
  const sourceWallet = selectedApproval ? findSourceWallet(selectedApproval) : undefined;
  const linkedAuditEvents = selectedApproval
    ? datasets.auditEvents.filter((event) =>
        [selectedApproval.transactionId, selectedApproval.policyId, selectedApproval.riskReviewId].includes(
          event.resourceId
        )
      )
    : [];

  return (
    <section className="split-grid split-grid--detail" aria-label="Pending Approvals">
      <div className="view-stack">
        <DataTable<Approval>
          rows={datasets.approvals}
          getRowKey={(row) => row.id}
          emptyTitle="No approvals"
          emptyMessage="Pending mock approvals would appear here."
          columns={[
            { key: 'id', header: 'Approval', render: (row) => <strong>{row.id}</strong> },
            {
              key: 'amount',
              header: 'Amount',
              render: (row) => formatAmount(row.transaction.amount, row.transaction.asset)
            },
            {
              key: 'policy',
              header: 'Policy',
              render: (row) => findPolicy(row.policyId)?.name ?? row.policyId
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge value={decisions[row.id]?.status ?? row.status} />
            },
            {
              key: 'detail',
              header: 'Detail',
              render: (row) => (
                <button type="button" className="table-action" onClick={() => onSelectApproval(row.id)}>
                  <Eye aria-hidden="true" size={15} />
                  Open detail
                </button>
              )
            }
          ]}
        />
      </div>
      <ApprovalDetail
        approval={selectedApproval}
        policy={linkedPolicy}
        riskReview={linkedRiskReview}
        sourceWallet={sourceWallet}
        auditEvents={linkedAuditEvents}
        decision={selectedApproval ? decisions[selectedApproval.id] : undefined}
        onDecision={onDecision}
      />
    </section>
  );
}

export function RiskReviewView() {
  return (
    <section className="view-stack" aria-label="Risk Review">
      <div className="reference-banner">
        <div>
          <p className="eyebrow">Compliance-readiness interface</p>
          <h3>Mock signals only; no sanctions, KYT, or address-risk vendor integration.</h3>
        </div>
        <StatusBadge value="review_required" label="Reference review states" />
      </div>
      <DataTable<RiskReview>
        rows={datasets.riskReviews}
        getRowKey={(row) => row.id}
        emptyTitle="No risk reviews"
        emptyMessage="Mock risk review records would appear here."
        columns={[
          { key: 'id', header: 'Review', render: (row) => <strong>{row.id}</strong> },
          { key: 'transaction', header: 'Transaction', render: (row) => row.transactionId },
          { key: 'severity', header: 'Severity', render: (row) => <StatusBadge value={row.severity} /> },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
          { key: 'signals', header: 'Mock signals', render: (row) => tagList(row.signals) },
          { key: 'action', header: 'Reference action', render: (row) => row.recommendedAction }
        ]}
      />
    </section>
  );
}

export function WebhooksView() {
  return (
    <section className="view-stack" aria-label="Webhooks">
      <div className="reference-banner">
        <div>
          <p className="eyebrow">Integration readiness</p>
          <h3>Webhook subscriptions are examples only and do not deliver events.</h3>
        </div>
        <StatusBadge value="mock_reference" label="No network delivery" />
      </div>
      <DataTable<Webhook>
        rows={datasets.webhooks}
        getRowKey={(row) => row.id}
        emptyTitle="No webhooks"
        emptyMessage="Mock webhook subscriptions would appear here."
        columns={[
          { key: 'label', header: 'Subscription', render: (row) => <strong>{row.label}</strong> },
          { key: 'org', header: 'Organization', render: (row) => getOrganizationName(row.organizationId) },
          { key: 'events', header: 'Events', render: (row) => tagList(row.eventTypes) },
          { key: 'target', header: 'Mock target', render: (row) => row.target },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
          { key: 'delivery', header: 'Last delivery', render: (row) => <StatusBadge value={row.lastDeliveryStatus} /> }
        ]}
      />
    </section>
  );
}
