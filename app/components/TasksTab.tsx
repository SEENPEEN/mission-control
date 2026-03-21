"use client";

import { tasks, type Task, type TaskStatus } from "../data/tasks";

const columnConfig: Record<TaskStatus, { label: string; emoji: string; color: string; border: string }> = {
  todo:        { label: "To Do",       emoji: "📋", color: "text-zinc-400",   border: "border-zinc-700/50" },
  in_progress: { label: "In Progress", emoji: "🔨", color: "text-yellow-400", border: "border-yellow-500/30" },
  done:        { label: "Done",        emoji: "✅", color: "text-emerald-400", border: "border-emerald-500/30" },
};

const priorityDot: Record<string, string> = {
  high: "bg-red-400",
  med: "bg-amber-400",
  low: "bg-blue-400",
};

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition-all duration-200 hover:border-zinc-600">
      <div className="flex items-start gap-2">
        {task.priority && (
          <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${priorityDot[task.priority] || "bg-zinc-600"}`} />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-zinc-200 leading-snug">{task.title}</p>
          {task.assignee && (
            <p className="text-[10px] text-zinc-600 mt-1">{task.assignee}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Column({ status }: { status: TaskStatus }) {
  const config = columnConfig[status];
  const items = tasks.filter((t) => t.status === status);

  return (
    <div className={`rounded-xl border ${config.border} bg-zinc-950/50 p-3 flex flex-col`}>
      <div className="flex items-center gap-2 mb-3 px-1">
        <span>{config.emoji}</span>
        <h3 className={`text-xs font-bold uppercase tracking-widest ${config.color}`}>
          {config.label}
        </h3>
        <span className="text-[10px] text-zinc-600 font-mono">({items.length})</span>
      </div>
      <div className="space-y-2 flex-1">
        {items.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default function TasksTab() {
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="space-y-4">
      <div className="flex gap-4 text-[11px] text-zinc-500 uppercase tracking-wider">
        <span>{todo + inProgress + done} tasks</span>
        <span className="text-zinc-700">|</span>
        <span className="text-yellow-400/70">{inProgress} active</span>
        <span className="text-zinc-700">|</span>
        <span className="text-emerald-400/70">{done} done</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Column status="todo" />
        <Column status="in_progress" />
        <Column status="done" />
      </div>
    </div>
  );
}
