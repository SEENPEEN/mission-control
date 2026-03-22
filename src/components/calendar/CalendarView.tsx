"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import {
  getEventsForDate,
  alwaysRunningEvents,
  scheduledEvents,
  type CalendarEvent,
} from "@/data/calendarData";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

type ViewMode = "week" | "day" | "month";

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function parseTimeToMinutes(time: string): number {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 9999;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;
  return hours * 60 + minutes;
}

function formatCountdown(event: CalendarEvent, now: Date): string {
  // For always-running events, show interval
  if (event.recurrence === "always") return event.interval || "";

  // Find next occurrence
  const todayMinutes = now.getHours() * 60 + now.getMinutes();
  const eventMinutes = parseTimeToMinutes(event.time);

  let nextDate = new Date(now);

  if (event.recurrence === "daily") {
    if (eventMinutes <= todayMinutes) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
  } else if (event.recurrence === "weekly" && event.day !== undefined) {
    const currentDay = now.getDay();
    let daysUntil = event.day - currentDay;
    if (daysUntil < 0 || (daysUntil === 0 && eventMinutes <= todayMinutes)) {
      daysUntil += 7;
    }
    nextDate.setDate(nextDate.getDate() + daysUntil);
  } else if (event.recurrence === "once" && event.date) {
    nextDate = new Date(event.date + "T00:00:00");
  }

  // Set time
  const em = parseTimeToMinutes(event.time);
  if (em < 9999) {
    nextDate.setHours(Math.floor(em / 60), em % 60, 0, 0);
  }

  const diffMs = nextDate.getTime() - now.getTime();
  if (diffMs <= 0) return "now";

  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 60) return `in ${diffMin} min`;
  const diffHr = Math.round(diffMs / 3600000);
  if (diffHr < 24) return `in ${diffHr} hour${diffHr !== 1 ? "s" : ""}`;
  const diffDays = Math.round(diffMs / 86400000);
  return `in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
}

export default function CalendarView() {
  const today = new Date();
  const [activeView, setActiveView] = useState<ViewMode>("week");
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));
  const [monthYear, setMonthYear] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  // Week days array
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentWeekStart]);

  // Next up events
  const nextUpEvents = useMemo(() => {
    const now = new Date();
    const upcoming: { event: CalendarEvent; countdown: string }[] = [];

    for (const event of scheduledEvents) {
      upcoming.push({
        event,
        countdown: formatCountdown(event, now),
      });
    }

    return upcoming.slice(0, 5);
  }, []);

  function goToToday() {
    const t = new Date();
    setSelectedDate(t);
    setCurrentWeekStart(getWeekStart(t));
    setMonthYear({ month: t.getMonth(), year: t.getFullYear() });
  }

  function prevWeek() {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    setCurrentWeekStart(d);
  }

  function nextWeek() {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    setCurrentWeekStart(d);
  }

  function prevMonth() {
    setMonthYear((prev) => {
      if (prev.month === 0) return { month: 11, year: prev.year - 1 };
      return { month: prev.month - 1, year: prev.year };
    });
  }

  function nextMonth() {
    setMonthYear((prev) => {
      if (prev.month === 11) return { month: 0, year: prev.year + 1 };
      return { month: prev.month + 1, year: prev.year };
    });
  }

  function prevDay() {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  }

  function nextDay() {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  }

  // View toggle button
  const viewBtn = (view: ViewMode, label: string) => (
    <button
      onClick={() => setActiveView(view)}
      className={`px-3 py-1 text-[11px] font-display uppercase tracking-[0.1em] rounded-full transition-colors ${
        activeView === view
          ? "bg-[#E8F630] text-[#0A0A0F] border border-[#E8F630]"
          : "text-text-ghost hover:text-text-secondary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-bold tracking-[0.08em] uppercase text-text-primary">
            Scheduled Tasks
          </h2>
          <p className="text-xs text-text-ghost">
            Stevens automated routines
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-bg-deep rounded-full p-0.5">
            {viewBtn("week", "Week")}
            {viewBtn("day", "Day")}
            {viewBtn("month", "Month")}
          </div>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-[11px] font-display uppercase tracking-[0.1em] text-text-ghost hover:text-text-primary rounded-full border border-border-subtle hover:border-border-active transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToToday}
            className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Always Running (week view only) */}
      {activeView === "week" && (
        <div className="bg-bg-surface border border-border-subtle rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={12} className="text-[#E8F630]" />
            <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-secondary">
              Always Running
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {alwaysRunningEvents.map((event) => (
              <span
                key={event.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
                style={{
                  backgroundColor: event.color + "26",
                  color: event.color,
                  border: `1px solid ${event.color}40`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                {event.name} · {event.interval}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main View */}
      <div className="bg-bg-surface border border-border-subtle rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* WEEK VIEW */}
        {activeView === "week" && (
          <>
            <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle">
              <button
                onClick={prevWeek}
                className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="font-display text-[11px] tracking-[0.1em] uppercase text-text-secondary">
                {MONTH_NAMES[currentWeekStart.getMonth()]} {currentWeekStart.getFullYear()}
              </span>
              <button
                onClick={nextWeek}
                className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-7 flex-1 min-h-0">
              {weekDays.map((day, i) => {
                const isToday = isSameDay(day, today);
                const events = getEventsForDate(day).sort(
                  (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
                );
                return (
                  <div
                    key={i}
                    className={`flex flex-col border-r border-border-subtle/50 last:border-r-0 ${
                      isToday ? "bg-[#E8F630]/[0.03]" : ""
                    }`}
                  >
                    {/* Column header */}
                    <div
                      className={`text-center py-2.5 border-b border-border-subtle/50 ${
                        isToday ? "bg-[#E8F630]/[0.08]" : ""
                      }`}
                    >
                      <div
                        className={`font-display text-[10px] tracking-[0.15em] uppercase ${
                          isToday ? "text-[#E8F630]" : "text-text-ghost"
                        }`}
                      >
                        {DAY_NAMES_SHORT[i]}
                      </div>
                      <div
                        className={`text-sm tabular-nums font-medium mt-0.5 ${
                          isToday ? "text-[#E8F630]" : "text-text-secondary"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                    </div>
                    {/* Events stack */}
                    <div className="flex-1 p-1.5 space-y-1 overflow-y-auto">
                      {events.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => {
                            setSelectedDate(day);
                            setActiveView("day");
                          }}
                          className="w-full text-left rounded-md p-1.5 transition-opacity hover:opacity-80"
                          style={{
                            backgroundColor: event.color + "26",
                            borderLeft: `2px solid ${event.color}`,
                          }}
                        >
                          <div className="text-xs text-text-primary truncate leading-tight">
                            {event.name}
                          </div>
                          <div className="text-[10px] text-text-ghost mt-0.5">
                            {event.time}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* DAY VIEW */}
        {activeView === "day" && (() => {
          const dayEvents = getEventsForDate(selectedDate).sort(
            (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
          );
          const isToday = isSameDay(selectedDate, today);

          return (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
                <button
                  onClick={prevDay}
                  className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="text-center">
                  <div className="font-display text-[11px] tracking-[0.15em] uppercase text-text-ghost">
                    {DAY_NAMES_SHORT[selectedDate.getDay()]}
                  </div>
                  <div
                    className={`text-2xl tabular-nums font-bold mt-0.5 ${
                      isToday ? "text-[#E8F630]" : "text-text-primary"
                    }`}
                  >
                    {selectedDate.getDate()}
                  </div>
                  <div className="font-display text-[11px] tracking-[0.1em] uppercase text-text-secondary mt-0.5">
                    {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </div>
                </div>
                <button
                  onClick={nextDay}
                  className="p-1.5 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {dayEvents.length === 0 ? (
                  <p className="text-text-ghost text-xs font-display uppercase tracking-wider text-center py-8">
                    No events scheduled
                  </p>
                ) : (
                  <div className="space-y-3">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-4 p-4 rounded-lg"
                        style={{
                          backgroundColor: event.color + "15",
                          borderLeft: `3px solid ${event.color}`,
                        }}
                      >
                        <div className="text-sm tabular-nums text-text-secondary font-medium w-20 shrink-0">
                          {event.time}
                        </div>
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: event.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary font-medium">
                            {event.name}
                          </p>
                          <p className="text-xs text-text-ghost mt-0.5">
                            {event.recurrence === "daily"
                              ? "Daily"
                              : event.recurrence === "weekly"
                              ? "Every Monday"
                              : "One-time"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          );
        })()}

        {/* MONTH VIEW */}
        {activeView === "month" && (() => {
          const { month, year } = monthYear;
          const daysInMo = getDaysInMonth(year, month);
          const firstDay = getFirstDayOfWeek(year, month);
          const isCurrentMonth =
            today.getFullYear() === year && today.getMonth() === month;

          // Trailing days from previous month
          const prevMoDays = getDaysInMonth(
            month === 0 ? year - 1 : year,
            month === 0 ? 11 : month - 1
          );
          const trailingDays = Array.from(
            { length: firstDay },
            (_, i) => prevMoDays - firstDay + 1 + i
          );

          // Leading days for next month
          const totalCells = trailingDays.length + daysInMo;
          const leadingCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
          const leadingDays = Array.from({ length: leadingCount }, (_, i) => i + 1);

          return (
            <>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <h2 className="font-display text-lg font-bold tracking-[0.08em] uppercase text-text-primary">
                  {MONTH_NAMES[month]} {year}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg text-text-ghost hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-border-subtle">
                {DAY_LABELS.map((d, i) => (
                  <div
                    key={i}
                    className="text-center font-display text-[11px] tracking-[0.15em] uppercase text-text-ghost py-2.5"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 flex-1 min-h-0">
                {/* Previous month trailing */}
                {trailingDays.map((day, i) => (
                  <div
                    key={"prev-" + i}
                    className="border-b border-r border-border-subtle/50 h-16 md:h-24 p-1.5 md:p-2"
                  >
                    <span className="text-xs tabular-nums text-text-ghost/50">
                      {day}
                    </span>
                  </div>
                ))}

                {/* Current month */}
                {Array.from({ length: daysInMo }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(year, month, day);
                  const events = getEventsForDate(date);
                  const isToday = isCurrentMonth && today.getDate() === day;

                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDate(date);
                        setActiveView("day");
                      }}
                      className={`relative flex flex-col border-b border-r border-border-subtle/50 h-16 md:h-24 p-1.5 md:p-2 text-left transition-all duration-150 hover:bg-bg-card-hover ${
                        isToday ? "ring-1 ring-inset ring-[#E8F630]/40" : ""
                      }`}
                    >
                      <span
                        className={`text-xs tabular-nums leading-none ${
                          isToday
                            ? "text-[#E8F630] font-bold"
                            : "text-text-secondary"
                        }`}
                      >
                        {day}
                      </span>
                      {/* Event names (desktop) */}
                      <div className="hidden md:flex flex-col gap-0.5 mt-1 overflow-hidden flex-1">
                        {events.slice(0, 3).map((ev) => (
                          <div
                            key={ev.id}
                            className="flex items-center gap-1 min-w-0"
                          >
                            <span
                              className="w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: ev.color }}
                            />
                            <span className="text-[9px] text-text-secondary truncate leading-tight">
                              {ev.name}
                            </span>
                          </div>
                        ))}
                        {events.length > 3 && (
                          <span className="text-[9px] text-text-ghost">
                            +{events.length - 3} more
                          </span>
                        )}
                      </div>
                      {/* Event dots (mobile) */}
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
                {leadingDays.map((day, i) => (
                  <div
                    key={"next-" + i}
                    className="border-b border-r border-border-subtle/50 h-16 md:h-24 p-1.5 md:p-2"
                  >
                    <span className="text-xs tabular-nums text-text-ghost/50">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </div>

      {/* Next Up */}
      <div className="bg-bg-surface border border-border-subtle rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={12} className="text-text-ghost" />
          <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-secondary">
            Next Up
          </span>
        </div>
        <div className="space-y-2">
          {nextUpEvents.map(({ event, countdown }) => (
            <div
              key={event.id}
              className="flex items-center justify-between py-1"
            >
              <span className="text-xs font-medium" style={{ color: event.color }}>
                {event.name}
              </span>
              <span className="text-[11px] text-text-ghost tabular-nums">
                {countdown}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
