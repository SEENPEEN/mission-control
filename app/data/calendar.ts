export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  recurrence: "daily" | "weekly" | "once";
  color: string;
  day?: number; // day of month for one-time events
  weekday?: number; // 0=Sun for weekly events
}

export const calendarEvents: CalendarEvent[] = [
  { id: "ev-1", title: "Morning Brief", time: "8:00 AM", recurrence: "daily", color: "emerald" },
  { id: "ev-2", title: "Nightly Consolidation", time: "2:00 AM", recurrence: "daily", color: "violet" },
  { id: "ev-3", title: "Weekly Agent Review", time: "10:00 AM", recurrence: "weekly", weekday: 1, color: "amber" },
];
