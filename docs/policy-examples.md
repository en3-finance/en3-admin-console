# Policy Examples

Policies in this repository are mock examples. They do not enforce production
controls and are not a substitute for private policy engines, signing controls,
ledger checks, risk scoring, or compliance workflows.

## Example: High Value Stablecoin Approval

Purpose: show how a large stablecoin transfer could enter an approval queue.

Reference rule:

- If asset is `USDC` and amount is above `10000.00`, mark the transaction as
  `approval_required`.
- Display the policy match in the transaction detail view.
- Allow an operator to record a mock approval or rejection in local UI state.

Public boundary: no transaction is signed, submitted, settled, swept,
reconciled, or written to a ledger.

## Example: Frozen Wallet Transfer Block

Purpose: show how wallet status could influence operator review.

Reference rule:

- If source wallet status is `frozen`, show a blocked or rejected reference
  outcome.
- Display the wallet and related audit context.

Public boundary: the repo does not implement production freeze enforcement.

## Example: Risk Signal Manual Review

Purpose: show how a compliance-readiness interface can present mock signals.

Reference rule:

- If a mock risk signal is present, route the transaction to manual review.
- Show severity, signal labels, and recommended reference action.

Public boundary: no sanctions, KYT, address-risk, custody, payment, banking, or
regulatory vendor is called or simulated as a real integration.
