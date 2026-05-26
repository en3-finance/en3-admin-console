# Contract: UI Surface

The reference app MUST expose a single-page admin console with a persistent left
navigation and the following modules:

1. Dashboard
2. Organizations
3. Users
4. Roles / RBAC
5. Wallet Registry
6. Treasury / System Wallets
7. Policies
8. Pending Approvals
9. Transaction Simulation
10. Risk Review
11. Audit Log
12. Webhooks

## Global UI Rules

- Every screen that involves security-sensitive operations MUST show
  mock/reference labeling.
- Navigation MUST remain usable on narrow screens.
- Tables and lists MUST avoid text overlap by allowing wrapping, scrolling, or
  compact responsive layouts.
- Empty, loading, and error states MUST exist at least as reusable components.
- The app MUST not require authentication, secrets, backend services, or network
  calls.

## Required Detail Surfaces

- Policy detail: selected policy name, status, scope, rules, mock enforcement
  disclaimer.
- Approval/transaction detail: approval status, amount, asset, source,
  destination, policy result, risk result, audit context, mock approve/reject
  action.
- Audit event timeline: actor, action, resource, timestamp, and summary.
- Transaction simulation: deterministic sample result and no-execution
  disclaimer.

## Mock Action Rules

Approval actions may change local session state only. The UI MUST communicate
that no transaction is submitted, signed, settled, reconciled, or delivered to a
backend.
