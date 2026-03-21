export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee?: string;
  priority?: "high" | "med" | "low";
}

export const tasks: Task[] = [
  // TO DO
  { id: "t-01", title: "Set up Google Calendar sync (gcalcli)", status: "todo", assignee: "CronjobLewis", priority: "med" },
  { id: "t-02", title: "Set up Notion integration", status: "todo", priority: "med" },
  { id: "t-03", title: "Create Kodex coding bot", status: "todo", assignee: "Alfred", priority: "high" },
  { id: "t-04", title: "Create CronjobLewis bot", status: "todo", assignee: "Alfred", priority: "high" },
  { id: "t-05", title: "Connect Mac Mini via Tailscale", status: "todo", assignee: "Alfred2", priority: "med" },
  { id: "t-06", title: "Ad Scraper: define scope", status: "todo", assignee: "Kodex", priority: "med" },
  { id: "t-07", title: "Inter-agent messaging protocol", status: "todo", assignee: "Alfred", priority: "high" },

  // IN PROGRESS
  { id: "t-08", title: "Memory Architecture v1", status: "in_progress", assignee: "Alfred", priority: "high" },
  { id: "t-09", title: "Mission Control features", status: "in_progress", assignee: "Alfred", priority: "high" },
  { id: "t-10", title: "Model routing per agent", status: "in_progress", assignee: "Alfred2", priority: "med" },
  { id: "t-11", title: "Morning brief system", status: "in_progress", assignee: "CronjobLewis", priority: "med" },

  // DONE
  { id: "t-12", title: "Agent Registry built", status: "done", assignee: "Alfred" },
  { id: "t-13", title: "Chat Registry built", status: "done", assignee: "Alfred" },
  { id: "t-14", title: "OpenClaw bootstrap", status: "done", assignee: "Alfred" },
  { id: "t-15", title: "Cross-group memory policy", status: "done", assignee: "Alfred" },
  { id: "t-16", title: "Onboarding template", status: "done", assignee: "Alfred" },
  { id: "t-17", title: "Nightly consolidation cron", status: "done", assignee: "CronjobLewis" },
];
