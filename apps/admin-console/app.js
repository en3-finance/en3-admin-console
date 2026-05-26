const data = {
  organization: { id: "org_sandbox_001", name: "Reference Bank" },
  wallet: { id: "wallet_001", status: "active", asset: "USDC", network: "base-sepolia" },
  policy: { id: "policy_001", name: "High value stablecoin approval", action: "require_approval" },
  approval: {
    id: "approval_001",
    transactionId: "txn_001",
    status: "pending",
    reason: "Amount exceeds sandbox approval threshold."
  },
  riskReview: { id: "risk_001", status: "review_required", signals: ["mock_address_review_signal"] },
  audit: [
    { id: "audit_001", action: "wallet.created", resourceId: "wallet_001" },
    { id: "audit_002", action: "transaction.submitted", resourceId: "txn_001" },
    { id: "audit_003", action: "transaction.requires_approval", resourceId: "txn_001" }
  ]
};

const summary = document.querySelector("#summary");
const approval = document.querySelector("#approval");
const audit = document.querySelector("#audit");

summary.innerHTML = [
  ["Organization", data.organization.name],
  ["Wallet", `${data.wallet.asset} on ${data.wallet.network}`],
  ["Policy", data.policy.action],
  ["Risk Review", data.riskReview.status]
].map(([label, value]) => `<article class="card"><span>${label}</span><strong>${value}</strong></article>`).join("");

approval.innerHTML = `
  <p><strong>${data.approval.status}</strong> approval for <code>${data.approval.transactionId}</code></p>
  <p>${data.approval.reason}</p>
`;

audit.innerHTML = data.audit
  .map((event) => `<li><code>${event.action}</code> on <code>${event.resourceId}</code></li>`)
  .join("");
