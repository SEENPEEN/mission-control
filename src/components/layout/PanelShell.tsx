"use client";

import { type ReactNode } from "react";

interface PanelShellProps {
  label: string;
  count?: number;
  accentColor?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function PanelShell({
  label,
  count,
  accentColor,
  children,
  className = "",
  noPadding = false,
}: PanelShellProps) {
  return (
    <div
      className={`bg-bg-surface border border-border-subtle rounded-lg flex flex-col overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-subtle">
        {accentColor && (
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        )}
        <span className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary">
          {label}
        </span>
        {count !== undefined && (
          <span className="text-[10px] font-display text-text-ghost ml-auto tabular-nums">
            {count}
          </span>
        )}
      </div>
      <div
        className={`flex-1 overflow-y-auto ${noPadding ? "" : "p-3"}`}
      >
        {children}
      </div>
    </div>
  );
}
