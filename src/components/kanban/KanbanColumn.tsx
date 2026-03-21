"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanCard as KanbanCardType, KanbanStatus } from "@/types";
import { useApp } from "@/context/AppContext";
import KanbanCard from "./KanbanCard";

const columnConfig: Record<KanbanStatus, { label: string }> = {
  todo: { label: "TODO" },
  "in-progress": { label: "IN PROGRESS" },
  complete: { label: "COMPLETE" },
};

export default function KanbanColumn({
  status,
  cards,
}: {
  status: KanbanStatus;
  cards: KanbanCardType[];
}) {
  const { dispatch } = useApp();
  const [input, setInput] = useState("");
  const config = columnConfig[status];

  const { setNodeRef, isOver } = useDroppable({ id: status });

  const handleAdd = () => {
    const title = input.trim();
    if (!title) return;
    dispatch({ type: "ADD_CARD", payload: { title, status } });
    setInput("");
  };

  return (
    <div
      className={`bg-bg-surface border rounded-lg flex flex-col overflow-hidden transition-colors duration-150 ${
        isOver ? "border-border-active" : "border-border-subtle"
      }`}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-subtle">
        <div className="w-1.5 h-1.5 rounded-full bg-text-ghost" />
        <span className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary">
          {config.label}
        </span>
        <span className="text-[10px] font-display text-text-ghost ml-auto tabular-nums">
          {cards.length}
        </span>
      </div>

      {/* Card list */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-2 min-h-0">
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {cards.length === 0 ? (
              <div className="border border-dashed border-border-subtle rounded-md px-4 py-8 text-center">
                <p className="text-text-ghost text-xs font-display tracking-wide">
                  DROP HERE
                </p>
              </div>
            ) : (
              cards.map((card) => <KanbanCard key={card.id} card={card} />)
            )}
          </div>
        </SortableContext>
      </div>

      {/* Add input */}
      <div className="p-2 border-t border-border-subtle">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="+ Add card..."
          className="w-full bg-bg-card border border-transparent rounded-md px-3 py-1.5 text-sm text-text-primary placeholder:text-text-ghost focus:outline-none focus:border-border-subtle transition-colors duration-150"
        />
      </div>
    </div>
  );
}
