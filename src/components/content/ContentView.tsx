"use client";

import { useState } from "react";
import {
  Lightbulb,
  PenLine,
  CalendarCheck,
  Globe,
  FileText,
  Twitter,
  Video,
  MessageSquare,
  User,
  Clock,
} from "lucide-react";
import PanelShell from "@/components/layout/PanelShell";
import { contentItems, ContentStatus, ContentType } from "@/data/contentData";

const statusConfig: Record<
  ContentStatus,
  { label: string; color: string; icon: typeof Lightbulb }
> = {
  idea: { label: "Ideas", color: "#BF5FFF", icon: Lightbulb },
  draft: { label: "Drafts", color: "#00F0FF", icon: PenLine },
  review: { label: "In Review", color: "#E8F630", icon: FileText },
  scheduled: { label: "Scheduled", color: "#00F0FF", icon: CalendarCheck },
  published: { label: "Published", color: "#39FF14", icon: Globe },
};

const typeIcons: Record<ContentType, typeof FileText> = {
  blog: FileText,
  tweet: Twitter,
  video: Video,
  post: MessageSquare,
};

const statusOrder: ContentStatus[] = [
  "idea",
  "draft",
  "review",
  "scheduled",
  "published",
];

export default function ContentView() {
  const [filter, setFilter] = useState<ContentStatus | "all">("all");

  const counts = statusOrder.reduce(
    (acc, s) => {
      acc[s] = contentItems.filter((i) => i.status === s).length;
      return acc;
    },
    {} as Record<ContentStatus, number>,
  );

  const statCards: ContentStatus[] = ["idea", "draft", "scheduled", "published"];

  const visibleStatuses =
    filter === "all" ? statusOrder : statusOrder.filter((s) => s === filter);

  return (
    <div className="flex flex-col gap-4 h-full min-h-0">
      {/* Summary stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
        {statCards.map((status) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          const isActive = filter === status;
          return (
            <button
              key={status}
              onClick={() => setFilter(isActive ? "all" : status)}
              className={`bg-bg-surface border rounded-lg p-3 flex items-center gap-3 transition-all duration-150 text-left ${
                isActive
                  ? "border-border-active bg-white/5"
                  : "border-border-subtle hover:bg-white/[0.03]"
              }`}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ backgroundColor: cfg.color + "1a" }}
              >
                <Icon size={16} style={{ color: cfg.color }} />
              </div>
              <div>
                <p className="text-lg font-display font-bold text-text-primary tabular-nums">
                  {counts[status]}
                </p>
                <p className="font-display text-[10px] tracking-[0.1em] uppercase text-text-secondary">
                  {cfg.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content grouped by status */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
        {visibleStatuses.map((status) => {
          const cfg = statusConfig[status];
          const items = contentItems.filter((i) => i.status === status);
          if (items.length === 0) return null;
          return (
            <PanelShell
              key={status}
              label={cfg.label}
              count={items.length}
              accentColor={cfg.color}
            >
              <div className="space-y-1">
                {items.map((item) => {
                  const TypeIcon = typeIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/[0.03] transition-colors"
                    >
                      <TypeIcon
                        size={14}
                        className="text-text-ghost shrink-0"
                      />
                      <span className="text-sm text-text-primary flex-1 truncate">
                        {item.title}
                      </span>
                      <span
                        className="font-display text-[9px] tracking-[0.08em] uppercase px-1.5 py-0.5 rounded"
                        style={{
                          color: cfg.color,
                          backgroundColor: cfg.color + "1a",
                        }}
                      >
                        {item.type}
                      </span>
                      <span className="flex items-center gap-1 text-text-secondary text-xs shrink-0">
                        <User size={10} />
                        {item.assignedTo}
                      </span>
                      {item.dueDate && (
                        <span className="flex items-center gap-1 text-text-ghost text-[10px] shrink-0 tabular-nums">
                          <Clock size={10} />
                          {item.dueDate}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </PanelShell>
          );
        })}
      </div>
    </div>
  );
}
