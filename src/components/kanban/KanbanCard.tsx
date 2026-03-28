"use client";

import { useState, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KanbanCard as KanbanCardType, Priority } from "@/types";
import { useApp } from "@/context/AppContext";

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  urgent: { color: "var(--priority-urgent)", label: "Urgent" },
  high: { color: "var(--priority-high)", label: "High" },
  medium: { color: "var(--priority-medium)", label: "Med" },
  low: { color: "var(--priority-low)", label: "Low" },
  none: { color: "var(--priority-none)", label: "—" },
};

const agentColors: Record<string, string> = {
  Steven: "#E8E8F0",
  Alfred: "#E8F630",
  Alfred2: "#00F0FF",
  SLIM: "#00F0FF",
  Kodex: "#39FF14",
  "Kimi K": "#FF2E97",
};

const priorities: Priority[] = ["urgent", "high", "medium", "low", "none"];

function PrioritySelector({
  current,
  onChange,
}: {
  current: Priority;
  onChange: (p: Priority) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-display tracking-wide uppercase hover:bg-bg-card-hover transition-colors duration-150"
        style={{ color: priorityConfig[current].color }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: priorityConfig[current].color }}
        />
        {priorityConfig[current].label}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-bg-surface border border-border-active rounded-md shadow-xl z-50 py-1 min-w-[100px]">
          {priorities.map((p) => (
            <button
              key={p}
              onClick={(e) => {
                e.stopPropagation();
                onChange(p);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-bg-card-hover transition-colors duration-150 ${
                p === current ? "text-text-primary" : "text-text-secondary"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: priorityConfig[p].color }}
              />
              {priorityConfig[p].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function KanbanCard({ card }: { card: KanbanCardType }) {
  const { dispatch } = useApp();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = card.priority ?? "none";
  const ago = useMemo(() => timeAgo(card.createdAt), [card.createdAt]);
  const agentColor = card.assignedTo ? agentColors[card.assignedTo] || "#737373" : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative bg-bg-card border border-border-subtle rounded-md px-3 py-2.5 cursor-grab active:cursor-grabbing transition-colors duration-150 hover:bg-bg-card-hover hover:border-border-active ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <div
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
        style={{ backgroundColor: priorityConfig[priority].color }}
      />
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {agentColor && (
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: agentColor }}
            />
          )}
          <p className="text-sm text-text-primary leading-snug truncate">{card.title}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "DELETE_CARD", payload: { id: card.id } });
          }}
          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-text-ghost hover:text-text-secondary transition-opacity duration-150 text-xs flex-shrink-0 mt-0.5 p-1 min-w-[32px] min-h-[32px] flex items-center justify-center sm:min-w-0 sm:min-h-0 sm:p-0"
        >
          &times;
        </button>
      </div>
      {card.description && (
        <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2">
          {card.description}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <PrioritySelector
          current={priority}
          onChange={(p) =>
            dispatch({
              type: "UPDATE_CARD",
              payload: { id: card.id, updates: { priority: p } },
            })
          }
        />
        <span className="text-[11px] font-display text-text-secondary tabular-nums">
          {ago}
        </span>
      </div>
      {card.assignedTo && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="inline-block px-2 py-0.5 rounded text-[9px] font-display tracking-wider uppercase border"
            style={{
              color: agentColor || "#737373",
              borderColor: `${agentColor || "#737373"}30`,
              backgroundColor: `${agentColor || "#737373"}10`,
            }}
          >
            {card.assignedTo}
          </span>
        </div>
      )}
    </div>
  );
}

export function DragOverlayCard({ card }: { card: KanbanCardType }) {
  const priority = card.priority ?? "none";
  return (
    <div
      className="bg-bg-card border border-border-active rounded-md px-3 py-2.5 shadow-2xl scale-[1.02]"
      style={{
        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px ${priorityConfig[priority].color}30`,
      }}
    >
      <div
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
        style={{ backgroundColor: priorityConfig[priority].color }}
      />
      <p className="text-sm text-text-primary leading-snug">{card.title}</p>
      {card.description && (
        <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2">
          {card.description}
        </p>
      )}
      <div className="mt-1.5 flex items-center gap-1 text-[10px] font-display tracking-wide uppercase" style={{ color: priorityConfig[priority].color }}>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: priorityConfig[priority].color }}
        />
        {priorityConfig[priority].label}
      </div>
    </div>
  );
}
