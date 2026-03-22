"use client";

import React from "react";

import { useApp } from "@/context/AppContext";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import AgentGrid from "@/components/agents/AgentGrid";
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
import MusicView from "@/components/music/MusicView";

function TasksView() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="shrink-0">
        <AgentGrid />
      </div>
      <div className="flex-1 min-h-0">
        <ActivityFeed />
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
  music: () => <MusicView />,
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
