export type AgentStatus = "online" | "offline" | "pending";

export interface Agent {
  id: string;
  name: string;
  model: string;
  role: string;
  status: AgentStatus;
  chats: string[];
  costPerDay: number;
  tier: number; // chain of command: 0 = Steven (human), 1 = Alfred, 2 = Alfred2, 3 = others
}

export const agents: Agent[] = [
  {
    id: "alfred",
    name: "Alfred",
    model: "Opus",
    role: "Mission Control Lead",
    status: "online",
    chats: ["mission-control-dev", "security-ops", "memory-arch", "openclaw-bootstrap", "registry-ops"],
    costPerDay: 5.2,
    tier: 1,
  },
  {
    id: "alfred2",
    name: "Alfred2",
    model: "Sonnet",
    role: "Second-in-Command",
    status: "online",
    chats: ["fleet-ops", "security-ops"],
    costPerDay: 1.5,
    tier: 2,
  },
  {
    id: "alfredslim",
    name: "AlfredSLIM",
    model: "Opus",
    role: "Lightweight Helper",
    status: "online",
    chats: ["memory-arch", "fleet-ops"],
    costPerDay: 3.0,
    tier: 3,
  },
  {
    id: "kodex",
    name: "Kodex",
    model: "TBD",
    role: "Coding Agent",
    status: "pending",
    chats: ["ad-scraper"],
    costPerDay: 0,
    tier: 3,
  },
  {
    id: "kimik",
    name: "Kimi K",
    model: "Kimi",
    role: "Research / Long-Context",
    status: "online",
    chats: ["memory-arch"],
    costPerDay: 0.15,
    tier: 3,
  },
  {
    id: "cronjoblewis",
    name: "CronjobLewis",
    model: "Sonnet",
    role: "Cron / Automation",
    status: "pending",
    chats: ["calendar-sync"],
    costPerDay: 0,
    tier: 3,
  },
];
