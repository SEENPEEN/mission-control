export interface CalendarEvent {
  id: string;
  name: string;
  time: string; // '8:00 AM'
  color: string; // hex color
  recurrence: "daily" | "weekly" | "always" | "once";
  day?: number; // 0=Sun for weekly
  date?: string; // YYYY-MM-DD for once
  interval?: string; // for always-running display like 'Every 30 min'
}

export const allEvents: CalendarEvent[] = [
  {
    id: "morning-brief",
    name: "Morning Brief",
    time: "8:00 AM",
    color: "#E8F630",
    recurrence: "daily",
  },
  {
    id: "nightly-consolidation",
    name: "Nightly Consolidation",
    time: "2:00 AM",
    color: "#00F0FF",
    recurrence: "daily",
  },
  {
    id: "agent-review",
    name: "Agent Review",
    time: "10:00 AM",
    color: "#39FF14",
    recurrence: "weekly",
    day: 1, // Monday
  },
  {
    id: "heartbeat-check",
    name: "Heartbeat Check",
    time: "Every 1h",
    color: "#BF5FFF",
    recurrence: "always",
    interval: "Every 1 hour",
  },
  {
    id: "mission-control-check",
    name: "Mission Control Check",
    time: "Every 30 min",
    color: "#39FF14",
    recurrence: "always",
    interval: "Every 30 min",
  },
];

export const alwaysRunningEvents = allEvents.filter(
  (e) => e.recurrence === "always"
);

export const scheduledEvents = allEvents.filter(
  (e) => e.recurrence !== "always"
);

export function getEventsForDate(date: Date): CalendarEvent[] {
  const dow = date.getDay();
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return scheduledEvents.filter((event) => {
    if (event.recurrence === "daily") return true;
    if (event.recurrence === "weekly" && event.day === dow) return true;
    if (event.recurrence === "once" && event.date === dateStr) return true;
    return false;
  });
}
