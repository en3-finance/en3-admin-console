import { Check, FileWarning, X } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { formatAmount, formatDateTime, humanize } from '../data/formatters';
import { getOrganizationName, getUserName, getWalletLabel } from '../data/mockData';
import type { Approval, ApprovalDecision, AuditEvent, Policy, RiskReview, Wallet } from '../data/types';

interface ApprovalDetailProps {
  approval?: Approval;
  policy?: Policy;
  riskReview?: RiskReview;
  sourceWallet?: Wallet;
  auditEvents: AuditEvent[];
  decision?: ApprovalDecision;
  onDecision: (approvalId: string, status: ApprovalDecision['status']) => void;
}

export function ApprovalDetail({
  approval,
  policy,
  riskReview,
  sourceWallet,
  auditEvents,
  decision,
  onDecision
}: ApprovalDetailProps) {
  if (!approval) {
    return (
      <EmptyState
        title="Select an approval"
        message="Open a pending approval to review transaction, policy, risk, and audit context."
      />
    );
  }

  const effectiveStatus = decision?.status ?? approval.status;
  const canDecide = approval.status === 'pending' && !decision;

  return (
    <aside className="detail-panel detail-panel--wide" aria-label="Approval transaction detail">
      <div className="detail-heading">
        <FileWarning aria-hidden="true" />
        <div>
          <p className="eyebrow">Transaction detail</p>
          <h3>{approval.transaction.id}</h3>
        </div>
        <StatusBadge value={effectiveStatus} />
      </div>

      <div className="transaction-amount">
        {formatAmount(approval.transaction.amount, approval.transaction.asset)}
      </div>
      <p className="muted-copy">{approval.reason}</p>

      <dl className="detail-list">
        <div>
          <dt>Organization</dt>
          <dd>{getOrganizationName(approval.organizationId)}</dd>
        </div>
        <div>
          <dt>Requested by</dt>
          <dd>{getUserName(approval.requestedBy)}</dd>
        </div>
        <div>
          <dt>Source wallet</dt>
          <dd>{sourceWallet?.label ?? getWalletLabel(approval.transaction.sourceWalletId)}</dd>
        </div>
        <div>
          <dt>Destination</dt>
          <dd>{approval.transaction.destination}</dd>
        </div>
        <div>
          <dt>Policy</dt>
          <dd>{policy?.name ?? approval.policyId}</dd>
        </div>
        <div>
          <dt>Risk status</dt>
          <dd>{riskReview ? humanize(riskReview.status) : 'No linked risk review'}</dd>
        </div>
        <div>
          <dt>Requested</dt>
          <dd>{formatDateTime(approval.createdAt)}</dd>
        </div>
      </dl>

      <div className="decision-bar">
        <button
          className="primary-action"
          type="button"
          disabled={!canDecide}
          onClick={() => onDecision(approval.id, 'approved')}
        >
          <Check aria-hidden="true" size={16} />
          Approve mock decision
        </button>
        <button
          className="danger-action"
          type="button"
          disabled={!canDecide}
          onClick={() => onDecision(approval.id, 'rejected')}
        >
          <X aria-hidden="true" size={16} />
          Reject mock decision
        </button>
      </div>

      {decision ? (
        <div className="decision-note" role="status">
          Mock decision recorded: {humanize(decision.status)} at {formatDateTime(decision.decidedAt)}.
          No backend, signing, settlement, ledger, or webhook side effect occurred.
        </div>
      ) : null}

      <div className="reference-banner reference-banner--compact">
        <p>{approval.transaction.disclaimer}</p>
      </div>

      <div className="mini-timeline">
        <h4>Related audit context</h4>
        {auditEvents.length === 0 ? (
          <p className="muted-copy">No related audit events in mock fixtures.</p>
        ) : (
          auditEvents.map((event) => (
            <div key={event.id} className="timeline-item">
              <span>{formatDateTime(event.createdAt)}</span>
              <strong>{humanize(event.action)}</strong>
              <p>{event.summary}</p>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
