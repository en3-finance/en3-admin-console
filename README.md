# En3 Admin Console

Public reference admin/control-plane demo for institutional Wallet-as-a-Service
operations.

This repository demonstrates En3 Wallet Control Plane concepts for banks,
fintechs, payment providers, remittance companies, and regulated digital-asset
payment products. It is a static demo backed by local mock JSON only.

## What This Repo Demonstrates

- Dashboard posture across organizations, wallets, approvals, risk, audit, and
  webhook examples.
- Organization, user, and Roles / RBAC reference tables.
- Wallet Registry and Treasury / System Wallet views.
- Mock policy detail and mock pending approval workflow.
- Transaction Simulation with no execution, signing, settlement, or ledger
  effect.
- Risk Review interfaces for compliance-readiness concepts without vendor
  integration.
- Audit Log timeline and Webhook subscription examples.

## Public Boundary

This repo is not a production control plane. It does not include production
policy enforcement, cryptography, signing orchestration, custody, ledger
infrastructure, treasury execution, reconciliation, sweeping, risk scoring,
sanctions/KYT vendor integrations, webhook delivery, customer deployments,
private endpoints, or credentials.

All data is mock/reference data under `mock/`.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Validate

```bash
npm test
npm run build
```

## Screenshot Guidance

Start the dev server, then capture:

1. Dashboard at desktop width.
2. Policies with policy detail visible.
3. Pending Approvals with transaction detail visible.
4. Transaction Simulation after running the mock simulation.
5. Audit Log at mobile width.

Screenshots should keep visible mock/reference labels in frame.

## Reference Docs

- [Control-plane overview](docs/control-plane-overview.md)
- [Policy examples](docs/policy-examples.md)
- [Audit-log model](docs/audit-log-model.md)
- [Demo script](docs/demo-script.md)
- [Static app README](apps/admin-console/README.md)

## Related En3 Repositories

- [en3-reference-bank](https://github.com/en3-finance/en3-reference-bank)
- [en3-api-spec](https://github.com/en3-finance/en3-api-spec)

Additional public reference repositories may include SDKs, wallet reference apps,
and chain-integration examples when available. Production systems remain private
by design.
