export interface AgentCost {
  name: string;
  model: string;
  costPerDay: number;
  color: string;
  status: "active" | "pending";
}

export interface BudgetCategory {
  label: string;
  amount: number;
  color: string;
}

export const agentCosts: AgentCost[] = [
  { name: "Alfred", model: "Opus", costPerDay: 4.20, color: "#E8F630", status: "active" },
  { name: "Alfred2", model: "Sonnet", costPerDay: 1.50, color: "#00F0FF", status: "active" },
  { name: "AlfredSLIM", model: "Opus", costPerDay: 2.00, color: "#00F0FF", status: "active" },
  { name: "Kimi K", model: "Kimi", costPerDay: 0.15, color: "#FF2E97", status: "active" },
  { name: "Kodex", model: "Codex", costPerDay: 0.00, color: "#39FF14", status: "pending" },
  { name: "CronjobLewis", model: "Cron", costPerDay: 0.00, color: "#BF5FFF", status: "pending" },
];

export const monthlyBudget = 300;

export const totalDailySpend = agentCosts.reduce((sum, a) => sum + a.costPerDay, 0);

export const budgetCategories: BudgetCategory[] = [
  { label: "Heartbeats", amount: 45, color: "#00F0FF" },
  { label: "Morning Brief", amount: 62, color: "#E8F630" },
  { label: "Coding", amount: 85, color: "#39FF14" },
  { label: "Planning", amount: 38, color: "#BF5FFF" },
  { label: "Research", amount: 15, color: "#FF2E97" },
];

export function getSpendSummary() {
  const today = totalDailySpend;
  const thisWeek = today * 5.2;
  const thisMonth = today * 21;
  return { today, thisWeek, thisMonth };
}
