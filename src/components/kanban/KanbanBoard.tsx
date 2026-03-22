"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useApp } from "@/context/AppContext";
import { KanbanStatus, KanbanCard as KanbanCardType } from "@/types";
import KanbanColumn from "./KanbanColumn";
import { DragOverlayCard } from "./KanbanCard";

const columns: KanbanStatus[] = ["todo", "in-progress", "review", "complete"];

export default function KanbanBoard() {
  const { state, dispatch } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const cardsByStatus = useMemo(() => {
    const map: Record<KanbanStatus, KanbanCardType[]> = {
      todo: [],
      "in-progress": [],
      review: [],
      complete: [],
    };
    for (const card of state.cards) {
      map[card.status].push(card);
    }
    // Sort each column by order
    for (const status of columns) {
      map[status].sort((a, b) => a.order - b.order);
    }
    return map;
  }, [state.cards]);

  const activeCard = activeId
    ? state.cards.find((c) => c.id === activeId)
    : null;

  function findColumnForCard(id: string): KanbanStatus | null {
    // Check if id is a column id
    if (columns.includes(id as KanbanStatus)) return id as KanbanStatus;
    // Find the card's column
    const card = state.cards.find((c) => c.id === id);
    return card ? card.status : null;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumn = findColumnForCard(active.id as string);
    const overColumn = findColumnForCard(over.id as string);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    // Moving to a different column
    const overCards = cardsByStatus[overColumn];
    const overIndex = overCards.findIndex((c) => c.id === over.id);
    const insertIndex = overIndex >= 0 ? overIndex : overCards.length;

    dispatch({
      type: "MOVE_CARD",
      payload: {
        cardId: active.id as string,
        toStatus: overColumn,
        toIndex: insertIndex,
      },
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeColumn = findColumnForCard(active.id as string);
    const overColumn = findColumnForCard(over.id as string);

    if (!activeColumn || !overColumn) return;

    if (activeColumn === overColumn) {
      // Reorder within same column
      const columnCards = cardsByStatus[activeColumn];
      const oldIndex = columnCards.findIndex((c) => c.id === active.id);
      const newIndex = columnCards.findIndex((c) => c.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const reordered = arrayMove(columnCards, oldIndex, newIndex);
        dispatch({
          type: "REORDER_CARDS",
          payload: {
            status: activeColumn,
            cardIds: reordered.map((c) => c.id),
          },
        });
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            cards={cardsByStatus[status]}
          />
        ))}
      </div>
      <DragOverlay>
        {activeCard ? <DragOverlayCard card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
