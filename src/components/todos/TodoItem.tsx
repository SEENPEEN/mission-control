"use client";

import { TodoItem as TodoItemType } from "@/types";
import { useApp } from "@/context/AppContext";

export default function TodoItem({ todo }: { todo: TodoItemType }) {
  const { dispatch } = useApp();

  return (
    <div className="group flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-bg-card transition-colors duration-150">
      <button
        onClick={() => dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } })}
        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-150 ${
          todo.completed
            ? "bg-text-secondary border-text-secondary"
            : "border-border-active hover:border-text-secondary"
        }`}
      >
        {todo.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="var(--bg-deep)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span
        className={`text-sm flex-1 transition-all duration-150 ${
          todo.completed
            ? "line-through text-text-ghost"
            : "text-text-primary"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })}
        className="opacity-0 group-hover:opacity-100 text-text-ghost hover:text-text-secondary transition-opacity duration-150 text-xs px-1"
      >
        &times;
      </button>
    </div>
  );
}
