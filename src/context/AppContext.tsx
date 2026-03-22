"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { AppState, AppAction } from "@/types";
import { loadState, saveState } from "@/lib/storage";
import { mockAgents, mockActivities } from "@/data/mockData";

const defaultCards: AppState["cards"] = [
  // Backlog
  { id: "default-1", title: "Set up Google Calendar sync", status: "todo", priority: "high", order: 0, createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), assignedTo: "Alfred" },
  { id: "default-2", title: "Notion integration", status: "todo", priority: "medium", order: 1, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), assignedTo: "Kodex" },
  { id: "default-3", title: "Ad Scraper: define scope", status: "todo", priority: "low", order: 2, createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), assignedTo: "Kimi K" },
  { id: "default-4", title: "Inter-agent messaging protocol", status: "todo", priority: "medium", order: 3, createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), assignedTo: "Alfred2" },
  // In Progress
  { id: "default-5", title: "Memory Architecture v1", status: "in-progress", priority: "urgent", order: 0, createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), assignedTo: "Alfred" },
  { id: "default-6", title: "Mission Control features", status: "in-progress", priority: "high", order: 1, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), assignedTo: "Alfred" },
  { id: "default-7", title: "Model routing per agent", status: "in-progress", priority: "medium", order: 2, createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), assignedTo: "SLIM" },
  // Complete
  { id: "default-8", title: "Agent Registry built", status: "complete", priority: "high", order: 0, createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), assignedTo: "Alfred" },
  { id: "default-9", title: "Chat Registry built", status: "complete", priority: "high", order: 1, createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), assignedTo: "Alfred" },
  { id: "default-10", title: "OpenClaw bootstrap", status: "complete", priority: "high", order: 2, createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), assignedTo: "Alfred" },
  { id: "default-11", title: "Cross-group memory policy", status: "complete", priority: "medium", order: 3, createdAt: new Date(Date.now() - 86400000 * 6).toISOString(), assignedTo: "Alfred2" },
  { id: "default-12", title: "Nightly consolidation cron", status: "complete", priority: "medium", order: 4, createdAt: new Date(Date.now() - 86400000 * 6).toISOString(), assignedTo: "SLIM" },
];

const initialState: AppState = {
  cards: defaultCards,
  todos: [],
  notes: "",
  agents: mockAgents,
  activities: mockActivities,
  activeTab: "tasks",
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOAD_STATE":
      return { ...action.payload, agents: mockAgents, activities: mockActivities, activeTab: state.activeTab };

    case "SET_TAB":
      return { ...state, activeTab: action.payload.tab };

    case "ADD_ACTIVITY": {
      const entry = { ...action.payload, id: crypto.randomUUID() };
      return { ...state, activities: [entry, ...state.activities] };
    }

    case "UPDATE_AGENT":
      return {
        ...state,
        agents: state.agents.map((a) =>
          a.id === action.payload.id ? { ...a, ...action.payload.updates } : a
        ),
      };

    case "ADD_CARD": {
      const cardsInColumn = state.cards.filter(
        (c) => c.status === action.payload.status
      );
      const newCard = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        status: action.payload.status,
        priority: action.payload.priority ?? ("none" as const),
        order: cardsInColumn.length,
        createdAt: new Date().toISOString(),
      };
      return { ...state, cards: [...state.cards, newCard] };
    }

    case "UPDATE_CARD":
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      };

    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((c) => c.id !== action.payload.id),
      };

    case "MOVE_CARD": {
      const { cardId, toStatus, toIndex } = action.payload;
      const card = state.cards.find((c) => c.id === cardId);
      if (!card) return state;
      const without = state.cards.filter((c) => c.id !== cardId);
      const targetCards = without
        .filter((c) => c.status === toStatus)
        .sort((a, b) => a.order - b.order);
      targetCards.splice(toIndex, 0, { ...card, status: toStatus });
      const reordered = targetCards.map((c, i) => ({ ...c, order: i }));
      const otherCards = without.filter((c) => c.status !== toStatus);
      return { ...state, cards: [...otherCards, ...reordered] };
    }

    case "REORDER_CARDS": {
      const { status, cardIds } = action.payload;
      const reordered = cardIds.map((id, index) => {
        const card = state.cards.find((c) => c.id === id)!;
        return { ...card, order: index };
      });
      const otherCards = state.cards.filter((c) => c.status !== status);
      return { ...state, cards: [...otherCards, ...reordered] };
    }

    case "ADD_TODO": {
      const newTodo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return { ...state, todos: [...state.todos, newTodo] };
    }

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id),
      };

    case "UPDATE_NOTES":
      return { ...state, notes: action.payload.notes };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const hydrated = useRef(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      dispatch({ type: "LOAD_STATE", payload: saved });
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) {
      const { agents, activities, activeTab, ...persistable } = state;
      saveState(persistable as any);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}