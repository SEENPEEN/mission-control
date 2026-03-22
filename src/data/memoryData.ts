export interface MemoryFile {
  id: string;
  name: string;
  category: string;
  size: string;
  content: string;
}

export const memoryFiles: MemoryFile[] = [
  // ── Core ──
  {
    id: "memory",
    name: "MEMORY.md",
    category: "Core",
    size: "2.1 KB",
    content: `# MEMORY.md — Index
> Last updated: 2026-03-21

## Day One Notes
- Workspace stood up on 2026-03-19
- Initial agent roster deployed: Alfred, Claudia, Rex, Sage
- Security audit passed — all endpoints hardened

## Projects

### Mission Control
- Dashboard UI: Next.js 15 + Tailwind + shadcn primitives
- Status: active development, tabbed layout live
- Hosting: Vercel (preview deploys on PR)

### Security Protocol
- Daily heartbeat check via HEARTBEAT.md
- Agent permissions scoped per role
- Audit log retained 90 days

## Architecture Notes
- AppContext provides global state (useReducer pattern)
- PanelShell wraps every card/section for visual consistency
- All views are client components, data is static/mock for now
- Sidebar nav drives tab switching via SET_TAB dispatch
`,
  },
  {
    id: "soul",
    name: "SOUL.md",
    category: "Core",
    size: "1.4 KB",
    content: `# SOUL.md — Personality Framework

## Core Traits
- Patient, precise, quietly confident
- Speaks in clear, direct language — no filler
- Treats every task as craft, not chore

## Communication Style
- Default to brevity; expand only when asked
- Use structured output (bullets, headers) over prose
- Never apologize for being thorough

## Decision Framework
1. Safety first — never break production
2. Clarity over cleverness
3. Ship incremental progress over perfect plans
4. Ask when uncertain; assume nothing
`,
  },
  {
    id: "user",
    name: "USER.md",
    category: "Core",
    size: "0.9 KB",
    content: `# USER.md — Operator Profile

## Steven
- Role: Lead architect & operator
- Preferences: dark mode, monospace, minimal UI
- Working hours: async, mostly evenings EST
- Communication: direct, low-ceremony
- Stack familiarity: Next.js, Tailwind, TypeScript, Python
- Goal: build a self-managing AI operations center
`,
  },
  {
    id: "identity",
    name: "IDENTITY.md",
    category: "Core",
    size: "0.7 KB",
    content: `# IDENTITY.md — Alfred

## Designation
- Name: Alfred
- Role: Chief of Staff / Executive Agent
- Callsign: ALFRED-1

## Responsibilities
- Orchestrate agent workflows
- Maintain operational continuity
- Surface blockers and status to the operator
- Enforce security protocols across the swarm
`,
  },

  // ── Registry ──
  {
    id: "agents-registry",
    name: "agents-registry.md",
    category: "Registry",
    size: "1.8 KB",
    content: `# Agent Registry

## Chain of Command
\`\`\`
Operator (Steven)
  └─ Alfred (Chief of Staff)
       ├─ Claudia (Content Strategist)
       ├─ Rex (Security & Compliance)
       ├─ Sage (Research & Analysis)
       └─ Echo (Dev Ops & Infra)
\`\`\`

## Roster Summary
| Agent   | Status  | Last Active      | Tasks |
|---------|---------|------------------|-------|
| Alfred  | online  | 2026-03-21 09:14 | 3     |
| Claudia | online  | 2026-03-21 08:45 | 2     |
| Rex     | standby | 2026-03-20 23:10 | 0     |
| Sage    | online  | 2026-03-21 09:02 | 1     |
| Echo    | offline | 2026-03-19 17:30 | 0     |
`,
  },
  {
    id: "chat-registry",
    name: "chat-registry.md",
    category: "Registry",
    size: "1.2 KB",
    content: `# Chat Registry

## Active Conversations
| ID     | Context          | Agents         | Started          |
|--------|------------------|----------------|------------------|
| CTX-01 | Dashboard build  | Alfred         | 2026-03-19 14:00 |
| CTX-02 | Content pipeline | Claudia, Sage  | 2026-03-20 10:30 |
| CTX-03 | Security review  | Rex            | 2026-03-20 22:00 |

## Context Boundaries
- Each chat scoped to a single initiative
- Cross-context references use [CTX-xx] notation
- Contexts archived after 48h inactivity
`,
  },
  {
    id: "tasks",
    name: "tasks.md",
    category: "Registry",
    size: "1.6 KB",
    content: `# Task Backlog

## Active
- [x] Stand up Mission Control dashboard
- [x] Deploy agent card grid
- [ ] Wire live agent heartbeat polling
- [ ] Build Memory tab (in progress)

## Daily — 2026-03-21
- [ ] Morning status sweep
- [ ] Review overnight agent logs
- [ ] Update content calendar

## Weekly
- [ ] Security audit pass
- [ ] Usage metrics report
- [ ] Agent performance review
- [ ] Backup memory files to vault
`,
  },

  // ── Daily Notes ──
  {
    id: "daily-0320",
    name: "2026-03-20.md",
    category: "Daily Notes",
    size: "0.8 KB",
    content: `# Daily Note — 2026-03-20

## Completed
- Shipped agent cards with real roster data
- Added Content pipeline tab
- Cleaned up stale eslint/tailwind configs

## Observations
- Calendar view needs timezone handling
- Usage chart renders slowly on mobile
- Rex flagged a stale API key in env — rotated

## Tomorrow
- Build Memory tab
- Start approvals workflow design
`,
  },
  {
    id: "daily-0321",
    name: "2026-03-21.md",
    category: "Daily Notes",
    size: "0.5 KB",
    content: `# Daily Note — 2026-03-21

## Plan
- Memory tab implementation
- Review Claudia's content drafts
- Sync with Rex on compliance checklist

## Notes
- Operator requested dark file-browser aesthetic for Memory
- Consider adding search/filter to memory viewer later
`,
  },

  // ── Config ──
  {
    id: "heartbeat",
    name: "HEARTBEAT.md",
    category: "Config",
    size: "0.1 KB",
    content: `# HEARTBEAT.md
<!-- This file is touched by the heartbeat cron to verify agent liveness -->
<!-- Last beat: 2026-03-21T09:14:00Z -->
`,
  },
  {
    id: "agents-config",
    name: "AGENTS.md",
    category: "Config",
    size: "0.6 KB",
    content: `# AGENTS.md — Workspace Rules

## Defaults
- Max concurrent tasks per agent: 3
- Idle timeout: 30 minutes
- Auto-archive after: 48 hours inactivity

## Permissions
- Only Alfred may dispatch to other agents
- Rex has read-only access to all contexts
- Claudia may publish to content pipeline without approval
- Echo requires operator sign-off for infra changes
`,
  },
];
