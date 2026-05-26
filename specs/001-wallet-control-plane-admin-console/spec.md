# Feature Specification: Wallet Control Plane Admin Console

**Feature Branch**: `001-wallet-control-plane-admin-console`

**Created**: 2026-05-26

**Status**: Draft

**Input**: User description: "Build a public reference admin/control-plane demo for institutional Wallet-as-a-Service operations."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand Operational Posture (Priority: P1)

A bank, fintech, payment provider, or diligence reviewer opens the admin console
and quickly understands the current mock operational posture across
organizations, users, roles, wallets, treasury/system wallets, policies,
pending approvals, risk reviews, audit events, and webhooks.

**Why this priority**: The console must explain the Wallet Control Plane as the
primary public artifact, with enough coverage to make the product model
credible without requiring backend services.

**Independent Test**: A reviewer can open the console, navigate the left
navigation, and inspect each module using mock data without reading the README.

**Acceptance Scenarios**:

1. **Given** the reviewer opens the console, **When** the dashboard loads,
   **Then** it shows high-level counts, status indicators, and mock-only
   labeling for the control-plane demo.
2. **Given** the reviewer uses the left navigation, **When** they select each
   named module, **Then** the main content changes to the selected module and
   shows relevant reference data.
3. **Given** a module has no matching records after filtering or loading fails,
   **When** the state is shown, **Then** the console displays an explicit empty,
   loading, or error state that preserves the mock/reference boundary.

---

### User Story 2 - Review Policies and Pending Approvals (Priority: P2)

An operations lead reviews mock policy rules, selects a policy for detail, opens
a pending approval, inspects the simulated transaction context, and performs a
clearly labeled mock approval or rejection action.

**Why this priority**: Policies and approvals are central to explaining how a
control plane orchestrates institutional wallet operations without publishing
production enforcement logic.

**Independent Test**: A reviewer can inspect a policy detail view, open a
transaction/approval detail view, and complete a mock decision with visible
state feedback.

**Acceptance Scenarios**:

1. **Given** the reviewer is on Policies, **When** they select a policy,
   **Then** a detail view shows rule conditions, status, scope, and a warning
   that enforcement is not implemented in the public repo.
2. **Given** the reviewer is on Pending Approvals, **When** they select an
   approval, **Then** a transaction detail drawer or page shows amount,
   involved parties, related policy, risk status, and audit context from mock
   data.
3. **Given** an approval detail is open, **When** the reviewer chooses approve
   or reject, **Then** the console updates local UI state only and labels the
   action as a mock decision.

---

### User Story 3 - Audit and Integration Readiness Review (Priority: P3)

A platform engineer or compliance reviewer examines audit events, risk review
states, transaction simulation output, and webhook subscriptions to understand
how external systems would receive operational signals in a real integration.

**Why this priority**: Auditability and integration readiness make the demo
credible for institutional buyers while remaining public-safe.

**Independent Test**: A reviewer can trace a mock transaction through
simulation, risk review, approval, audit event timeline, and webhook
configuration without any real network call.

**Acceptance Scenarios**:

1. **Given** the reviewer opens Transaction Simulation, **When** they run or
   select a sample simulation, **Then** the console shows deterministic mock
   results including policy and risk indicators.
2. **Given** the reviewer opens Risk Review, **When** they inspect a review,
   **Then** the console shows mock signals and clearly states that no vendor
   integration or production risk logic is included.
3. **Given** the reviewer opens Audit Log, **When** they inspect events,
   **Then** the console presents an event timeline with actor, action,
   resource, timestamp, and mock context.
4. **Given** the reviewer opens Webhooks, **When** they inspect subscriptions,
   **Then** the console shows mock endpoint and event subscription examples
   without private endpoints or credentials.

---

### Edge Cases

- Mock JSON data is empty for one or more modules.
- Mock JSON data fails validation or cannot be loaded by the app.
- A selected approval references a missing transaction, policy, risk review, or
  audit event.
- Long organization, policy, role, permission, webhook, or event names must fit
  on mobile and desktop views without overlapping other UI.
- The reviewer attempts an approval action more than once in the same session.
- The console is viewed on narrow screens where left navigation must remain
  usable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The console MUST provide a left navigation with Dashboard,
  Organizations, Users, Roles / RBAC, Wallet Registry, Treasury / System
  Wallets, Policies, Pending Approvals, Transaction Simulation, Risk Review,
  Audit Log, and Webhooks.
