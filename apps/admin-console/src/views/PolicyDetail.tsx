import { ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { humanize } from '../data/formatters';
import { getOrganizationName } from '../data/mockData';
import type { Policy } from '../data/types';

interface PolicyDetailProps {
  policy?: Policy;
}

export function PolicyDetail({ policy }: PolicyDetailProps) {
  if (!policy) {
    return (
      <EmptyState
        title="Select a policy"
        message="Choose a policy to inspect its mock scope, rules, and non-enforcement boundary."
      />
    );
  }

  return (
    <aside className="detail-panel" aria-label="Policy detail">
      <div className="detail-heading">
        <ShieldAlert aria-hidden="true" />
        <div>
          <p className="eyebrow">Policy detail</p>
          <h3>{policy.name}</h3>
        </div>
        <StatusBadge value={policy.status} />
      </div>

      <p>{policy.description}</p>
      <dl className="detail-list">
        <div>
          <dt>Organization</dt>
          <dd>{getOrganizationName(policy.organizationId)}</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>{humanize(policy.scope)}</dd>
        </div>
        <div>
          <dt>Boundary</dt>
          <dd>Mock policy display only. The public repo does not enforce production rules.</dd>
        </div>
      </dl>

      <div className="rule-stack">
        {policy.rules.map((rule, index) => (
          <div className="rule-card" key={`${policy.id}-${rule.type}-${index}`}>
            <span>{humanize(rule.type)}</span>
            <strong>{humanize(rule.action)}</strong>
            <p>
              {rule.threshold ? `Threshold ${rule.threshold} ${rule.asset ?? ''}` : null}
              {rule.status ? `Wallet status ${humanize(rule.status)}` : null}
              {rule.signal ? `Signal ${humanize(rule.signal)}` : null}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
