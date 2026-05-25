# Audit Log Model

Audit events provide a public reference for lifecycle visibility.

| Field | Description |
| --- | --- |
| id | Event identifier. |
| organizationId | Tenant identifier. |
| actorType | `user`, `admin`, or `system`. |
| actorId | Actor identifier when available. |
| action | Action name. |
| resourceType | Resource category. |
| resourceId | Resource identifier. |
| createdAt | Event timestamp. |

Public audit examples are mock data and not a production audit ledger.
