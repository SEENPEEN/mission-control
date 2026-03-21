"use client";

import { agentUsage, monthlyBudget, dailyTrend } from "../data/usage";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Cell } from "recharts";

const totalDaily = agentUsage.reduce((sum, a) => sum + a.dailyCost, 0);
const weeklyEstimate = totalDaily * 7;
const monthlyEstimate = totalDaily * 30;
const remaining = monthlyBudget - monthlyEstimate;
const budgetPct = Math.min(100, (monthlyEstimate / monthlyBudget) * 100);

const barData = agentUsage.map((a) => ({
  name: a.name,
  cost: a.dailyCost,
  fill: a.color,
}));

export default function UsageTab() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-center">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-1">Today</p>
          <p className="text-2xl font-bold text-zinc-100 tabular-nums">${totalDaily.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-center">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-1">This Week</p>
          <p className="text-2xl font-bold text-zinc-100 tabular-nums">${weeklyEstimate.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-center">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-1">This Month</p>
          <p className="text-2xl font-bold text-zinc-100 tabular-nums">${monthlyEstimate.toFixed(2)}</p>
        </div>
      </div>

      {/* Budget bar */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Monthly Budget</h3>
          <span className="text-[11px] text-zinc-500 font-mono">
            ${monthlyEstimate.toFixed(2)} / ${monthlyBudget.toFixed(2)}
          </span>
        </div>
        <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              budgetPct > 90 ? "bg-red-500" : budgetPct > 70 ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${budgetPct}%` }}
          />
        </div>
        <p className={`text-[11px] mt-2 font-mono ${remaining >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `$${Math.abs(remaining).toFixed(2)} over budget`}
        </p>
      </div>

      {/* Per-agent bar chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Daily Cost by Agent</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} width={75} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#e4e4e7" }}
                formatter={(value) => [`$${Number(value).toFixed(2)}/day`, "Cost"]}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={20}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 30-day trend */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">30-Day Spend Trend</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyTrend} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#e4e4e7" }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Daily Cost"]}
              />
              <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
