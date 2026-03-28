"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import {
  ListTodo,
  FolderKanban,
  Bot,
  Calendar,
  BarChart3,
  FileText,
  ShieldCheck,
  Users,
  Brain,
  BookOpen,
  MoreHorizontal,
  X,
} from "lucide-react";

const primaryTabs = [
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "calendar", label: "Calendar", icon: Calendar },
];

const moreTabs = [
  { id: "content", label: "Content", icon: FileText },
  { id: "approvals", label: "Approvals", icon: ShieldCheck },
  { id: "council", label: "Council", icon: Users },
  { id: "memory", label: "Memory", icon: Brain },
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "docs", label: "Docs", icon: BookOpen },
];

const allMoreIds = new Set(moreTabs.map((t) => t.id));

export default function MobileBottomBar() {
  const { state, dispatch } = useApp();
  const activeTab = state.activeTab || "tasks";
  const [moreOpen, setMoreOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close menu on tab change
  useEffect(() => {
    setMoreOpen(false);
  }, [activeTab]);

  // Close on outside click
  useEffect(() => {
    if (!moreOpen) return;
    function handleClick(e: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);

  const isMoreActive = allMoreIds.has(activeTab);

  return (
    <>
      {/* Slide-up more menu */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMoreOpen(false)}
          />
          {/* Menu */}
          <div
            ref={overlayRef}
            className="absolute bottom-0 left-0 right-0 bg-bg-surface border-t border-border-subtle rounded-t-2xl pb-[env(safe-area-inset-bottom)] animate-slide-up"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border-active" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-2">
              <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-secondary">
                More
              </span>
              <button
                onClick={() => setMoreOpen(false)}
                className="p-2 -mr-2 rounded-lg text-text-ghost hover:text-text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            {/* Tab grid */}
            <div className="grid grid-cols-3 gap-1 px-3 pb-4">
              {moreTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      dispatch({ type: "SET_TAB", payload: { tab: tab.id } });
                      setMoreOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-colors duration-150 min-h-[72px] ${
                      isActive
                        ? "bg-[#E8F630]/[0.08] text-[#E8F630]"
                        : "text-text-secondary hover:bg-white/[0.04] active:bg-white/[0.06]"
                    }`}
                  >
                    <Icon size={22} />
                    <span className="font-display text-[10px] font-bold tracking-wider uppercase">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bg-surface border-t border-border-subtle">
        <div className="flex items-center justify-around h-16 px-1 pb-[env(safe-area-inset-bottom)]">
          {primaryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => dispatch({ type: "SET_TAB", payload: { tab: tab.id } })}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 min-h-[44px] transition-colors duration-150 ${
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
          {/* More button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 min-h-[44px] transition-colors duration-150 ${
              isMoreActive || moreOpen ? "text-[#E8F630]" : "text-text-ghost"
            }`}
          >
            <MoreHorizontal size={20} />
            <span className="font-display text-[9px] font-bold tracking-wider uppercase">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
