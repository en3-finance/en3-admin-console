import {
  Activity,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Gauge,
  History,
  KeyRound,
  Scale,
  LucideIcon,
  Radar,
  ShieldCheck,
  Users,
  WalletCards,
  Webhook
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { ModuleDefinition, ModuleId } from '../data/types';

const icons: Record<ModuleId, LucideIcon> = {
  dashboard: Gauge,
  organizations: Building2,
  users: Users,
  roles: KeyRound,
  wallets: WalletCards,
  reconciliation: Scale,
  policies: ShieldCheck,
  approvals: ClipboardCheck,
  simulation: Activity,
  risk: Radar,
  audit: History,
  webhooks: Webhook
};

interface ShellProps {
  modules: ModuleDefinition[];
  activeModule: ModuleId;
  onSelectModule: (moduleId: ModuleId) => void;
  children: ReactNode;
}

export function Shell({ modules, activeModule, onSelectModule, children }: ShellProps) {
  const active = modules.find((module) => module.id === activeModule) ?? modules[0];
  const apiBaseUrl = import.meta.env.EN3_API_BASE_URL as string | undefined;
  const modeLabel = apiBaseUrl ? 'Sandbox API configured' : 'Mock mode';

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Control plane navigation">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            E3
          </div>
          <div>
            <p className="eyebrow">SandBank demo</p>
            <h1>Operations Control Plane</h1>
          </div>
        </div>

        <nav className="nav-list">
          {modules.map((module) => {
            const Icon = icons[module.id];
            return (
              <button
                key={module.id}
                type="button"
                className={module.id === activeModule ? 'nav-item nav-item--active' : 'nav-item'}
                onClick={() => onSelectModule(module.id)}
              >
                <Icon aria-hidden="true" size={18} />
                <span>{module.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="boundary-note">
          <BadgeCheck aria-hidden="true" size={18} />
          <span>
            Public boundary: synthetic data only. No production auth, signing, policy internals, ledger,
            external risk calls, or webhook delivery.
          </span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Public reference admin console</p>
            <h2>{active.label}</h2>
            <p>{active.description}</p>
          </div>
          <div className="mode-pill">{modeLabel}</div>
        </header>
        {children}
      </main>
    </div>
  );
}
