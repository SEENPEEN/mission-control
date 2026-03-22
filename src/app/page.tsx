"use client";

import React, { useMemo } from "react";

import { useApp } from "@/context/AppContext";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import ActivityFeed from "@/components/activity/ActivityFeed";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import TodoPanel from "@/components/todos/TodoPanel";
import NotesPanel from "@/components/notes/NotesPanel";
import CalendarView from "@/components/calendar/CalendarView";
import UsageView from "@/components/usage/UsageView";
import AgentsView from "@/components/agents/AgentsView";
import ContentView from "@/components/content/ContentView";
import DocsView from "@/components/docs/DocsView";
import MemoryView from "@/components/memory/MemoryView";

function TasksView() {
  const { state } = useApp();
  const stats = useMemo(() => {
    const total = state.cards.length;
    const inProgress = state.cards.filter((c) => c.status === "in-progress").length;
    const complete = state.cards.filter((c) => c.status === "complete").length;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const thisWeek = state.cards.filter((c) => new Date(c.createdAt) >= weekAgo).length;
    const completion = total > 0 ? Math.round((complete / total) * 100) : 0;
    return { thisWeek, inProgress, total, completion };
  }, [state.cards]);

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Stats bar */}
      <div className="shrink-0 flex items-center gap-4 flex-wrap">
        <span className="font-display text-sm text-text-primary tracking-wide">
          <span className="text-text-secondary">{stats.thisWeek}</span> This week
        </span>
        <span className="text-text-ghost">·</span>
        <span className="font-display text-sm text-text-primary tracking-wide">
          <span className="text-[#E8F630]">{stats.inProgress}</span> In progress
        </span>
        <span className="text-text-ghost">·</span>
        <span className="font-display text-sm text-text-primary tracking-wide">
          <span className="text-text-secondary">{stats.total}</span> Total
        </span>
        <span className="text-text-ghost">·</span>
        <span className="font-display text-sm text-emerald-400 tracking-wide">
          {stats.completion}% Completion
        </span>
      </div>

      {/* Action row */}
      <div className="shrink-0 flex items-center gap-2 flex-wrap">
        <button className="bg-emerald-500 text-white font-display text-xs tracking-wide rounded-lg px-4 py-1.5 hover:bg-emerald-400 transition-colors">
          + New task
        </button>
        <div className="flex items-center gap-1 ml-2">
          {["Steven", "Alfred", "All"].map((agent) => (
            <button
              key={agent}
              className={`px-3 py-1 rounded-full text-xs font-display tracking-wide transition-colors border ${
                agent === "All"
                  ? "border-border-active bg-white/5 text-text-primary"
                  : "border-border-subtle text-text-secondary hover:border-border-active hover:text-text-primary"
              }`}
            >
              {agent}
            </button>
          ))}
        </div>
        <button className="ml-auto px-3 py-1 rounded-full text-xs font-display tracking-wide border border-border-subtle text-text-secondary hover:border-border-active hover:text-text-primary transition-colors">
          All projects ▾
        </button>
      </div>

      {/* Main area: Kanban + Activity */}
      <div className="flex-1 min-h-0 flex gap-4">
        <div className="flex-1 min-w-0">
          <KanbanBoard />
        </div>
        <div className="w-[340px] hidden lg:flex flex-col min-h-0">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

function BoardView() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_360px] gap-4 h-full min-h-0">
      <KanbanBoard />
      <div className="flex flex-col gap-4 min-h-0">
        <TodoPanel />
        <NotesPanel />
      </div>
    </div>
  );
}

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="font-display text-sm text-text-ghost tracking-[0.15em] uppercase">{title}</p>
        <p className="text-text-ghost text-xs mt-2">Coming soon</p>
      </div>
    </div>
  );
}

const tabViews: Record<string, () => React.ReactElement> = {
  tasks: TasksView,
  projects: BoardView,
  calendar: CalendarView,
  usage: UsageView,
  agents: AgentsView,
  content: () => <ContentView />,
  docs: () => <DocsView />,
  memory: () => <MemoryView />,

};

export default function Home() {
  const { state } = useApp();
  const activeTab = state.activeTab || "tasks";
  const ViewComponent = tabViews[activeTab];

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-3 md:p-5 min-h-0 overflow-y-auto pb-20 md:pb-5">
          {ViewComponent ? <ViewComponent /> : <PlaceholderView title={activeTab} />}
        </main>
      </div>
      <MobileBottomBar />
    </div>
  );
}
