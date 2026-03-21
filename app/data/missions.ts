export type Priority = "HIGH" | "MED" | "LOW";
export type Status = "BLOCKED" | "IN_PROGRESS" | "COMPLETED" | "QUEUED";

export interface Mission {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  dateAdded: string;
  leadAgent?: string;
  chat?: string;
}

export const missions: Mission[] = [
  {
    id: "mc-001",
    name: "Mission Control Dashboard",
    description: "Build and deploy the status board to Vercel for mobile access",
    priority: "HIGH",
    status: "IN_PROGRESS",
    dateAdded: "2026-03-19",
    leadAgent: "Alfred",
    chat: "mission-control-dev",
  },
  {
    id: "mc-002",
    name: "Security Protocol & Guard-Rails",
    description: "Agent roles, chain of command, permissions, and guardrails",
    priority: "HIGH",
    status: "IN_PROGRESS",
    dateAdded: "2026-03-19",
    leadAgent: "Alfred",
    chat: "security-ops",
  },
  {
    id: "mc-003",
    name: "Memory Architecture",
    description: "Cross-group memory, nightly consolidation, shared workspace files",
    priority: "HIGH",
    status: "IN_PROGRESS",
    dateAdded: "2026-03-19",
    leadAgent: "Alfred",
    chat: "memory-arch",
  },
  {
    id: "mc-004",
    name: "Ad Scraper (Meta/Google)",
    description: "Ad scraping and analysis tooling for competitive intelligence",
    priority: "MED",
    status: "QUEUED",
    dateAdded: "2026-03-20",
    leadAgent: "Kodex",
    chat: "ad-scraper",
  },
  {
    id: "mc-005",
    name: "Calendar Sync",
    description: "Google Calendar + Apple Calendar integration",
    priority: "MED",
    status: "QUEUED",
    dateAdded: "2026-03-20",
    leadAgent: "CronjobLewis",
    chat: "calendar-sync",
  },
  {
    id: "mc-006",
    name: "Agent Fleet Setup",
    description: "Model routing, CronjobLewis, Mac Mini connection",
    priority: "MED",
    status: "IN_PROGRESS",
    dateAdded: "2026-03-19",
    leadAgent: "Alfred2",
    chat: "fleet-ops",
  },
  {
    id: "mc-007",
    name: "OpenClaw Bootstrap",
    description: "Identity, SOUL.md, workspace setup",
    priority: "HIGH",
    status: "COMPLETED",
    dateAdded: "2026-03-18",
    leadAgent: "Alfred",
    chat: "openclaw-bootstrap",
  },
  {
    id: "mc-008",
    name: "Agent & Chat Registries",
    description: "Built agent roster and chat boundary system",
    priority: "HIGH",
    status: "COMPLETED",
    dateAdded: "2026-03-18",
    leadAgent: "Alfred",
    chat: "registry-ops",
  },
];
