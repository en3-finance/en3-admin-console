# Tasks: Wallet Control Plane Admin Console

**Input**: Design documents from `/specs/001-wallet-control-plane-admin-console/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Basic mock data validation and component rendering tests are included
because the specification requests practical validation.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic frontend structure

- [X] T001 Create root npm workspace metadata and scripts in package.json
- [X] T002 Create Vite React TypeScript app metadata in apps/admin-console/package.json
- [X] T003 [P] Create Vite and TypeScript configuration in apps/admin-console/vite.config.ts, apps/admin-console/tsconfig.json, and apps/admin-console/tsconfig.node.json
- [X] T004 [P] Create HTML entrypoint and app boot files in apps/admin-console/index.html, apps/admin-console/src/main.tsx, and apps/admin-console/src/vite-env.d.ts
- [X] T005 [P] Create test setup in apps/admin-console/src/test/setup.ts
- [X] T006 Verify and update repository ignore patterns in .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data, types, components, and styling required before story work

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Expand required mock datasets in mock/organizations.json, mock/users.json, mock/roles.json, mock/wallets.json, mock/policies.json, mock/approvals.json, mock/risk-reviews.json, mock/audit-events.json, and mock/webhooks.json
- [X] T008 [P] Define control-plane data types in apps/admin-console/src/data/types.ts
- [X] T009 Implement mock data imports and derived selectors in apps/admin-console/src/data/mockData.ts
- [X] T010 Implement mock data validation helpers in apps/admin-console/src/data/validators.ts
- [X] T011 [P] Implement status and utility formatting helpers in apps/admin-console/src/data/formatters.ts
- [X] T012 [P] Implement reusable empty/loading/error state component in apps/admin-console/src/components/EmptyState.tsx
- [X] T013 [P] Implement reusable status badge component in apps/admin-console/src/components/StatusBadge.tsx
- [X] T014 [P] Implement reusable table component in apps/admin-console/src/components/DataTable.tsx
- [X] T015 Implement responsive shell and left navigation in apps/admin-console/src/components/Shell.tsx
- [X] T016 Implement global enterprise SaaS styling in apps/admin-console/src/index.css

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Understand Operational Posture (Priority: P1) MVP

**Goal**: Reviewers can navigate all modules and understand the mock
control-plane posture from dashboard, tables, and module views.

**Independent Test**: Open the app, use left navigation, and inspect every
module without reading README or requiring a backend.

### Tests for User Story 1

- [X] T017 [P] [US1] Add mock data validation tests in apps/admin-console/src/test/data-validation.test.ts
- [X] T018 [P] [US1] Add dashboard and navigation rendering tests in apps/admin-console/src/test/app.test.tsx

### Implementation for User Story 1

- [X] T019 [US1] Implement dashboard metrics and module summary in apps/admin-console/src/views/Dashboard.tsx
- [X] T020 [US1] Implement organizations, users, roles, wallet registry, treasury/system wallets, and generic module tables in apps/admin-console/src/views/ModuleViews.tsx
- [X] T021 [US1] Implement top-level app state, routing by selected module, and error boundaries in apps/admin-console/src/App.tsx
- [X] T022 [US1] Wire dashboard and module views into navigation in apps/admin-console/src/App.tsx

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Review Policies and Pending Approvals (Priority: P2)

**Goal**: Reviewers can inspect policy detail, approval detail, simulated
transaction context, and a mock approval/rejection action.

**Independent Test**: Select a policy, open a pending approval, inspect linked
transaction/risk/audit context, and complete a mock decision.

### Tests for User Story 2

- [X] T023 [P] [US2] Add policy and approval interaction tests in apps/admin-console/src/test/policy-approval.test.tsx

### Implementation for User Story 2

- [X] T024 [US2] Implement policy detail view in apps/admin-console/src/views/PolicyDetail.tsx
- [X] T025 [US2] Implement approval and transaction detail view in apps/admin-console/src/views/ApprovalDetail.tsx
- [X] T026 [US2] Implement mock approve/reject session state in apps/admin-console/src/App.tsx
- [X] T027 [US2] Wire Policies and Pending Approvals modules to detail views in apps/admin-console/src/views/ModuleViews.tsx

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Audit and Integration Readiness Review (Priority: P3)

**Goal**: Reviewers can trace mock simulation, risk review, audit timeline, and
webhook subscriptions without network calls.

**Independent Test**: Inspect transaction simulation output, risk review states,
audit timeline, and webhook examples with clear mock-only labeling.

### Tests for User Story 3

- [X] T028 [P] [US3] Add simulation, risk, audit, and webhook rendering tests in apps/admin-console/src/test/operational-readiness.test.tsx

### Implementation for User Story 3

- [X] T029 [US3] Implement transaction simulation view in apps/admin-console/src/views/TransactionSimulation.tsx
- [X] T030 [US3] Implement audit event timeline in apps/admin-console/src/views/AuditTimeline.tsx
- [X] T031 [US3] Implement risk review and webhook module surfaces in apps/admin-console/src/views/ModuleViews.tsx
- [X] T032 [US3] Wire simulation, risk review, audit log, and webhooks modules into apps/admin-console/src/App.tsx

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, validation, reporting, and release hygiene

- [X] T033 [P] Update public README with scope, run commands, related repos, and screenshot guidance in README.md
- [X] T034 [P] Update app README with local demo commands and mock-only boundaries in apps/admin-console/README.md
- [X] T035 [P] Expand control-plane overview documentation in docs/control-plane-overview.md
- [X] T036 [P] Expand policy examples documentation in docs/policy-examples.md
- [X] T037 [P] Expand audit log model documentation in docs/audit-log-model.md
- [X] T038 [P] Add operator demo script in docs/demo-script.md
- [X] T039 Preserve and clarify public security policy in SECURITY.md
- [X] T040 Run npm install to create lockfile package-lock.json
- [X] T041 Run test suite with npm test
- [X] T042 Run production build with npm run build
- [X] T043 Run repository secret indicator scan from repo root
- [X] T044 Create CODEX_REPORT.md with Spec Kit artifacts, implementation summary, mock/private boundaries, validation, risks, and next tasks
- [X] T045 Review git diff and commit all changes on branch 001-wallet-control-plane-admin-console

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational completion and is MVP.
- **User Story 2 (Phase 4)**: Depends on Foundational completion and may reuse
  US1 tables/navigation.
- **User Story 3 (Phase 5)**: Depends on Foundational completion and may reuse
  US1 tables/navigation.
- **Polish (Phase 6)**: Depends on desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational; no other story dependency.
- **User Story 2 (P2)**: Can start after Foundational; integrates with common
  data selectors and shell.
- **User Story 3 (P3)**: Can start after Foundational; integrates with common
  data selectors and shell.

### Parallel Opportunities

- Setup config tasks T003-T005 can run in parallel.
- Foundational component tasks T012-T014 can run in parallel after data types.
- Test tasks T017, T018, T023, and T028 can be prepared independently.
- Documentation tasks T033-T038 can run in parallel after implementation scope is stable.

---

## Parallel Example: User Story 1

```bash
Task: "Add mock data validation tests in apps/admin-console/src/test/data-validation.test.ts"
Task: "Add dashboard and navigation rendering tests in apps/admin-console/src/test/app.test.tsx"
Task: "Implement dashboard metrics and module summary in apps/admin-console/src/views/Dashboard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Complete Phase 3 dashboard/navigation/module tables.
4. Validate with tests and build.

### Incremental Delivery

1. Add policy/approval workflow after dashboard navigation is credible.
2. Add simulation, risk, audit, and webhook readiness surfaces.
3. Finish documentation, validation, secret scan, report, and commit.

### Notes

- All security-sensitive behavior remains mock/reference.
- Do not introduce auth, backend services, real endpoints, or real vendor logic.
- Mark tasks complete in this file as they are implemented.
