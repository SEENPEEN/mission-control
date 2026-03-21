export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  color: string;
  recurrence: "daily" | "weekly" | "monthly";
  dayOfWeek?: number; // 0=Sun, 1=Mon, ...
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

export function getEventsForDay(
  year: number,
  month: number,
  day: number
): CalendarEvent[] {
  const date = new Date(year, month, day);
  const dow = date.getDay();

  return recurringEvents.filter((event) => {
    if (event.recurrence === "daily") return true;
    if (event.recurrence === "weekly" && event.dayOfWeek === dow) return true;
    return false;
  });
}
