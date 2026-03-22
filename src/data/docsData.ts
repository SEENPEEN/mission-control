export type DocCategory = "getting-started" | "architecture" | "agents" | "workflows";

export interface DocItem {
  id: string;
  title: string;
  category: DocCategory;
  content: string;
}

export const docs: DocItem[] = [
  {
    id: "doc-1",
    title: "Welcome to Mission Control",
    category: "getting-started",
    content:
      "# Welcome to Mission Control\n\nMission Control is the central command hub for your AI agent fleet. It provides real-time visibility into agent status, task progress, and system health.\n\n## Key Features\n\n- Real-time agent monitoring and status tracking\n- Kanban-style task management across projects\n- Calendar-based scheduling with recurring events\n- Usage analytics and cost tracking per agent\n- Content pipeline management\n\n## Getting Started\n\nNavigate the sidebar to explore each section. The Tasks view is your default home — it shows the agent grid and live activity feed.",
  },
  {
    id: "doc-2",
    title: "Memory Architecture",
    category: "architecture",
    content:
      "# Memory Architecture\n\nThe memory system is the backbone of agent continuity. Each agent maintains its own memory store, scoped by project and conversation.\n\n## Memory Layers\n\n### Short-Term Memory\nConversation-scoped context that persists within a single session. Automatically compressed as the context window fills.\n\n### Long-Term Memory\nFile-based memory stored in .claude/projects/ directories. Organized by type: user, feedback, project, and reference memories.\n\n### Shared Memory\nCross-agent memory accessible via the shared memory bus. Used for coordination, handoffs, and shared state.\n\n## Memory Lifecycle\n\nMemories are created during conversations, indexed in MEMORY.md files, and pruned when they become stale or contradicted by newer entries.",
  },
  {
    id: "doc-3",
    title: "Chat Registry",
    category: "architecture",
    content:
      "# Chat Registry\n\nThe Chat Registry tracks all active and historical conversations across agents.\n\n## Structure\n\nEach registry entry contains:\n- Chat ID and timestamp\n- Originating agent and model\n- Task context and linked project\n- Status: active, paused, or archived\n\n## How It Works\n\nWhen an agent starts a new conversation, it registers the session in the chat registry. This allows Mission Control to display real-time activity and enables cross-agent awareness of ongoing work.\n\n## Querying the Registry\n\nThe activity feed pulls from the chat registry to show the latest actions. Agents can also query the registry to check if another agent is already working on a related task.",
  },
  {
    id: "doc-4",
    title: "Agent Roster",
    category: "agents",
    content:
      "# Agent Roster\n\nThe agent roster defines every AI agent in the fleet, their roles, capabilities, and current assignments.\n\n## Active Agents\n\n- **Steven** — Commander. Human operator and final decision maker.\n- **Alfred** — Strategic Operating Officer. Runs on Claude Opus 4. Handles high-level planning and orchestration.\n- **AlfredSLIM** — Data & Research Officer. Runs on Kimi K2.5. Handles briefs, research, and lightweight tasks.\n- **Kodex** — Code Operations Officer. Runs on GPT-5.1 Codex. Handles code generation and scripting.\n- **Kimi** — Research Analyst. Runs on Kimi K2.5. Handles web scraping and competitive analysis.\n- **Claude Code** — Builder. Runs on Claude Code 2.1. Handles codebase-level implementation.\n- **Warp** — Terminal Ops. Handles shell commands and infrastructure.\n- **LM Studio** — Local Inference. Runs local models via Qwen 3.",
  },
  {
    id: "doc-5",
    title: "Chain of Command",
    category: "agents",
    content:
      "# Chain of Command\n\nThe chain of command defines how tasks flow from human intent to agent execution.\n\n## Hierarchy\n\n1. **Steven (Commander)** — Sets objectives and approves major decisions.\n2. **Alfred (SOO)** — Translates objectives into actionable plans. Delegates to specialists.\n3. **Specialist Agents** — Execute tasks within their domain. Report back to Alfred.\n\n## Escalation Path\n\nIf an agent encounters a blocker or needs approval, it escalates through the chain:\n- Specialist → Alfred → Steven\n- Critical issues skip directly to Steven via priority alerts.\n\n## Delegation Rules\n\nAlfred assigns tasks based on agent capability, current load, and model strengths. Agents should not self-assign cross-domain work without delegation.",
  },
  {
    id: "doc-6",
    title: "New Chat Onboarding",
    category: "workflows",
    content:
      "# New Chat Onboarding\n\nEvery new agent conversation follows an onboarding flow to establish context and continuity.\n\n## Onboarding Steps\n\n1. **Load CLAUDE.md** — The agent reads project-level instructions from CLAUDE.md files in the working directory.\n2. **Load Memory** — Relevant memories are loaded from the MEMORY.md index based on the current project context.\n3. **Check Registry** — The agent checks the chat registry for recent related conversations to avoid duplicate work.\n4. **Establish Role** — The agent confirms its role, current objectives, and any constraints.\n\n## Best Practices\n\n- Always start with a clear task description.\n- Reference prior conversations by linking to memory entries.\n- Keep onboarding lightweight — the agent should be productive within the first response.",
  },
  {
    id: "doc-7",
    title: "Task Assignment",
    category: "workflows",
    content:
      "# Task Assignment\n\nTasks flow from creation to completion through a structured pipeline.\n\n## Task Lifecycle\n\n1. **Created** — A new task is added to the backlog, either by Steven or by Alfred based on a higher-level objective.\n2. **Assigned** — Alfred delegates the task to the best-fit agent based on role, model capabilities, and current workload.\n3. **In Progress** — The assigned agent begins work. Status updates flow to the activity feed.\n4. **Review** — Completed work is reviewed. For code, this means PR review. For content, editorial review.\n5. **Done** — Task is marked complete and archived.\n\n## Assignment Criteria\n\n- **Model fit**: Code tasks → Kodex or Claude Code. Research → Kimi or AlfredSLIM.\n- **Availability**: Prefer idle agents over busy ones.\n- **Context**: Agents with relevant memory/history for the task are preferred.",
  },
];
