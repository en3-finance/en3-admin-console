# Data Model: Wallet Control Plane Admin Console

All entities are mock/reference records. They do not represent live customers,
balances, approvals, vendors, or production system state.

## Organization

- `id`: Stable mock identifier.
- `name`: Display name for the reference tenant.
- `status`: Sandbox lifecycle state.
- `market`: Reference operating region or segment.
- `productType`: Reference wallet product category.
- `operatingMode`: SaaS, hybrid, on-prem signer, bank-hosted key share, or BYO
  custody/HSM reference label.
- `createdAt`: ISO timestamp.

Relationships: Owns users, wallets, policies, approvals, audit events, and
webhooks.

## User

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `name`: Display name.
- `email`: Mock email domain only.
- `roleId`: Assigned role.
- `status`: Active, invited, suspended, or inactive.
- `lastActiveAt`: ISO timestamp or null.

Relationships: References one organization and one role; may appear as actor in
audit events.

## Role

- `id`: Stable mock identifier.
- `name`: Display name.
- `description`: Role purpose.
- `permissions`: List of permission strings.
- `scope`: Reference scope such as organization or treasury operations.

Relationships: Assigned to users.

## Wallet

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `label`: Display label.
- `ownerType`: User, treasury, system, settlement, fee, or liquidity.
- `ownerId`: Mock owner identifier when relevant.
- `asset`: Asset symbol for reference display.
- `network`: Reference network label.
- `balance`: String decimal mock balance.
- `status`: Active, frozen, review, or inactive.
- `custodyMode`: Reference custody/deployment label.

Relationships: Treasury/system wallet variants are filtered from the same wallet
registry.

## Policy

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `name`: Policy display name.
- `description`: Policy purpose.
- `status`: Active, draft, paused, or archived.
- `scope`: Entity or flow type covered by the rule.
- `rules`: List of condition/action objects.
- `mockOnly`: Boolean that must be true.

Relationships: May be linked to approvals and simulation output.

## Approval

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `transactionId`: Related mock transaction/simulation identifier.
- `policyId`: Policy that produced the approval requirement.
- `riskReviewId`: Related risk review when present.
- `status`: Pending, approved, rejected, or expired.
- `reason`: Human-readable reason.
- `requestedBy`: Mock user/system actor.
- `createdAt`: ISO timestamp.

Relationships: Links policy, risk review, audit events, and transaction
simulation context.

## Transaction Simulation

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `sourceWalletId`: Mock source wallet.
- `destination`: Mock destination label/address.
- `asset`: Asset symbol.
- `amount`: String decimal mock amount.
- `network`: Reference network label.
- `policyResult`: Allow, approval_required, blocked, or review_required.
- `riskResult`: Clear, review_required, or blocked.
- `disclaimer`: Statement that no transfer, signing, or ledger execution occurs.

Relationships: Referenced by approvals and risk reviews.

## Risk Review

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `transactionId`: Related transaction simulation.
- `status`: Clear, review_required, escalated, or resolved.
- `severity`: Low, medium, high, or critical.
- `signals`: Mock signal labels.
- `recommendedAction`: Reference action for operator review.
- `mockOnly`: Boolean that must be true.

Relationships: May be linked to approvals and audit events.

## Audit Event

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `actorType`: User, admin, system, or service.
- `actorId`: Actor identifier when available.
- `action`: Event action string.
- `resourceType`: Resource category.
- `resourceId`: Resource identifier.
- `summary`: Human-readable event summary.
- `createdAt`: ISO timestamp.

Relationships: May reference approvals, policies, wallets, users, risk reviews,
webhooks, or simulations.

## Webhook

- `id`: Stable mock identifier.
- `organizationId`: Owning organization.
- `label`: Display label.
- `eventTypes`: Subscribed event names.
- `target`: Mock endpoint label or redacted URL.
- `status`: Active, paused, failing, or disabled.
- `lastDeliveryStatus`: Success, retrying, failed, or none.
- `secretStatus`: Mock rotation state without exposing a secret.

Relationships: May be referenced by audit events.

## State Transitions

- Approval starts as `pending` and may move to `approved` or `rejected` only in
  local demo state.
- Policy detail is read-only.
- Simulation output is deterministic and read-only.
- Risk review is read-only in this iteration.
- Webhook delivery is read-only and never triggers a network request.
