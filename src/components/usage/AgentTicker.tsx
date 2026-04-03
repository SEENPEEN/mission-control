"use client";

import { useState, useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { type AgentCost, type TimeRange, filterHistory } from "@/data/usageData";

const TIME_RANGES: TimeRange[] = ["1D", "1W", "1M", "3M", "YTD"];

function formatCurrency(n: number) {
  return "$" + n.toFixed(2);
}

interface AgentTickerProps {
  agent: AgentCost;
  onSelect?: (agent: AgentCost) => void;
  expanded?: boolean;
}

export default function AgentTicker({ agent, onSelect, expanded = false }: AgentTickerProps) {
  const [range, setRange] = useState<TimeRange>("1M");

  const filteredData = useMemo(
    () => filterHistory(agent.history, range),
    [agent.history, range]
  );

  const current = agent.history[agent.history.length - 1]?.cost ?? 0;
  const previous = agent.history[agent.history.length - 2]?.cost ?? current;
  const periodStart = filteredData[0]?.cost ?? current;

  const change = current - periodStart;
  const changePercent = periodStart > 0 ? (change / periodStart) * 100 : 0;
  const isUp = change >= 0;
  const changeColor = isUp ? "#39FF14" : "#FF2E97";

  // For the sparkline (non-expanded), just show last 7 data points
  const sparkData = agent.history.slice(-7);

  if (!expanded) {
    return (
      <button
        onClick={() => onSelect?.(agent)}
        className="w-full bg-bg-surface border border-border-subtle rounded-lg p-4 hover:border-border-active transition-all text-left group"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: agent.color }}
              />
              <span className="font-display text-xs font-bold tracking-[0.1em] uppercase text-text-primary">
                {agent.ticker}
              </span>
              <span className="text-[10px] text-text-ghost truncate">{agent.name}</span>
              {agent.status === "pending" && (
                <span className="text-[9px] font-display tracking-wider uppercase text-text-ghost bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle">
                  IPO
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-lg font-display font-bold text-text-primary tabular-nums">
                {formatCurrency(current)}
              </span>
              <span className="text-[10px] text-text-ghost">/day</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px]" style={{ color: changeColor }}>
                {isUp ? "▲" : "▼"} {formatCurrency(Math.abs(change))} ({Math.abs(changePercent).toFixed(1)}%)
              </span>
              <span className="text-[10px] text-text-ghost">Today</span>
            </div>
          </div>

          {/* Mini sparkline */}
          <div className="w-20 h-10 shrink-0 ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id={`spark-${agent.ticker}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={changeColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={changeColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke={changeColor}
                  strokeWidth={1.5}
                  fill={`url(#spark-${agent.ticker})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </button>
    );
  }

  // Expanded view — full Robinhood style
  return (
    <div className="flex flex-col gap-3">
      {/* Back button + header */}
      <button
        onClick={() => onSelect?.(agent)}
        className="flex items-center gap-2 text-text-ghost hover:text-text-primary transition-colors self-start"
      >
        <span className="text-sm">←</span>
        <span className="font-display text-[10px] tracking-[0.1em] uppercase">Back</span>
      </button>

      <div className="bg-bg-surface border border-border-subtle rounded-lg p-5">
        {/* Ticker header */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: agent.color }}
          />
          <span className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-text-ghost">
            {agent.ticker}
          </span>
          {agent.status === "pending" && (
            <span className="text-[9px] font-display tracking-wider uppercase text-text-ghost bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle ml-1">
              IPO
            </span>
          )}
        </div>

        <h2 className="font-display text-lg font-bold text-text-primary tracking-wide">
          {agent.name}
        </h2>

        {/* Price */}
        <div className="mt-2">
          <span className="text-3xl font-display font-bold text-text-primary tabular-nums">
            {formatCurrency(current)}
          </span>
          <span className="text-sm text-text-ghost ml-1">/day</span>
        </div>

        {/* Change */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-display" style={{ color: changeColor }}>
            {isUp ? "▲" : "▼"} {formatCurrency(Math.abs(change))} ({Math.abs(changePercent).toFixed(2)}%)
          </span>
          <span className="text-xs text-text-ghost">
            {range === "1D" ? "Today" : range === "1W" ? "Past week" : range === "1M" ? "Past month" : range === "3M" ? "Past 3 months" : "Year to date"}
          </span>
        </div>

        {/* Chart */}
        <div className="mt-5 h-48 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id={`area-${agent.ticker}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={changeColor} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={changeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={["dataMin", "dataMax"]} hide />
              <Area
                type="monotone"
                dataKey="cost"
                stroke={changeColor}
                strokeWidth={2}
                fill={`url(#area-${agent.ticker})`}
                dot={false}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dotted divider line */}
        <div className="border-t border-dotted border-border-subtle mt-2 mb-4" />

        {/* Time range selector */}
        <div className="flex items-center gap-2">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wider transition-all ${
                range === r
                  ? "text-bg-deep border border-transparent"
                  : "text-text-ghost border border-border-subtle hover:text-text-secondary hover:border-border-active"
              }`}
              style={range === r ? { backgroundColor: changeColor } : undefined}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <p className="font-display text-[10px] text-text-ghost tracking-[0.1em] uppercase">
              Model
            </p>
            <p className="text-sm text-text-primary font-display mt-0.5">{agent.model}</p>
          </div>
          <div>
            <p className="font-display text-[10px] text-text-ghost tracking-[0.1em] uppercase">
              Status
            </p>
            <p className="text-sm mt-0.5" style={{ color: agent.status === "active" ? "#39FF14" : "#4A4A60" }}>
              {agent.status === "active" ? "● Active" : "○ Pending"}
            </p>
          </div>
          <div>
            <p className="font-display text-[10px] text-text-ghost tracking-[0.1em] uppercase">
              30D Total
            </p>
            <p className="text-sm text-text-primary font-display mt-0.5 tabular-nums">
              {formatCurrency(agent.history.reduce((s, h) => s + h.cost, 0))}
            </p>
          </div>
          <div>
            <p className="font-display text-[10px] text-text-ghost tracking-[0.1em] uppercase">
              30D Avg
            </p>
            <p className="text-sm text-text-primary font-display mt-0.5 tabular-nums">
              {formatCurrency(agent.history.reduce((s, h) => s + h.cost, 0) / agent.history.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
