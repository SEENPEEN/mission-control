"use client";

import { calendarEvents } from "../data/calendar";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = "March";
const YEAR = 2026;
const FIRST_DAY = 0; // March 1, 2026 is Sunday
const DAYS_IN_MONTH = 31;
const TODAY = 21;

const eventColors: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  violet:  { bg: "bg-violet-500/15",  text: "text-violet-400",  border: "border-violet-500/30" },
  amber:   { bg: "bg-amber-500/15",   text: "text-amber-400",   border: "border-amber-500/30" },
};

function getEventsForDay(day: number, dayOfWeek: number) {
  return calendarEvents.filter((ev) => {
    if (ev.recurrence === "daily") return true;
    if (ev.recurrence === "weekly" && ev.weekday === dayOfWeek) return true;
    if (ev.recurrence === "once" && ev.day === day) return true;
    return false;
  });
}

export default function CalendarTab() {
  const blanks = Array.from({ length: FIRST_DAY }, (_, i) => i);
  const days = Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {calendarEvents.map((ev) => {
          const c = eventColors[ev.color] || eventColors.emerald;
          return (
            <div key={ev.id} className={`flex items-center gap-2 rounded-lg border ${c.border} ${c.bg} px-3 py-1.5`}>
              <span className={`text-xs font-medium ${c.text}`}>{ev.title}</span>
              <span className="text-[10px] text-zinc-500">{ev.time}</span>
              <span className="text-[10px] text-zinc-600">
                {ev.recurrence === "daily" ? "Daily" : ev.recurrence === "weekly" ? "Weekly" : "Once"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Calendar header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-zinc-100">{MONTH} {YEAR}</h2>
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Current month</span>
      </div>

      {/* Grid */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-zinc-800">
          {DAYS.map((d) => (
            <div key={d} className="py-2 text-center text-[11px] font-bold uppercase tracking-widest text-zinc-600">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7">
          {blanks.map((i) => (
            <div key={`blank-${i}`} className="min-h-[80px] border-b border-r border-zinc-800/50 bg-zinc-950/30" />
          ))}
          {days.map((day) => {
            const dayOfWeek = (FIRST_DAY + day - 1) % 7;
            const isToday = day === TODAY;
            const evs = getEventsForDay(day, dayOfWeek);
            return (
              <div
                key={day}
                className={`min-h-[80px] border-b border-r border-zinc-800/50 p-1.5 transition-colors ${
                  isToday ? "bg-zinc-800/30" : "hover:bg-zinc-900/50"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    isToday
                      ? "bg-emerald-500 text-black font-bold"
                      : "text-zinc-400"
                  }`}
                >
                  {day}
                </span>
                <div className="mt-1 space-y-0.5">
                  {evs.map((ev) => {
                    const c = eventColors[ev.color] || eventColors.emerald;
                    return (
                      <div
                        key={ev.id}
                        className={`rounded px-1 py-0.5 text-[8px] font-medium truncate ${c.bg} ${c.text} hidden sm:block`}
                      >
                        {ev.title}
                      </div>
                    );
                  })}
                  {evs.length > 0 && (
                    <div className="flex gap-0.5 sm:hidden">
                      {evs.map((ev) => {
                        const c = eventColors[ev.color] || eventColors.emerald;
                        return <div key={ev.id} className={`h-1.5 w-1.5 rounded-full ${c.bg}`} />;
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
