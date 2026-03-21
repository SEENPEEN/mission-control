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
  { name: "Alfred", model: "Opus", costPerDay: 4.20, color: "#f59e0b", status: "active" },
  { name: "Alfred2", model: "Sonnet", costPerDay: 1.50, color: "#3b82f6", status: "active" },
  { name: "AlfredSLIM", model: "Opus", costPerDay: 2.00, color: "#06b6d4", status: "active" },
  { name: "Kimi K", model: "Kimi", costPerDay: 0.15, color: "#ec4899", status: "active" },
  { name: "Kodex", model: "Codex", costPerDay: 0.00, color: "#22c55e", status: "pending" },
  { name: "CronjobLewis", model: "Cron", costPerDay: 0.00, color: "#a855f7", status: "pending" },
];

export const monthlyBudget = 300;

export const totalDailySpend = agentCosts.reduce((sum, a) => sum + a.costPerDay, 0);

export const budgetCategories: BudgetCategory[] = [
  { label: "Heartbeats", amount: 45, color: "#3b82f6" },
  { label: "Morning Brief", amount: 62, color: "#f59e0b" },
  { label: "Coding", amount: 85, color: "#22c55e" },
  { label: "Planning", amount: 38, color: "#a855f7" },
  { label: "Research", amount: 15, color: "#ec4899" },
];

export function getSpendSummary() {
  const today = totalDailySpend;
  const thisWeek = today * 5.2;
  const thisMonth = today * 21;
  return { today, thisWeek, thisMonth };
}
