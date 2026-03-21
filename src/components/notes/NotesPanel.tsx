"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import PanelShell from "@/components/layout/PanelShell";

export default function NotesPanel() {
  const { state, dispatch } = useApp();
  const [localNotes, setLocalNotes] = useState(state.notes);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync from state on load/hydration
  useEffect(() => {
    setLocalNotes(state.notes);
  }, [state.notes]);

  const handleChange = (value: string) => {
    setLocalNotes(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "UPDATE_NOTES", payload: { notes: value } });
    }, 300);
  };

  return (
    <PanelShell
      label="Notes"
      accentColor="var(--text-secondary)"
      className="flex-[2]"
      noPadding
    >
      <textarea
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write something..."
        className="w-full h-full bg-transparent p-3 text-sm font-editor text-text-primary placeholder:text-text-ghost resize-none focus:outline-none leading-relaxed"
      />
    </PanelShell>
  );
}
