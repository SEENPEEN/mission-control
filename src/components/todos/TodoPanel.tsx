"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import PanelShell from "@/components/layout/PanelShell";
import TodoItem from "./TodoItem";

export default function TodoPanel() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    dispatch({ type: "ADD_TODO", payload: { text } });
    setInput("");
  };

  const activeCount = state.todos.filter((t) => !t.completed).length;

  return (
    <PanelShell
      label="Checklist"
      count={activeCount}
      accentColor="var(--text-secondary)"
      className="flex-[3]"
      noPadding
    >
      <div className="p-3 pb-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a task..."
          className="w-full bg-bg-card border border-border-subtle rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-ghost focus:outline-none focus:border-border-active transition-colors duration-150"
        />
      </div>
      <div className="p-2 flex flex-col gap-0.5">
        {state.todos.length === 0 ? (
          <div className="border border-dashed border-border-subtle rounded-md px-4 py-6 text-center">
            <p className="text-text-ghost text-xs font-display tracking-wide">
              NO TASKS YET
            </p>
          </div>
        ) : (
          state.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </PanelShell>
  );
}
