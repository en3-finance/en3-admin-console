# En3 Admin Console

Status: public reference / sandbox artifact. This repository is intended to document and demonstrate the En3 integration surface. Production cryptography, signing orchestration, policy enforcement, risk logic, ledger infrastructure, treasury execution, and customer deployments are private by design.

## What This Repo Is

`en3-admin-console` is a reference admin console for the En3 Wallet Control Plane: organizations, RBAC, policies, approvals, risk review, and audit logs.

## Who It Is For

This repo is for bank operations, fintech operations, platform engineering, product, and diligence teams reviewing the control-plane model.

## What It Demonstrates

- Organizations.
- Users.
- IAM/RBAC.
- Wallet Registry.
- Treasury/System Wallets.
- Policies.
- Pending Approvals.
- Transaction Simulation.
- Risk Review.
- Audit Log.
- Webhooks.

## Intentionally Out Of Scope

This repo uses mock data only. It does not contain production policy enforcement, production signing, ledger infrastructure, risk logic, treasury execution, real compliance vendor integrations, customer deployments, private endpoints, or production credentials.

## Reference Docs

- [Control-plane overview](docs/control-plane-overview.md)
- [Policy examples](docs/policy-examples.md)
- [Audit-log model](docs/audit-log-model.md)
- [Static demo notes](apps/admin-console/README.md)

## Related En3 Repositories

- `en3-docs`
- `en3-api-spec`
- `en3-wallet-sdk`
- `en3-reference-bank`
- `en3-web-wallet`
- `en3-mobile-wallet`
- `en3-chain-integrations`
