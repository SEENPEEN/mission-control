"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getEventsForDay, type CalendarEvent } from "@/data/calendarData";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarView() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March = 2
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Previous month trailing days
  const prevMonthDays = useMemo(() => {
    if (firstDay === 0) return [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevDaysInMonth = getDaysInMonth(prevYear, prevMonth);
    return Array.from({ length: firstDay }, (_, i) => prevDaysInMonth - firstDay + 1 + i);
  }, [year, month, firstDay]);

  // Next month leading days
  const totalCells = prevMonthDays.length + daysInMonth;
  const nextMonthDays = useMemo(() => {
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    return Array.from({ length: remaining }, (_, i) => i + 1);
  }, [totalCells]);

  function prevMonthNav() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
    setSelectedDay(null);
  }

  function nextMonthNav() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
    setSelectedDay(null);
  }

  const selectedEvents: CalendarEvent[] = selectedDay
    ? getEventsForDay(year, month, selectedDay)
    : [];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Calendar panel */}
      <div className="bg-bg-surface border border-border-subtle rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
          <button
            onClick={prevMonthNav}
            className="p-2 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-display text-lg font-bold tracking-[0.08em] uppercase text-text-primary">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={nextMonthNav}
            className="p-2 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border-subtle">
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="text-center font-display text-[11px] tracking-[0.15em] uppercase text-text-ghost py-2.5">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 flex-1 min-h-0">
          {/* Previous month trailing */}
          {prevMonthDays.map((day, i) => (
            <div
              key={"prev-" + i}
              className="border-b border-r border-border-subtle/50 h-16 md:h-24 p-1.5 md:p-2"
            >
              <span className="text-xs tabular-nums text-text-ghost/50">{day}</span>
            </div>
          ))}

          {/* Current month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const events = getEventsForDay(year, month, day);
            const isToday = isCurrentMonth && today.getDate() === day;
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                className={`relative flex flex-col border-b border-r border-border-subtle/50 h-16 md:h-24 p-1.5 md:p-2 text-left transition-all duration-150 hover:bg-bg-card-hover ${
                  isSelected ? "bg-white/[0.06]" : ""
                } ${isToday ? "ring-1 ring-inset ring-amber-400/40" : ""}`}
              >
                <span
                  className={`text-xs tabular-nums leading-none ${
                    isToday
                      ? "text-amber-400 font-bold"
                      : isSelected
                      ? "text-text-primary font-medium"
                      : "text-text-secondary"
                  }`}
                >
                  {day}
                </span>
                {/* Event names on cells (desktop) */}
                <div className="hidden md:flex flex-col gap-0.5 mt-1 overflow-hidden flex-1">
                  {events.slice(0, 3).map((ev) => (
                    <div key={ev.id} className="flex items-center gap-1 min-w-0">
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: ev.color }}
                      />
                      <span className="text-[9px] text-text-secondary truncate leading-tight">
                        {ev.title}
                      </span>
                    </div>
                  ))}
                  {events.length > 3 && (
                    <span className="text-[9px] text-text-ghost">+{events.length - 3} more</span>
                  )}
                </div>
                {/* Event dots on cells (mobile) */}
                {events.length > 0 && (
                  <div className="flex md:hidden gap-0.5 mt-auto">
                    {events.slice(0, 4).map((ev) => (
                      <div
                        key={ev.id}
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: ev.color }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}

          {/* Next month leading */}
          {nextMonthDays.map((day, i) => (
            <div
              key={"next-" + i}
              className="border-b border-r border-border-subtle/50 h-16 md:h-24 p-1.5 md:p-2"
            >
              <span className="text-xs tabular-nums text-text-ghost/50">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected day event list */}
      {selectedDay !== null && (
        <div className="shrink-0 bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-secondary">
              {MONTH_NAMES[month]} {selectedDay}
            </span>
            <span className="ml-auto font-display text-[10px] text-text-ghost tabular-nums">
              {selectedEvents.length} events
            </span>
          </div>
          <div className="p-3">
            {selectedEvents.length === 0 ? (
              <p className="text-text-ghost text-xs font-display uppercase tracking-wider text-center py-4">
                No events
              </p>
            ) : (
              <div className="space-y-2">
                {selectedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-bg-card border border-border-subtle hover:border-border-active transition-colors"
                  >
                    <div
                      className="w-0.5 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: ev.color }}
                    />
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: ev.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-primary font-medium">
                        {ev.title}
                      </p>
                      <p className="text-[10px] text-text-secondary mt-0.5">
                        {ev.time} · {ev.recurrence === "daily" ? "Daily" : ev.recurrence === "weekly" ? "Every Monday" : "One-time"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
