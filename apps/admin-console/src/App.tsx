import { useMemo, useState } from 'react';
import { EmptyState } from './components/EmptyState';
import { Shell } from './components/Shell';
import { datasets, moduleDefinitions } from './data/mockData';
import type { ApprovalDecision, ModuleId } from './data/types';
import { validateMockData } from './data/validators';
import { AuditTimeline } from './views/AuditTimeline';
import { Dashboard } from './views/Dashboard';
import {
  ApprovalsView,
  OrganizationsView,
  PoliciesView,
  ReconciliationView,
  RiskReviewView,
  RolesView,
  UsersView,
  WalletRegistryView,
  WebhooksView
} from './views/ModuleViews';
import { TransactionSimulation } from './views/TransactionSimulation';

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [selectedPolicyId, setSelectedPolicyId] = useState(datasets.policies[0]?.id ?? '');
  const [selectedApprovalId, setSelectedApprovalId] = useState(datasets.approvals[0]?.id ?? '');
  const [decisions, setDecisions] = useState<Record<string, ApprovalDecision>>({});
  const validationIssues = useMemo(() => validateMockData(datasets), []);

  function handleDecision(approvalId: string, status: ApprovalDecision['status']) {
    setDecisions((current) => ({
      ...current,
      [approvalId]: {
        status,
        decidedAt: new Date().toISOString(),
        note: 'Session-local mock decision only.'
      }
    }));
  }

  function renderActiveModule() {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'organizations':
        return <OrganizationsView />;
      case 'users':
        return <UsersView />;
      case 'roles':
        return <RolesView />;
      case 'wallets':
        return <WalletRegistryView />;
      case 'reconciliation':
        return <ReconciliationView />;
      case 'policies':
        return <PoliciesView selectedPolicyId={selectedPolicyId} onSelectPolicy={setSelectedPolicyId} />;
      case 'approvals':
        return (
          <ApprovalsView
            selectedApprovalId={selectedApprovalId}
            decisions={decisions}
            onSelectApproval={setSelectedApprovalId}
            onDecision={handleDecision}
          />
        );
      case 'simulation':
        return <TransactionSimulation />;
      case 'risk':
        return <RiskReviewView />;
      case 'audit':
        return <AuditTimeline events={datasets.auditEvents} />;
      case 'webhooks':
        return <WebhooksView />;
      default:
        return (
          <EmptyState
            variant="error"
            title="Module unavailable"
            message="The selected module is not configured in the public reference demo."
          />
        );
    }
  }

  return (
    <Shell modules={moduleDefinitions} activeModule={activeModule} onSelectModule={setActiveModule}>
      {validationIssues.length > 0 ? (
        <EmptyState
          variant="error"
          title="Mock data validation issue"
          message={validationIssues.map((issue) => `${issue.dataset}: ${issue.message}`).join(' ')}
        />
      ) : null}
      {renderActiveModule()}
    </Shell>
  );
}
