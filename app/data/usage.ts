export interface AgentUsage {
  name: string;
  model: string;
  dailyCost: number;
  color: string;
}

export const agentUsage: AgentUsage[] = [
  { name: "Alfred", model: "Opus", dailyCost: 5.2, color: "#10b981" },
  { name: "Alfred2", model: "Sonnet", dailyCost: 1.5, color: "#3b82f6" },
  { name: "AlfredSLIM", model: "Opus", dailyCost: 3.0, color: "#f59e0b" },
  { name: "Kimi K", model: "Kimi", dailyCost: 0.15, color: "#8b5cf6" },
  { name: "Kodex", model: "TBD", dailyCost: 0, color: "#6b7280" },
  { name: "CronjobLewis", model: "Sonnet", dailyCost: 0, color: "#6b7280" },
];

export const monthlyBudget = 60;

// 30-day trend data (placeholder)
export const dailyTrend = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 8 + Math.sin(i * 0.5) * 3;
  const jitter = (Math.sin(i * 2.1) + Math.cos(i * 0.7)) * 1.5;
  return {
    day: `Mar ${day}`,
    cost: Math.max(0, +(base + jitter).toFixed(2)),
  };
});
