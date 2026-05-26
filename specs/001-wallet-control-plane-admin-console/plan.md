# Implementation Plan: Wallet Control Plane Admin Console

**Branch**: `001-wallet-control-plane-admin-console` | **Date**: 2026-05-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-wallet-control-plane-admin-console/spec.md`

## Summary

Build a public reference admin console that demonstrates En3 Wallet Control
Plane concepts for institutional Wallet-as-a-Service operations. The app will
be a static Vite + React + TypeScript frontend in `apps/admin-console`, backed
only by local mock JSON data in `mock/`. It will expose dashboard, tenant,
IAM/RBAC, wallet, treasury, policy, approval, transaction simulation, risk,
audit, and webhook surfaces with clear mock/reference labeling and no real auth,
backend, signing, risk, ledger, treasury, or vendor integration.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Node.js 20+ compatible tooling

**Primary Dependencies**: Vite, React, React DOM, lucide-react, Vitest,
Testing Library, jsdom

**Storage**: Local JSON mock fixtures only; no database, persistence layer, or
network storage

**Testing**: Vitest unit/component tests plus mock data validation tests

**Target Platform**: Modern desktop and mobile web browsers for public demos and
screenshots

**Project Type**: Static frontend web application inside `apps/admin-console`

**Performance Goals**: Initial demo shell should render from local data in under
2 seconds on a typical development machine; interactions must feel immediate
because all data is local

**Constraints**: Mock/reference only; no auth; no backend; no real endpoints;
no secrets; no production policy enforcement, signing, custody, treasury,
ledger, webhook delivery, compliance vendor, or risk scoring logic

**Scale/Scope**: One public reference app, 12 navigation modules, 9 mock data
files, docs for overview, policies, audit model, and demo script

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Public Reference Boundary**: PASS. The implementation is explicitly scoped
  as a public reference app and excludes production security-sensitive systems.
- **Mock Data Only**: PASS. All app state comes from local mock JSON files and
  session-local UI state.
- **Truthful Security Labeling**: PASS. Policy, approval, transaction
  simulation, risk review, treasury, audit, and webhook surfaces will include
  mock/reference disclaimers.
- **Control-Plane Clarity**: PASS. The plan covers all requested modules with
  navigable data, detail views, decision states, and audit context.
- **Credible Minimal Delivery**: PASS. Scope is limited to a working static app
  with validation tests, docs, build, and secret scan.

## Project Structure

### Documentation (this feature)

```text
specs/001-wallet-control-plane-admin-console/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── mock-data-contract.md
│   └── ui-surface-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
apps/admin-console/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── data/
    │   ├── mockData.ts
    │   └── validators.ts
    ├── components/
    │   ├── EmptyState.tsx
    │   ├── Shell.tsx
    │   ├── StatusBadge.tsx
    │   └── DataTable.tsx
    ├── views/
    │   ├── ApprovalDetail.tsx
    │   ├── AuditTimeline.tsx
    │   ├── Dashboard.tsx
    │   ├── ModuleViews.tsx
    │   ├── PolicyDetail.tsx
    │   └── TransactionSimulation.tsx
    └── test/
        ├── app.test.tsx
        ├── data-validation.test.ts
        └── setup.ts

docs/
├── control-plane-overview.md
├── policy-examples.md
├── audit-log-model.md
└── demo-script.md

mock/
├── organizations.json
├── users.json
├── roles.json
├── wallets.json
├── policies.json
├── approvals.json
├── risk-reviews.json
├── audit-events.json
└── webhooks.json
```

**Structure Decision**: Keep the application in `apps/admin-console` because
the repository already reserves that path for the public demo. Keep shared mock
fixtures in root `mock/` so docs and tests can reference the same public
datasets.

## Complexity Tracking

No constitution violations require complexity justification.

## Phase 0: Research

See [research.md](./research.md).

## Phase 1: Design and Contracts

See [data-model.md](./data-model.md), [mock-data-contract.md](./contracts/mock-data-contract.md),
[ui-surface-contract.md](./contracts/ui-surface-contract.md), and
[quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- **Public Reference Boundary**: PASS. Contracts and data model define only
  public-safe mock/reference behavior.
- **Mock Data Only**: PASS. No storage, backend, auth, network, or integration
  contract is introduced.
- **Truthful Security Labeling**: PASS. Mock labels are required by UI and data
  contracts.
- **Control-Plane Clarity**: PASS. The UI contract maps each module to visible
  purpose, primary records, and expected details.
- **Credible Minimal Delivery**: PASS. Tasks will include build, tests, docs,
  report, and secret scan.
