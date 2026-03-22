export type ContentType = "blog" | "tweet" | "video" | "post";
export type ContentStatus = "idea" | "draft" | "review" | "scheduled" | "published";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  assignedTo: string;
  dueDate?: string;
  createdAt: string;
}

export const contentItems: ContentItem[] = [
  {
    id: "c-1",
    title: "Why We Built an AI Agent Army",
    type: "blog",
    status: "published",
    assignedTo: "Alfred",
    createdAt: "2026-03-10",
  },
  {
    id: "c-2",
    title: "Mission Control Launch Thread",
    type: "tweet",
    status: "scheduled",
    assignedTo: "AlfredSLIM",
    dueDate: "2026-03-25",
    createdAt: "2026-03-18",
  },
  {
    id: "c-3",
    title: "Agent Workflow Demo Walkthrough",
    type: "video",
    status: "review",
    assignedTo: "Kimi",
    dueDate: "2026-03-28",
    createdAt: "2026-03-15",
  },
  {
    id: "c-4",
    title: "How Kimi Scrapes Competitor Stores",
    type: "blog",
    status: "draft",
    assignedTo: "Kimi",
    dueDate: "2026-04-01",
    createdAt: "2026-03-17",
  },
  {
    id: "c-5",
    title: "Daily Standup Automation Post",
    type: "post",
    status: "published",
    assignedTo: "Alfred",
    createdAt: "2026-03-12",
  },
  {
    id: "c-6",
    title: "Local LLM Setup Guide",
    type: "video",
    status: "idea",
    assignedTo: "LM Studio",
    createdAt: "2026-03-19",
  },
  {
    id: "c-7",
    title: "Tailscale Mesh Networking Tips",
    type: "tweet",
    status: "draft",
    assignedTo: "AlfredSLIM",
    dueDate: "2026-03-30",
    createdAt: "2026-03-20",
  },
  {
    id: "c-8",
    title: "Multi-Agent Orchestration Patterns",
    type: "blog",
    status: "idea",
    assignedTo: "Kodex",
    createdAt: "2026-03-21",
  },
  {
    id: "c-9",
    title: "OpenClaw Brand Story Reel",
    type: "video",
    status: "scheduled",
    assignedTo: "Alfred",
    dueDate: "2026-03-26",
    createdAt: "2026-03-14",
  },
  {
    id: "c-10",
    title: "Agent Heartbeat System Explainer",
    type: "post",
    status: "review",
    assignedTo: "Kodex",
    dueDate: "2026-03-27",
    createdAt: "2026-03-16",
  },
];
