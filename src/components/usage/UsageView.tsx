"use client";

import { useState, useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import PanelShell from "@/components/layout/PanelShell";
import AgentTicker from "@/components/usage/AgentTicker";
import {
  agentCosts,
  monthlyBudget,
  budgetCategories,
  getSpendSummary,
  type AgentCost,
} from "@/data/usageData";

function formatCurrency(n: number) {
  return "$" + n.toFixed(2);
}

export default function UsageView() {
  const [selectedAgent, setSelectedAgent] = useState<AgentCost | null>(null);
  const spend = getSpendSummary();
  const totalCategorySpend = budgetCategories.reduce((s, c) => s + c.amount, 0);
  const monthSpentPercent = Math.min((spend.thisMonth / monthlyBudget) * 100, 100);

  // Portfolio total chart — sum all agent histories
  const portfolioData = useMemo(() => {
    const dateMap: Record<string, number> = {};
    agentCosts.forEach((agent) => {
      agent.history.forEach((h) => {
        dateMap[h.date] = (dateMap[h.date] || 0) + h.cost;
      });
    });
    return Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, cost]) => ({ date, cost: parseFloat(cost.toFixed(2)) }));
  }, []);

  const portfolioCurrent = portfolioData[portfolioData.length - 1]?.cost ?? 0;
  const portfolioPrev = portfolioData[portfolioData.length - 2]?.cost ?? portfolioCurrent;
  const portfolioChange = portfolioCurrent - portfolioPrev;
  const portfolioChangePercent = portfolioPrev > 0 ? (portfolioChange / portfolioPrev) * 100 : 0;
  const portfolioUp = portfolioChange >= 0;
  const portfolioColor = portfolioUp ? "#39FF14" : "#FF2E97";

  const handleSelect = (agent: AgentCost) => {
    setSelectedAgent(selectedAgent?.ticker === agent.ticker ? null : agent);
  };

  // Expanded single agent view
  if (selectedAgent) {
    return (
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        <AgentTicker agent={selectedAgent} onSelect={handleSelect} expanded />

        {/* Monthly budget (still visible) */}
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
      </div>
    );
  }

  // Main portfolio view
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Portfolio header — Robinhood style */}
      <div className="bg-bg-surface border border-border-subtle rounded-lg p-5">
        <p className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-text-ghost">
          Fleet Burn Rate
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-display font-bold text-text-primary tabular-nums">
            {formatCurrency(portfolioCurrent)}
          </span>
          <span className="text-sm text-text-ghost">/day</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-display" style={{ color: portfolioColor }}>
            {portfolioUp ? "▲" : "▼"} {formatCurrency(Math.abs(portfolioChange))} ({Math.abs(portfolioChangePercent).toFixed(1)}%)
          </span>
          <span className="text-xs text-text-ghost">Today</span>
        </div>

        {/* Portfolio sparkline */}
        <div className="mt-4 h-28 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData.slice(-14)}>
              <defs>
                <linearGradient id="portfolio-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={portfolioColor} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={portfolioColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={["dataMin", "dataMax"]} hide />
              <Area
                type="monotone"
                dataKey="cost"
                stroke={portfolioColor}
                strokeWidth={2}
                fill="url(#portfolio-grad)"
                dot={false}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary cards — compact row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Today", value: spend.today },
          { label: "Week", value: spend.thisWeek },
          { label: "Month", value: spend.thisMonth },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-bg-surface border border-border-subtle rounded-lg px-3 py-2.5"
          >
            <p className="font-display text-[9px] font-bold tracking-[0.12em] uppercase text-text-ghost">
              {item.label}
            </p>
            <p className="text-lg font-display font-bold text-text-primary mt-0.5 tabular-nums">
              {formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Agent tickers — the watchlist */}
      <div>
        <p className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-text-ghost mb-2 px-1">
          Agents
        </p>
        <div className="space-y-2">
          {agentCosts.map((agent) => (
            <AgentTicker key={agent.ticker} agent={agent} onSelect={handleSelect} />
          ))}
        </div>
      </div>

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
