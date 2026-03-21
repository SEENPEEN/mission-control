import { Agent, ActivityEntry } from "@/types";

export const mockAgents: Agent[] = [
  { id: "steven", name: "Steven", emoji: "\ud83d\udc51", role: "Commander", model: "Human", accentColor: "#e0e0e0", status: "working", currentTask: "Orchestrating Mission Control build", lastActive: new Date().toISOString() },
  { id: "alfred", name: "Alfred", emoji: "\ud83c\udfa9", role: "Strategic Operating Officer", model: "Claude Opus 4", accentColor: "#f59e0b", status: "working", currentTask: "Building Mission Control UI", lastActive: new Date().toISOString() },
  { id: "slim", name: "AlfredSLIM", emoji: "\u26a1", role: "Data & Research Officer", model: "Kimi K2.5", accentColor: "#06b6d4", status: "idle", currentTask: undefined, lastActive: new Date(Date.now() - 1800000).toISOString() },
  { id: "kodex", name: "Alfred2", emoji: "\ud83e\udde0", role: "Code Operations Officer · aka Kodex", model: "GPT-5.1 Codex", accentColor: "#3b82f6", status: "idle", currentTask: undefined, lastActive: new Date(Date.now() - 3600000).toISOString() },
  { id: "kimi", name: "Kimi", emoji: "\ud83d\udd0d", role: "Research Analyst", model: "Kimi K2.5", accentColor: "#ec4899", status: "working", currentTask: "Scraping competitor Shopify stores", lastActive: new Date(Date.now() - 300000).toISOString() },
  { id: "claude", name: "Claude Code", emoji: "\ud83d\udd28", role: "Builder", model: "Claude Code 2.1", accentColor: "#22c55e", status: "offline", currentTask: undefined, lastActive: new Date(Date.now() - 7200000).toISOString() },
  { id: "warp", name: "Warp", emoji: "\ud83d\ude80", role: "Terminal Ops", model: "Warp AI", accentColor: "#ef4444", status: "idle", currentTask: undefined, lastActive: new Date(Date.now() - 900000).toISOString() },
  { id: "lmstudio", name: "LM Studio", emoji: "\ud83c\udfe0", role: "Local Inference", model: "Qwen 3", accentColor: "#a855f7", status: "offline", currentTask: undefined, lastActive: new Date(Date.now() - 14400000).toISOString() },
];

function timeAgo(ms: number): string {
  return new Date(Date.now() - ms).toISOString();
}

export const mockActivities: ActivityEntry[] = [
  { id: "act-1", timestamp: timeAgo(30000), agentName: "Alfred", agentColor: "#f59e0b", action: "started", taskName: "Mission Control UI Build", status: "info", message: "Analyzing existing codebase and planning component architecture" },
  { id: "act-2", timestamp: timeAgo(60000), agentName: "Steven", agentColor: "#e0e0e0", action: "assigned", taskName: "Mission Control UI Build", status: "info", message: "Assigned Mission Control overhaul to Alfred" },
  { id: "act-3", timestamp: timeAgo(120000), agentName: "AlfredSLIM", agentColor: "#06b6d4", action: "completed", taskName: "Morning Brief", status: "success", message: "Delivered morning brief: AI news, Conifer weather, daily quote" },
  { id: "act-4", timestamp: timeAgo(180000), agentName: "AlfredSLIM", agentColor: "#06b6d4", action: "heartbeat", status: "info", message: "Checked in \u2014 no pending tasks. Standing by." },
  { id: "act-5", timestamp: timeAgo(300000), agentName: "Kimi", agentColor: "#ec4899", action: "started", taskName: "Competitor Store Scrape", status: "info", message: "Scraping top 10 Shopify stores in hair care niche" },
  { id: "act-6", timestamp: timeAgo(600000), agentName: "Kodex", agentColor: "#3b82f6", action: "completed", taskName: "Hero Product Finder Script", status: "success", message: "Node.js script scaffolded with Brave API integration" },
  { id: "act-7", timestamp: timeAgo(900000), agentName: "Warp", agentColor: "#ef4444", action: "executed", taskName: "SSH Key Setup", status: "success", message: "Passwordless SSH configured between Windows and Mac Mini" },
  { id: "act-8", timestamp: timeAgo(1200000), agentName: "Alfred", agentColor: "#f59e0b", action: "completed", taskName: "Tailscale Network Setup", status: "success", message: "All 3 devices connected: SEEN-TOWER, Mac Mini, iPhone" },
  { id: "act-9", timestamp: timeAgo(1500000), agentName: "AlfredSLIM", agentColor: "#06b6d4", action: "heartbeat", status: "info", message: "Checked in \u2014 morning brief cron job confirmed active." },
  { id: "act-10", timestamp: timeAgo(1800000), agentName: "LM Studio", agentColor: "#a855f7", action: "status", status: "warning", message: "Offline \u2014 awaiting activation for local inference tasks" },
  { id: "act-11", timestamp: timeAgo(2400000), agentName: "Claude Code", agentColor: "#22c55e", action: "completed", taskName: "GWS CLI Install", status: "success", message: "Google Workspace CLI v0.16.0 authenticated on Mac Mini" },
  { id: "act-12", timestamp: timeAgo(3000000), agentName: "Kodex", agentColor: "#3b82f6", action: "started", taskName: "Analytics Summary Script", status: "info", message: "Scaffolding automated analytics pipeline with Google Sheets output" },
  { id: "act-13", timestamp: timeAgo(3600000), agentName: "Alfred", agentColor: "#f59e0b", action: "decision", taskName: "System Architecture", status: "info", message: "Routing strategy: Kimi=cheap search, Kodex=code, Alfred=orchestration" },
  { id: "act-14", timestamp: timeAgo(5400000), agentName: "Kimi", agentColor: "#ec4899", action: "completed", taskName: "Google Trends Fetch", status: "success", message: "Trending products compiled: hair tools, smart home, outdoor gear" },
  { id: "act-15", timestamp: timeAgo(7200000), agentName: "Steven", agentColor: "#e0e0e0", action: "directive", status: "info", message: "Set priorities: E-commerce automation first, SaaS exploration second" },
];