# Contract: Mock Data Fixtures

The app MUST load local JSON files from root `mock/`. These fixtures are public
reference data and MUST NOT include secrets, real customers, private endpoints,
real wallet addresses, private deployment details, or vendor credentials.

## Required Files

- `mock/organizations.json`
- `mock/users.json`
- `mock/roles.json`
- `mock/wallets.json`
- `mock/policies.json`
- `mock/approvals.json`
- `mock/risk-reviews.json`
- `mock/audit-events.json`
- `mock/webhooks.json`

## Required Dataset Rules

- Each file MUST contain a JSON array.
- Each record MUST include an `id` string.
- Cross-record references SHOULD point to an existing mock record when the
  related entity is present in this repo.
- Policy and risk-review records MUST include `mockOnly: true` once implemented.
- Webhook records MUST use redacted or mock targets only.
- No field may contain obvious secret markers such as `ghp_`, `github_pat_`,
  `sk-`, private key headers, `password=`, `api_key=`, or `secret=`.

## Validation Expectations

The test suite MUST verify:

- All required files are importable.
- Required datasets are non-empty for the first public demo.
- Required `id` fields exist.
- Policy and risk records are labeled mock-only.
- Webhook targets are not private credentials or real internal endpoints.
