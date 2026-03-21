"use client";

import { useState } from "react";
import { missions } from "./data/missions";
import MissionsTab from "./components/MissionsTab";
import AgentsTab from "./components/AgentsTab";
import TasksTab from "./components/TasksTab";
import CalendarTab from "./components/CalendarTab";
import UsageTab from "./components/UsageTab";

type Tab = "missions" | "agents" | "tasks" | "calendar" | "usage";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "missions", label: "Missions", icon: "🎯" },
  { id: "agents",   label: "Agents",   icon: "🤖" },
  { id: "tasks",    label: "Tasks",    icon: "📋" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "usage",    label: "Usage",    icon: "📊" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("missions");
  const blocked = missions.filter((m) => m.status === "BLOCKED").length;
  const allGreen = blocked === 0;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:shrink-0 border-r border-zinc-800/60 bg-zinc-950/50 sticky top-0 h-screen">
        {/* Sidebar Header */}
        <div className="px-4 py-5 border-b border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <div className={`h-3 w-3 rounded-full ${allGreen ? "bg-emerald-400 shadow-lg shadow-emerald-500/40" : "bg-red-400 shadow-lg shadow-red-500/40 animate-pulse"}`} />
            <h1 className="text-sm font-bold tracking-wider uppercase text-zinc-100">
              Mission Control
            </h1>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1.5 font-mono">
            {allGreen ? "ALL SYSTEMS GO" : "ATTENTION REQUIRED"}
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-zinc-800/80 text-zinc-100 shadow-lg shadow-black/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-zinc-800/60">
          <p className="text-[9px] text-zinc-700 uppercase tracking-widest">
            SEEN-TOWER
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 border-b border-zinc-800/60 bg-black/80 backdrop-blur-xl">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`h-3 w-3 rounded-full ${allGreen ? "bg-emerald-400 shadow-lg shadow-emerald-500/40" : "bg-red-400 shadow-lg shadow-red-500/40 animate-pulse"}`} />
            <h1 className="text-sm font-bold tracking-wider uppercase text-zinc-100">
              Mission Control
            </h1>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">
            {allGreen ? "ALL SYSTEMS GO" : "ATTENTION REQUIRED"}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        <div className="mx-auto max-w-5xl px-4 py-6">
          {/* Tab Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-xl">{tabs.find((t) => t.id === activeTab)?.icon}</span>
            <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-wider">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          {/* Tab Content */}
          {activeTab === "missions" && <MissionsTab />}
          {activeTab === "agents" && <AgentsTab />}
          {activeTab === "tasks" && <TasksTab />}
          {activeTab === "calendar" && <CalendarTab />}
          {activeTab === "usage" && <UsageTab />}

          {/* Desktop Footer */}
          <footer className="hidden md:block border-t border-zinc-900 mt-8 pt-4 pb-8 text-center">
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest">
              SEEN-TOWER &bull; Last build {new Date().toISOString().split("T")[0]}
            </p>
          </footer>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/60 bg-black/90 backdrop-blur-xl">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "text-zinc-100"
                  : "text-zinc-600"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[9px] font-medium uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
