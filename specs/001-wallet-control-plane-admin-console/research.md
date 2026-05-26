# Research: Wallet Control Plane Admin Console

## Decision: Static Vite + React + TypeScript app under `apps/admin-console`

**Rationale**: The repository is minimal and already contains an
`apps/admin-console` placeholder. A static frontend is enough to demonstrate the
control-plane model without introducing backend, auth, network, or deployment
complexity. TypeScript improves credibility through typed mock data and
validation without moving security-sensitive logic into the public repo.

**Alternatives considered**:
- Plain HTML/CSS/JS: simpler, but weaker data validation and component testing.
- Next.js: unnecessary server/runtime surface for a mock-only static demo.
- Backend-backed app: out of scope because no real auth, persistence, policy
  enforcement, signing, ledger, treasury, or vendor integration is required.

## Decision: Root `mock/*.json` fixtures as the app's source of truth

**Rationale**: The user requested specific mock JSON files and the repository
already contains most of them. Keeping fixtures at root makes public boundaries
obvious and lets documentation, tests, and UI all reference the same data.

**Alternatives considered**:
- Inline component data: faster to write but harder to validate and reuse.
- Generated fixtures: adds unnecessary tooling for a small reference app.
- Remote fixture fetch: would imply network behavior and integration surface not
  needed for this public repo.

## Decision: Session-local approval actions only

**Rationale**: The demo needs an approval action to explain workflow, but the
constitution prohibits any implication of production enforcement. Updating local
UI state delivers the interaction while keeping behavior mock-only.

**Alternatives considered**:
- Persisting to local storage: could mislead reviewers into thinking state is
  durable.
- Posting to a backend: out of scope and not public-safe for this iteration.

## Decision: Mock validation tests plus core component tests

**Rationale**: A build and small Vitest suite provide a practical quality gate
for a minimal public demo. Data validation tests catch missing required mock
datasets and shape regressions; component tests verify the primary UI renders
the control-plane modules.

**Alternatives considered**:
- End-to-end browser automation: useful later, but heavier than needed for the
  first static reference demo.
- No tests: conflicts with credible minimal delivery and user request.

## Decision: Documentation stays explicit about mock/private boundaries

**Rationale**: Public diligence depends on truthfulness. README and docs must
explain what is demonstrated, what remains private, and how to run or screenshot
the demo without claiming production readiness.

**Alternatives considered**:
- Marketing-style copy: rejected because it risks overstating scope.
- Code-only demo: insufficient for reviewers who need boundary clarity.
