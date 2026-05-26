export const canonicalStatuses = [
  'active',
  'approval_required',
  'approved',
  'blocked',
  'clear',
  'draft',
  'escalated',
  'failed',
  'frozen',
  'high',
  'invited',
  'matched',
  'medium',
  'mock_current',
  'mock_due',
  'mock_not_configured',
  'none',
  'open',
  'paused',
  'pending',
  'rejected',
  'retrying',
  'review',
  'review_required',
  'resolved',
  'sandbox_active',
  'sandbox_paused',
  'sandbox_review',
  'success'
] as const;

export const canonicalEvents = [
  'approval.created',
  'approval.decided',
  'policy.matched',
  'reconciliation.exception_opened',
  'reconciliation.exception_resolved',
  'risk.escalated',
  'risk.review_required',
  'transaction.approved',
  'transaction.rejected',
  'transaction.simulated',
  'wallet.status_changed',
  'webhook.paused'
] as const;

export const forbiddenPublicEvents = [
  ['audit', 'event_recorded'].join('.'),
  ['ledger', 'entry_created'].join('.'),
  ['reconciliation', 'entry_created'].join('.')
] as const;

export type CanonicalStatus = (typeof canonicalStatuses)[number];
export type CanonicalEvent = (typeof canonicalEvents)[number];
