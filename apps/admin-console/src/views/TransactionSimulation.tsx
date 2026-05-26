import { PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { formatAmount, humanize } from '../data/formatters';
import { getOrganizationName, getWalletLabel, simulationTransactions } from '../data/mockData';

export function TransactionSimulation() {
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);
  const highlighted = simulationTransactions[0];

  return (
    <section className="view-stack" aria-label="Transaction simulation">
      <div className="reference-banner">
        <div>
          <p className="eyebrow">Deterministic sandbox output</p>
          <h3>Transaction simulation does not submit, sign, settle, or write to a ledger.</h3>
        </div>
        <button
          type="button"
          className="secondary-action"
          onClick={() => setLastRunAt(new Date().toISOString())}
        >
          <PlayCircle aria-hidden="true" size={16} />
          Run mock simulation
        </button>
      </div>

      {lastRunAt ? (
        <div className="decision-note" role="status">
          Simulation refreshed in local UI only. No network call was made.
        </div>
      ) : null}

      {highlighted ? (
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Sample result</p>
              <h3>{formatAmount(highlighted.amount, highlighted.asset)}</h3>
            </div>
            <StatusBadge value={highlighted.policyResult} />
          </div>
          <dl className="detail-list detail-list--grid">
            <div>
              <dt>Organization</dt>
              <dd>{getOrganizationName(highlighted.organizationId)}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{getWalletLabel(highlighted.sourceWalletId)}</dd>
            </div>
            <div>
              <dt>Destination</dt>
              <dd>{highlighted.destination}</dd>
            </div>
            <div>
              <dt>Risk result</dt>
              <dd>{humanize(highlighted.riskResult)}</dd>
            </div>
          </dl>
          <p className="muted-copy">{highlighted.disclaimer}</p>
        </article>
      ) : null}

      <DataTable
        rows={simulationTransactions}
        getRowKey={(row) => row.id}
        emptyTitle="No simulations"
        emptyMessage="Add mock approvals with transaction payloads to show simulation output."
        columns={[
          { key: 'id', header: 'Simulation', render: (row) => row.id },
          { key: 'amount', header: 'Amount', render: (row) => formatAmount(row.amount, row.asset) },
          { key: 'source', header: 'Source', render: (row) => getWalletLabel(row.sourceWalletId) },
          { key: 'policy', header: 'Policy result', render: (row) => <StatusBadge value={row.policyResult} /> },
          { key: 'risk', header: 'Risk result', render: (row) => <StatusBadge value={row.riskResult} /> }
        ]}
      />
    </section>
  );
}
