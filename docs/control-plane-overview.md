# Control Plane Overview

The En3 Wallet Control Plane reference console demonstrates how institutional
operators could inspect Wallet-as-a-Service operations from a single admin
surface. It is intentionally public-safe: every module is backed by local mock
data and no production control logic is included.

## Modules

| Module | Reference responsibility |
| --- | --- |
| Dashboard | Summarizes mock organizations, wallets, approvals, risk reviews, audit events, and webhook posture. |
| Organizations | Shows tenant/product configuration, operating mode, market, and sandbox status. |
| Users | Shows mock admin/operator identities, role assignments, and activity state. |
| Roles / RBAC | Shows role scopes and permissions for IAM/RBAC concepts. |
| Wallet Registry | Shows user, settlement, treasury, and system wallets in mock form. |
| Treasury / System Wallets | Isolates operational wallets while clearly excluding real sweeping, reconciliation, and treasury execution. |
| Policies | Shows policy examples and rule conditions without production enforcement. |
| Pending Approvals | Shows a mock decision queue and session-local approve/reject actions. |
| Transaction Simulation | Shows deterministic pre-execution review output without transfer, signing, settlement, ledger, or webhook side effects. |
| Risk Review | Shows mock sanctions/KYT/address-risk style signals without vendor integration. |
| Audit Log | Shows lifecycle events for operations review. |
| Webhooks | Shows endpoint and subscription examples without real delivery or secrets. |

## Deployment Modes Represented

The mock organization and wallet data references SaaS, hybrid, on-prem signer,
bank-hosted key share, and BYO custody/HSM operating models. These are product
concepts only in this public repo; production custody and signing orchestration
remain private by design.

## What Reviewers Should Look For

- Whether the control-plane modules are understandable without reading code.
- Whether policies, approvals, simulations, risk reviews, and webhooks are
  visibly labeled as mock/reference.
- Whether the app explains how operators would move from posture review to
  policy review, approval decision, risk context, audit evidence, and integration
  readiness.
