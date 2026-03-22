"use client";

import { useApp } from "@/context/AppContext";
import {
  ListTodo,
  FolderKanban,
  Bot,
  Calendar,
  BarChart3,
} from "lucide-react";

const tabs = [
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "usage", label: "Usage", icon: BarChart3 },
];

export default function MobileBottomBar() {
  const { state, dispatch } = useApp();
  const activeTab = state.activeTab || "tasks";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bg-surface border-t border-border-subtle">
      <div className="flex items-center justify-around h-16 px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: "SET_TAB", payload: { tab: tab.id } })}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors duration-150 ${
                isActive ? "text-[#E8F630]" : "text-text-ghost"
              }`}
            >
              <Icon size={20} />
              <span className="font-display text-[9px] font-bold tracking-wider uppercase">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
