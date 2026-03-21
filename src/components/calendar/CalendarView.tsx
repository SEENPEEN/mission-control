"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PanelShell from "@/components/layout/PanelShell";
import { getEventsForDay, type CalendarEvent } from "@/data/calendarData";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
    setSelectedDay(null);
  }

  const selectedEvents: CalendarEvent[] = selectedDay
    ? getEventsForDay(year, month, selectedDay)
    : [];

  return (
    <div className="flex flex-col gap-4 h-full">
      <PanelShell label="Calendar" accentColor="#f59e0b" className="flex-1">
        {/* Header nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.03] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="font-display text-sm font-bold tracking-[0.1em] uppercase text-text-primary">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.03] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center font-display text-[10px] tracking-wider uppercase text-text-ghost py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={"empty-" + i} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const events = getEventsForDay(year, month, day);
            const isToday = isCurrentMonth && today.getDate() === day;
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                className={`relative flex flex-col items-center py-1.5 md:py-2 rounded-lg transition-all duration-150 ${
                  isSelected
                    ? "bg-white/10 border border-border-active"
                    : isToday
                    ? "bg-white/[0.04] border border-amber-400/30"
                    : "hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <span
                  className={`text-xs tabular-nums ${
                    isToday
                      ? "text-amber-400 font-bold"
                      : isSelected
                      ? "text-text-primary"
                      : "text-text-secondary"
                  }`}
                >
                  {day}
                </span>
                {events.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {events.map((ev) => (
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
        </div>
      </PanelShell>

      {/* Selected day events */}
      {selectedDay !== null && (
        <PanelShell
          label={`${MONTH_NAMES[month]} ${selectedDay}`}
          count={selectedEvents.length}
          accentColor="#f59e0b"
        >
          {selectedEvents.length === 0 ? (
            <p className="text-text-ghost text-xs font-display uppercase tracking-wider text-center py-4">
              No events
            </p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-bg-card border border-border-subtle"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: ev.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-primary font-display font-bold tracking-wide uppercase">
                      {ev.title}
                    </p>
                    <p className="text-[10px] text-text-secondary mt-0.5">
                      {ev.time} · {ev.recurrence === "daily" ? "Daily" : "Every Monday"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PanelShell>
      )}
    </div>
  );
}
