<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME -> I. Public Reference Boundary
- PRINCIPLE_2_NAME -> II. Mock Data Only
- PRINCIPLE_3_NAME -> III. Truthful Security Labeling
- PRINCIPLE_4_NAME -> IV. Control-Plane Clarity
- PRINCIPLE_5_NAME -> V. Credible Minimal Delivery
Added sections:
- Public Data and Security Constraints
- Development Workflow and Quality Gates
Removed sections:
- None
Templates requiring updates:
- Reviewed: .specify/templates/plan-template.md
- Reviewed: .specify/templates/spec-template.md
- Reviewed: .specify/templates/tasks-template.md
- Not present: .specify/templates/commands/
Follow-up TODOs:
- None
-->
# En3 Admin Console Constitution

## Core Principles

### I. Public Reference Boundary
This repository MUST present a public reference admin console for institutional
Wallet-as-a-Service operations. It MUST NOT claim production policy enforcement,
production readiness, audited MPC/TSS, regulatory approval, customer deployments,
or live partner integrations unless those claims are directly proven by public
code and artifacts in this repository. The public repo exists to explain the
control-plane model while keeping production custody, signing, ledger, treasury,
risk, and deployment systems private by design.

Rationale: Public diligence material must be useful without exposing private
infrastructure or overstating the repo's operational scope.

### II. Mock Data Only
All product data in this repository MUST be mock, sandbox, or reference data.
Examples that mention organizations, users, roles, wallets, policies,
approvals, risk reviews, audit events, webhooks, transactions, addresses,
balances, vendors, or endpoints MUST be labeled or obviously structured as
mock/reference material. No secrets, private RPC URLs, customer data, internal
deployment configuration, real credentials, or partner names may be committed.

Rationale: The repository is public and must be safe to inspect, fork, and demo.

### III. Truthful Security Labeling
Security-sensitive behavior MUST be described precisely. Policy checks,
approval actions, transaction simulation, risk review, sanctions/KYT interfaces,
treasury flows, sweeping, reconciliation, ledger behavior, custody, and signing
MUST be labeled as mock/reference when implemented in this public repo. The code
MUST NOT include fake vendor integrations that could be confused with real
compliance, custody, banking, or payment connectivity.

Rationale: Banks, fintechs, payment providers, and investors need clear
boundaries between demonstrable concepts and private production systems.

### IV. Control-Plane Clarity
The user interface MUST explain the Wallet Control Plane better than a README
alone by showing navigable modules, data tables, decision states, detail views,
timeline/audit context, and mock operational workflows. Dashboard,
organizations, users, RBAC, wallet registry, treasury/system wallets, policies,
pending approvals, transaction simulation, risk review, audit log, and webhooks
MUST be represented when the feature scope includes a complete admin demo.

Rationale: The reference console is the primary artifact for communicating how
institutional operators would reason about Wallet-as-a-Service operations.

### V. Credible Minimal Delivery
Changes MUST favor small, working, testable increments over large unfinished
scaffolds. Empty placeholder modules are prohibited unless they are explicitly
documented as future work and excluded from the shipped demo surface. Tests,
build validation, documentation, and security scanning for obvious secret
patterns MUST be part of the delivery when practical for the stack.

Rationale: A credible public reference earns trust through working behavior,
clear limits, and maintainable artifacts.

## Public Data and Security Constraints

This repository MUST NOT include production cryptography, signing orchestration,
policy enforcement engines, risk scoring logic, ledger infrastructure, treasury
execution, customer deployments, private endpoints, API keys, personal access
tokens, seed phrases, private keys, or real RPC URLs.

Documentation and UI copy MUST avoid claims about production readiness, audited
MPC/TSS, live customers, pilots, bank partnerships, regulatory approvals,
vendor integrations, compliance certifications, fundraising valuation, M&A
targets, private partner names, ADI, grant context, or deck-sensitive material.

Any public compliance-readiness content MUST be framed as interface concepts,
mock review states, or reference workflows, not as a real integration with a
sanctions, KYT, address-risk, custody, banking, payment, or regulatory vendor.

## Development Workflow and Quality Gates

Every feature MUST inspect existing repository contents before editing. Useful
files, documentation, mock data, and security policy content MUST be preserved
unless the feature explicitly replaces them.

Spec Kit artifacts MUST be kept under `specs/<feature-id>/` and MUST include
specification, plan, tasks, and relevant contracts before implementation begins.
Implementation tasks MUST be completed against those artifacts and marked in
`tasks.md` as work is finished.

For application changes, the build MUST pass before final delivery unless a
blocking environment issue is documented. Tests SHOULD be added when practical;
if omitted, the delivery report MUST state why. Before commit, the repository
MUST be searched for obvious secret indicators, including `ghp_`,
`github_pat_`, `sk-`, `BEGIN RSA PRIVATE KEY`,
`BEGIN OPENSSH PRIVATE KEY`, `password=`, `api_key=`, and `secret=`.

Public documentation MUST include a clear README and preserve or improve
`SECURITY.md`. GitHub Actions MAY be added only when lightweight and likely to
pass in the public repository.

## Governance

This constitution supersedes conflicting guidance in specs, plans, tasks,
documentation, and implementation notes. Any artifact that conflicts with a
MUST statement in this constitution must be changed before implementation or
release.

Amendments require a documented reason, a semantic version bump, and a Sync
Impact Report at the top of this file. MAJOR versions remove or redefine
principles in a backward-incompatible way. MINOR versions add principles or
materially expand governance. PATCH versions clarify wording without changing
requirements.

Each feature review MUST check public-reference boundaries, mock-data labeling,
truthful security claims, UI clarity, build/test status, documentation coverage,
and secret-scan results. Compliance failures block release from the public repo
until corrected or explicitly scoped out by a follow-up constitution amendment.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
