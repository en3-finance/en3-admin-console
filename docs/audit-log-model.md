# Audit Log Model

Audit events in this repository provide a public reference for lifecycle
visibility. They are mock records and not a production audit ledger.

## Event Fields

| Field | Description |
| --- | --- |
| `id` | Event identifier. |
| `organizationId` | Mock tenant identifier. |
| `actorType` | `user`, `admin`, `system`, or `service`. |
| `actorId` | Actor identifier when available. |
| `action` | Action name, such as `policy.matched` or `transaction.approved`. |
| `resourceType` | Resource category. |
| `resourceId` | Resource identifier. |
| `summary` | Human-readable event summary. |
| `createdAt` | ISO timestamp. |

## Reference Timeline

The Audit Log view sorts events newest first and presents actor, action,
resource, timestamp, and summary. The Pending Approvals detail view also shows
related audit context for the selected mock transaction, policy, or risk review.

## Public Boundary

The audit log is display-only. It does not guarantee immutability, retention,
non-repudiation, production authorization, or ledger-grade evidence in this
public repo.