- **FR-002**: The dashboard MUST summarize the mock control-plane posture using
  module counts, risk/approval status indicators, and public-reference labeling.
- **FR-003**: Each module MUST present relevant mock data in scan-friendly
  tables, lists, or timelines with visible empty, loading, and error states.
- **FR-004**: Organization, user, role, wallet, treasury/system wallet, policy,
  approval, risk review, audit event, and webhook records MUST be sourced from
  local mock/reference data files.
- **FR-005**: Policy views MUST include a policy detail surface that displays
  rule conditions, scope, status, and explicit non-enforcement labeling.
- **FR-006**: Pending approval views MUST include a transaction detail surface
  that links approval, simulated transaction, related policy, risk review, and
  audit context when those records exist.
- **FR-007**: Approval and rejection controls MUST update only local demo state
  and MUST label the result as a mock action with no backend side effect.
- **FR-008**: Transaction simulation MUST show deterministic mock output with
  policy and risk indicators and MUST state that no real transfer, signing, or
  ledger execution occurs.
- **FR-009**: Risk review views MUST show mock sanctions/KYT/address-risk style
  signals without claiming a real vendor integration or production risk score.
- **FR-010**: Audit Log MUST present an event timeline with actor, action,
  resource, timestamp, and related mock context where available.
- **FR-011**: Webhooks MUST show mock endpoint, event subscription, delivery,
  and secret-status examples without real URLs, credentials, or network calls.
- **FR-012**: The console MUST be responsive enough for desktop and mobile
  screenshots, with navigation, tables, and detail surfaces remaining usable.
- **FR-013**: README and supporting documentation MUST state the public
  reference scope, mock-data-only boundary, run command, screenshot guidance,
  and related En3 repositories.
- **FR-014**: The implementation MUST preserve or improve SECURITY.md and MUST
  avoid committing obvious secret indicators or private deployment details.
- **FR-015**: At least one practical build or validation path MUST verify that
  mock data shape and core UI rendering remain intact.

### Key Entities *(include if feature involves data)*

- **Organization**: A tenant/product context with identity, name, status, market,
  product type, and operating mode.
- **User**: A mock operator/admin identity with organization, role assignment,
  status, and last activity.
- **Role**: An RBAC role with permissions and scope notes.
- **Wallet**: A user, treasury, or system wallet record with owner, asset,
  network, balance, status, and custody/reference mode.
- **Policy**: A mock control rule set with organization scope, status,
  conditions, action, and approval/risk requirements.
- **Approval**: A mock decision record linked to a simulated transaction,
  policy, risk review, status, and reviewer notes.
- **Transaction Simulation**: A deterministic mock transaction context with
  amount, asset, source, destination, policy result, risk result, and execution
  disclaimer.
- **Risk Review**: A mock review state with signals, severity, status, and
  recommended reference action.
- **Audit Event**: A lifecycle event with actor, action, resource, timestamp,
  and related details.
- **Webhook**: A mock subscription with event types, target label, delivery
  status, and secret rotation metadata represented without real credentials.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time reviewer can identify all 12 requested modules and
  their purpose within 5 minutes of opening the console.
- **SC-002**: A reviewer can inspect one policy, one pending approval, one mock
  transaction simulation, one risk review, and one audit event in under 7
  minutes without backend access.
- **SC-003**: 100% of security-sensitive surfaces that mention approval,
  policy, simulation, risk, webhook, treasury, signing, or ledger behavior
  include mock/reference labeling.
- **SC-004**: The console can be built and run from documented commands on a
  fresh checkout without requiring secrets, real endpoints, or backend services.
- **SC-005**: Basic validation confirms all required mock datasets exist and can
  support the visible modules.
- **SC-006**: Desktop and mobile screenshots show no incoherent text overlap in
  navigation, tables, dashboard cards, or detail surfaces.

## Assumptions

- No real authentication is required for this iteration.
- No real backend, database, blockchain RPC, signing service, vendor API, or
  webhook delivery is required for this iteration.
- Mock data may be expanded if existing files are too small to demonstrate the
  requested modules credibly.
- Approval actions are session-local demo behavior and do not persist beyond the
  browser session.
- Related En3 repositories are linked by name because their public availability
  or remote URLs may vary across environments.
