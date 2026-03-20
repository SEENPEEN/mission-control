export type Priority = "HIGH" | "MED" | "LOW";
export type Status = "BLOCKED" | "IN_PROGRESS" | "COMPLETED" | "QUEUED";

export interface Mission {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  dateAdded: string;
}

export const missions: Mission[] = [
  {
    id: "mc-001",
    name: "Mission Control Dashboard",
    description: "Build and deploy the status board to Vercel for mobile access",
    priority: "HIGH",
    status: "IN_PROGRESS",
    dateAdded: "2026-03-19",
  },
  {
    id: "mc-002",
    name: "OpenClaw Setup",
    description: "Complete bootstrap, identity config, and SOUL.md personalization",
    priority: "MED",
    status: "QUEUED",
    dateAdded: "2026-03-19",
  },
  {
    id: "mc-003",
    name: "Memory System",
    description: "Set up persistent memory files and daily note structure",
    priority: "MED",
    status: "QUEUED",
    dateAdded: "2026-03-19",
  },
  {
    id: "mc-004",
    name: "Agent Network",
    description: "Configure multi-agent coordination between main, kodex, and slim",
    priority: "LOW",
    status: "QUEUED",
    dateAdded: "2026-03-19",
  },
];
