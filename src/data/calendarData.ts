export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  color: string;
  recurrence: "daily" | "weekly" | "once";
  dayOfWeek?: number; // 0=Sun, 1=Mon, ... (for weekly events)
  date?: string; // YYYY-MM-DD (for one-time events)
}

export const recurringEvents: CalendarEvent[] = [
  {
    id: "morning-brief",
    title: "Morning Brief",
    time: "8:00 AM",
    color: "#f59e0b",
    recurrence: "daily",
  },
  {
    id: "nightly-consolidation",
    title: "Nightly Consolidation",
    time: "2:00 AM",
    color: "#3b82f6",
    recurrence: "daily",
  },
  {
    id: "agent-review",
    title: "Agent Review",
    time: "10:00 AM",
    color: "#22c55e",
    recurrence: "weekly",
    dayOfWeek: 1, // Monday
  },
];

export const oneTimeEvents: CalendarEvent[] = [
  {
    id: "mc-v2-launch",
    title: "Mission Control v2 Launch",
    time: "All day",
    color: "#10b981",
    recurrence: "once",
    date: "2026-03-21",
  },
  {
    id: "dynamic-data-research",
    title: "Dynamic Data Research",
    time: "All day",
    color: "#ec4899",
    recurrence: "once",
    date: "2026-03-22",
  },
];

export function getEventsForDay(
  year: number,
  month: number,
  day: number
): CalendarEvent[] {
  const date = new Date(year, month, day);
  const dow = date.getDay();
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const recurring = recurringEvents.filter((event) => {
    if (event.recurrence === "daily") return true;
    if (event.recurrence === "weekly" && event.dayOfWeek === dow) return true;
    return false;
  });

  const oneTime = oneTimeEvents.filter((event) => event.date === dateStr);

  return [...recurring, ...oneTime];
}
