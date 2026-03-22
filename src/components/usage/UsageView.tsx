"use client";

import PanelShell from "@/components/layout/PanelShell";
import {
  agentCosts,
  monthlyBudget,
  budgetCategories,
  getSpendSummary,
} from "@/data/usageData";

function formatCurrency(n: number) {
  return "$" + n.toFixed(2);
}

export default function UsageView() {
  const spend = getSpendSummary();
  const totalCategorySpend = budgetCategories.reduce((s, c) => s + c.amount, 0);
  const monthSpentPercent = Math.min((spend.thisMonth / monthlyBudget) * 100, 100);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Today", value: spend.today },
          { label: "This Week", value: spend.thisWeek },
          { label: "This Month", value: spend.thisMonth },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-bg-surface border border-border-subtle rounded-lg p-4 hover:border-[#00F0FF]/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.06)] transition-all"
          >
            <p className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-text-ghost">
              {item.label}
            </p>
            <p className="text-2xl font-display font-bold text-text-primary mt-1 tabular-nums">
              {formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Per-agent cost bars */}
      <PanelShell label="Per-Agent Cost" accentColor="#00F0FF" count={agentCosts.length}>
        <div className="space-y-3">
          {agentCosts.map((agent) => {
            const maxCost = Math.max(...agentCosts.map((a) => a.costPerDay), 1);
            const pct = (agent.costPerDay / maxCost) * 100;

            return (
              <div key={agent.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-primary font-display font-bold tracking-wide uppercase">
                      {agent.name}
                    </span>
                    <span className="text-[10px] text-text-ghost">({agent.model})</span>
                    {agent.status === "pending" && (
                      <span className="text-[9px] font-display tracking-wider uppercase text-text-ghost bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle">
                        Pending
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary tabular-nums font-display">
                    {formatCurrency(agent.costPerDay)}/day
                  </span>
                </div>
                <div className="h-2 bg-bg-card rounded-full overflow-hidden border border-border-subtle">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: pct > 0 ? Math.max(pct, 2) + "%" : "0%",
                      backgroundColor: agent.color,
                      opacity: agent.status === "pending" ? 0.3 : 1,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </PanelShell>

      {/* Monthly budget */}
      <PanelShell label="Monthly Budget" accentColor="#39FF14">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              {formatCurrency(spend.thisMonth)} of {formatCurrency(monthlyBudget)}
            </span>
            <span className="text-xs text-text-ghost tabular-nums font-display">
              {monthSpentPercent.toFixed(0)}%
            </span>
          </div>
          <div className="h-3 bg-bg-card rounded-full overflow-hidden border border-border-subtle">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: monthSpentPercent + "%",
                backgroundColor:
                  monthSpentPercent > 90
                    ? "#FF2E97"
                    : monthSpentPercent > 70
                    ? "#E8F630"
                    : "#39FF14",
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-text-ghost font-display uppercase tracking-wider">
            <span>Spent: {formatCurrency(spend.thisMonth)}</span>
            <span>Remaining: {formatCurrency(Math.max(monthlyBudget - spend.thisMonth, 0))}</span>
          </div>
        </div>
      </PanelShell>

      {/* Budget breakdown */}
      <PanelShell label="Budget Breakdown" accentColor="#BF5FFF">
        <div className="space-y-2.5">
          {budgetCategories.map((cat) => {
            const pct = ((cat.amount / totalCategorySpend) * 100).toFixed(0);
            return (
              <div key={cat.label} className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="flex-1 text-xs text-text-primary font-display font-bold tracking-wide uppercase">
                  {cat.label}
                </span>
                <span className="text-xs text-text-secondary tabular-nums">
                  {formatCurrency(cat.amount)}
                </span>
                <span className="text-[10px] text-text-ghost tabular-nums w-8 text-right">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </PanelShell>
    </div>
  );
}
