export type KanbanStatus = "todo" | "in-progress" | "review" | "complete";
export type Priority = "urgent" | "high" | "medium" | "low" | "none";
export type AgentStatus = "idle" | "working" | "error" | "offline";
export type ActivitySeverity = "info" | "success" | "warning" | "error";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  model: string;
  accentColor: string;
  status: AgentStatus;
  currentTask?: string;
  lastActive: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  agentName: string;
  agentColor: string;
  action: string;
  taskName?: string;
  status: ActivitySeverity;
  message: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  status: KanbanStatus;
  priority: Priority;
  order: number;
  createdAt: string;
  assignedTo?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface AppState {
  cards: KanbanCard[];
  todos: TodoItem[];
  notes: string;
  agents: Agent[];
  activities: ActivityEntry[];
  activeTab: string;
}

export type AppAction =
  | { type: "ADD_CARD"; payload: { title: string; status: KanbanStatus; priority?: Priority } }
  | { type: "UPDATE_CARD"; payload: { id: string; updates: Partial<KanbanCard> } }
  | { type: "DELETE_CARD"; payload: { id: string } }
  | { type: "MOVE_CARD"; payload: { cardId: string; toStatus: KanbanStatus; toIndex: number } }
  | { type: "REORDER_CARDS"; payload: { status: KanbanStatus; cardIds: string[] } }
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "UPDATE_NOTES"; payload: { notes: string } }
  | { type: "SET_TAB"; payload: { tab: string } }
  | { type: "ADD_ACTIVITY"; payload: Omit<ActivityEntry, "id"> }
  | { type: "UPDATE_AGENT"; payload: { id: string; updates: Partial<Agent> } }
  | { type: "LOAD_STATE"; payload: AppState };