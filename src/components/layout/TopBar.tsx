"use client";

import { Search, Pause, Radio, Bell, Settings } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center gap-3 px-3 md:px-5 h-12 border-b border-border-subtle bg-bg-surface/50 backdrop-blur-sm">
      {/* Mobile: status dot + MC */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="status-dot w-2 h-2 rounded-full bg-[#E8F630]" />
        <span className="font-display text-xs font-bold tracking-[0.12em] uppercase text-text-primary">
          MC
        </span>
      </div>

      {/* Desktop: search bar */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-ghost" />
        <input
          type="text"
          placeholder="Search tasks, agents, logs..."
          className="w-full bg-bg-card border border-border-subtle rounded-lg pl-9 pr-14 py-1.5 text-xs text-text-primary placeholder:text-text-ghost focus:outline-none focus:border-[#00F0FF]/50 focus:shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-display text-text-ghost bg-bg-deep px-1.5 py-0.5 rounded border border-border-subtle">
          Cmd+K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button className="p-2 rounded-lg text-text-ghost hover:text-[#E8F630] hover:bg-[#E8F630]/[0.06] transition-colors hidden md:block" title="Pause all agents">
          <Pause size={15} />
        </button>
        <button className="p-2 rounded-lg text-text-ghost hover:text-[#39FF14] hover:bg-[#39FF14]/[0.06] transition-colors hidden md:block" title="Ping agents">
          <Radio size={15} />
        </button>
        <button className="p-2 rounded-lg text-text-ghost hover:text-[#FF2E97] hover:bg-[#FF2E97]/[0.06] transition-colors" title="Notifications">
          <Bell size={15} />
        </button>
        <button className="p-2 rounded-lg text-text-ghost hover:text-[#BF5FFF] hover:bg-[#BF5FFF]/[0.06] transition-colors hidden md:block" title="Settings">
          <Settings size={15} />
        </button>
      </div>
    </div>
  );
}
