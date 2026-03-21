"use client";

import { useApp } from "@/context/AppContext";
import {
  ListTodo,
  Bot,
  FileText,
  ShieldCheck,
  Users,
  Calendar,
  FolderKanban,
  Brain,
  BarChart3,
  BookOpen,
  UserCircle,
  Factory,
} from "lucide-react";

const navItems = [
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "content", label: "Content", icon: FileText },
  { id: "approvals", label: "Approvals", icon: ShieldCheck },
  { id: "council", label: "Council", icon: Users },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "memory", label: "Memory", icon: Brain },
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "docs", label: "Docs", icon: BookOpen },
  { id: "people", label: "People", icon: UserCircle },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const activeTab = state.activeTab || "tasks";

  return (
    <aside className="hidden md:flex w-[220px] h-full bg-bg-surface border-r border-border-subtle flex-col shrink-0">
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border-subtle">
        <div className="status-dot w-2 h-2 rounded-full bg-green-400" />
        <h1 className="font-display text-sm font-bold tracking-[0.12em] uppercase text-text-primary">
          Mission Control
        </h1>
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: "SET_TAB", payload: { tab: item.id } })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                isActive
                  ? "bg-white/5 text-text-primary border-l-2 border-amber-400"
                  : "text-text-secondary hover:bg-white/[0.03] hover:text-text-primary border-l-2 border-transparent"
              }`}
            >
              <Icon size={16} className={isActive ? "text-amber-400" : "text-text-ghost"} />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-2 pb-3 border-t border-border-subtle pt-3">
        <button
          onClick={() => dispatch({ type: "SET_TAB", payload: { tab: "factory" } })}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
            activeTab === "factory"
              ? "bg-white/5 text-text-primary border-l-2 border-purple-400"
              : "text-text-secondary hover:bg-white/[0.03] hover:text-text-primary border-l-2 border-transparent"
          }`}
        >
          <Factory size={16} className={activeTab === "factory" ? "text-purple-400" : "text-text-ghost"} />
          <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase">Factory</span>
        </button>
      </div>
    </aside>
  );
}