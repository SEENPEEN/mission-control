export interface AgentCost {
  name: string;
  ticker: string;
  model: string;
  costPerDay: number;
  color: string;
  status: "active" | "pending";
  // Historical daily cost data (last 30 days)
  history: { date: string; cost: number }[];
}

export interface BudgetCategory {
  label: string;
  amount: number;
  color: string;
}

// Generate mock historical data with realistic patterns
function generateHistory(baseCost: number, volatility: number, trend: number = 0): { date: string; cost: number }[] {
  const history: { date: string; cost: number }[] = [];
  const now = new Date();
  let current = baseCost * 0.6;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    // Random walk with trend
    const change = (Math.random() - 0.45 + trend) * volatility;
    current = Math.max(0.01, current + change);

    history.push({ date: dateStr, cost: parseFloat(current.toFixed(2)) });
  }

  return history;
}

export const agentCosts: AgentCost[] = [
  {
    name: "Alfred",
    ticker: "ALFD",
    model: "Opus 4",
    costPerDay: 4.20,
    color: "#E8F630",
    status: "active",
    history: generateHistory(4.20, 0.8, 0.02),
  },
  {
    name: "Sonnet",
    ticker: "SNNT",
    model: "Sonnet 4",
    costPerDay: 1.50,
    color: "#00F0FF",
    status: "active",
    history: generateHistory(1.50, 0.35, 0.01),
  },
  {
    name: "SLIM",
    ticker: "SLIM",
    model: "GPT-5.1m",
    costPerDay: 2.00,
    color: "#00F0FF",
    status: "active",
    history: generateHistory(2.00, 0.4, 0.005),
  },
  {
    name: "Kimi K",
    ticker: "KIMI",
    model: "K2.5",
    costPerDay: 0.15,
    color: "#FF2E97",
    status: "active",
    history: generateHistory(0.15, 0.05, -0.001),
  },
  {
    name: "Kodex",
    ticker: "KODX",
    model: "Codex",
    costPerDay: 0.00,
    color: "#39FF14",
    status: "pending",
    history: generateHistory(0.01, 0.005, 0),
  },
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

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "YTD";

export function filterHistory(history: { date: string; cost: number }[], range: TimeRange) {
  const now = new Date();
  let cutoff: Date;

  switch (range) {
    case "1D":
      cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - 1);
      break;
    case "1W":
      cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - 7);
      break;
    case "1M":
      cutoff = new Date(now);
      cutoff.setMonth(cutoff.getMonth() - 1);
      break;
    case "3M":
      cutoff = new Date(now);
      cutoff.setMonth(cutoff.getMonth() - 3);
      break;
    case "YTD":
      cutoff = new Date(now.getFullYear(), 0, 1);
      break;
  }

  return history.filter((h) => new Date(h.date) >= cutoff);
}
