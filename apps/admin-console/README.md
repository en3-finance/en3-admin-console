# En3 Admin Console App

Static Vite + React + TypeScript reference app for the En3 Wallet Control Plane.
The app reads local mock JSON from `../../mock/` and performs no network calls.

## Commands

```bash
npm install
npm run dev
npm test
npm run build
```

## Boundaries

- No real authentication.
- No backend.
- No production policy enforcement.
- No transaction signing, submission, settlement, ledger write, reconciliation,
  sweeping, or treasury execution.
- No sanctions, KYT, address-risk, custody, banking, or payment vendor
  integration.
- Approval actions update session-local UI state only.

## Main Screens

- Dashboard
- Organizations
- Users
- Roles / RBAC
- Wallet Registry
- Treasury / System Wallets
- Policies
- Pending Approvals
- Transaction Simulation
- Risk Review
- Audit Log
- Webhooks
