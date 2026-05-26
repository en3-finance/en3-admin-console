import { AlertCircle, CheckCircle2, Clock3, Layers3 } from 'lucide-react';
import { datasets, moduleDefinitions, operatingWallets } from '../data/mockData';
import { formatAmount } from '../data/formatters';
import { StatusBadge } from '../components/StatusBadge';

export function Dashboard() {
  const pendingApprovals = datasets.approvals.filter((approval) => approval.status === 'pending').length;
  const riskReviews = datasets.riskReviews.filter((review) => review.status !== 'resolved').length;
  const operatingBalance = operatingWallets
    .filter((wallet) => wallet.asset === 'USDC')
    .reduce((total, wallet) => total + Number(wallet.balance), 0);
  const openReconciliation = datasets.reconciliation.filter((item) => item.status === 'open').length;

  return (
    <section className="view-stack" aria-label="Dashboard summary">
      <div className="reference-banner">
        <div>
          <p className="eyebrow">SandBank mock operational posture</p>
          <h3>Operations and control-plane demo for sandbox Wallet-as-a-Service workflows</h3>
        </div>
        <StatusBadge value="sandbox_active" label="Public reference" />
      </div>

      <div className="metric-grid">
        <article className="metric">
          <Layers3 aria-hidden="true" />
          <span>Organizations</span>
          <strong>{datasets.organizations.length}</strong>
          <p>Synthetic SandBank tenants across bank, remittance, and merchant sandbox profiles.</p>
        </article>
        <article className="metric">
          <CheckCircle2 aria-hidden="true" />
          <span>Wallets</span>
          <strong>{datasets.wallets.length}</strong>
          <p>User, settlement, treasury, and system wallet registry entries.</p>
        </article>
        <article className="metric">
          <Clock3 aria-hidden="true" />
          <span>Pending approvals</span>
          <strong>{pendingApprovals}</strong>
          <p>Session-local decisions only; no backend or transaction submission.</p>
        </article>
        <article className="metric">
          <AlertCircle aria-hidden="true" />
          <span>Open reviews</span>
          <strong>{riskReviews + openReconciliation}</strong>
          <p>Mock risk reviews plus synthetic reconciliation exceptions.</p>
        </article>
      </div>

      <div className="split-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Coverage</p>
              <h3>Modules in this demo</h3>
            </div>
            <span className="count-pill">{moduleDefinitions.length} modules</span>
          </div>
          <div className="module-list">
            {moduleDefinitions.map((module) => (
              <div key={module.id} className="module-row">
                <span>{module.label}</span>
                <small>{module.description}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Operating snapshot</p>
              <h3>Display-only system balance</h3>
            </div>
            <StatusBadge value="active" />
          </div>
          <p className="hero-number">{formatAmount(String(operatingBalance), 'USDC')}</p>
          <p className="muted-copy">
            Display-only mock balance from local fixtures. The public console does not sweep,
            settle, sign, execute transactions, or connect to a ledger.
          </p>
        </article>
      </div>
    </section>
  );
}
