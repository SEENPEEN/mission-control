import { Agent, ActivityEntry } from "@/types";

export const mockAgents: Agent[] = [
  { id: "steven", name: "Steven", emoji: "👑", role: "Commander", model: "Human", accentColor: "#e0e0e0", status: "working", currentTask: "Orchestrating Mission Control build", lastActive: new Date().toISOString() },
  { id: "alfred", name: "Alfred", emoji: "🎩", role: "Mission Control Lead", model: "Claude Opus 4", accentColor: "#f59e0b", status: "working", currentTask: "Coordinating team, building dashboard tabs", lastActive: new Date().toISOString() },
  { id: "alfred2", name: "Alfred2", emoji: "🧠", role: "Co-Lead · Advisor & Diagnostics", model: "Claude Sonnet", accentColor: "#3b82f6", status: "working", currentTask: "QA review of live dashboard", lastActive: new Date(Date.now() - 300000).toISOString() },
  { id: "slim", name: "SLIM", emoji: "⚡", role: "Support · Triage & Structured Processing", model: "GPT-4.1 Mini", accentColor: "#06b6d4", status: "working", currentTask: "Data cleanup + daily notes", lastActive: new Date(Date.now() - 600000).toISOString() },
  { id: "kodex", name: "Kodex", emoji: "💻", role: "Coding Agent · Builds & Ships", model: "GPT Codex", accentColor: "#22c55e", status: "working", currentTask: "Memory tab build", lastActive: new Date(Date.now() - 300000).toISOString() },
  { id: "kimi", name: "Kimi K", emoji: "🔍", role: "Research · Long-Context Specialist", model: "Kimi K2.5", accentColor: "#ec4899", status: "working", currentTask: "Dynamic data architecture research", lastActive: new Date(Date.now() - 300000).toISOString() },
];

function timeAgo(ms: number): string {
  return new Date(Date.now() - ms).toISOString();
}

export const mockActivities: ActivityEntry[] = [
  { id: "act-1", timestamp: timeAgo(30000), agentName: "Alfred", agentColor: "#f59e0b", action: "deployed", taskName: "Content + Docs Tabs", status: "success", message: "Pushed Content pipeline and Docs hub tabs to production" },
  { id: "act-2", timestamp: timeAgo(60000), agentName: "Alfred", agentColor: "#f59e0b", action: "assigned", taskName: "Team Tasks", status: "info", message: "Assigned QA to Alfred2, data cleanup to SLIM, Memory tab to Kodex, research to Kimi" },
  { id: "act-3", timestamp: timeAgo(120000), agentName: "Steven", agentColor: "#e0e0e0", action: "directive", status: "info", message: "Added Kodex and Kimi K to Mission Control team. Removed CronjobLewis." },
  { id: "act-4", timestamp: timeAgo(300000), agentName: "Alfred", agentColor: "#f59e0b", action: "deployed", taskName: "Full Dashboard Rebuild", status: "success", message: "Restored original Mac Mini codebase + Calendar, Usage, Agents tabs + mobile responsive" },
  { id: "act-5", timestamp: timeAgo(600000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Mac Mini SSH", status: "success", message: "Connected to Mac Mini via SSH, pulled original Mission Control source code" },
  { id: "act-6", timestamp: timeAgo(900000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Cross-Group Memory", status: "success", message: "Enabled shared memory between Security Protocol and Mission Control chats" },
  { id: "act-7", timestamp: timeAgo(1200000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Nightly Consolidation Cron", status: "success", message: "Set up 2:00 AM MDT cron job for memory consolidation" },
  { id: "act-8", timestamp: timeAgo(1500000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Onboarding Template", status: "success", message: "Created copy-paste template for new group chat onboarding" },
  { id: "act-9", timestamp: timeAgo(1800000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Chat Registry Update", status: "success", message: "Updated Mission Control chat ID, expanded scope, full cross-memory with Security Protocol" },
  { id: "act-10", timestamp: timeAgo(2400000), agentName: "Steven", agentColor: "#e0e0e0", action: "decision", status: "info", message: "Security Protocol = rulebook, Mission Control = war room. Two core ops chats." },
  { id: "act-11", timestamp: timeAgo(3600000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Agent & Chat Registries", status: "success", message: "Built agent roster, chain of command, chat boundary system in Security Protocol" },
  { id: "act-12", timestamp: timeAgo(5400000), agentName: "Steven", agentColor: "#e0e0e0", action: "directive", status: "info", message: "Set priorities: memory architecture, Mission Control features, agent fleet setup" },
  { id: "act-13", timestamp: timeAgo(7200000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "OpenClaw Bootstrap", status: "success", message: "Identity, SOUL.md, USER.md, workspace structure all configured" },
  { id: "act-14", timestamp: timeAgo(9000000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "PARA Structure", status: "success", message: "Set up PARA folder structure for project organization" },
  { id: "act-15", timestamp: timeAgo(10800000), agentName: "Steven", agentColor: "#e0e0e0", action: "directive", status: "info", message: "Kicked off multi-agent ecosystem build — Alfred as ops lead" },
];