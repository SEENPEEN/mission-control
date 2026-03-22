"use client";

import { useState } from "react";
import { FileText, FolderOpen } from "lucide-react";
import PanelShell from "@/components/layout/PanelShell";
import { memoryFiles } from "@/data/memoryData";

const categories = ["Core", "Registry", "Daily Notes", "Config"];

export default function MemoryView() {
  const [activeFileId, setActiveFileId] = useState("memory");
  const activeFile = memoryFiles.find((f) => f.id === activeFileId) ?? memoryFiles[0];

  return (
    <div className="flex h-full gap-4 min-h-0">
      {/* ── Left Panel: File Tree ── */}
      <div className="hidden md:flex w-64 shrink-0 flex-col bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-subtle">
          <FolderOpen size={14} className="text-[#E8F630]" />
          <span className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-text-secondary">
            Memory Files
          </span>
          <span className="text-[10px] font-display text-text-ghost ml-auto tabular-nums">
            {memoryFiles.length}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {categories.map((category) => {
            const files = memoryFiles.filter((f) => f.category === category);
            return (
              <div key={category} className="mb-3">
                <div className="px-3 pb-1">
                  <span className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-text-ghost">
                    {category}
                  </span>
                </div>
                {files.map((file) => {
                  const isActive = file.id === activeFileId;
                  return (
                    <button
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-all duration-150 ${
                        isActive
                          ? "bg-[#E8F630]/[0.07] border-l-2 border-[#E8F630] text-text-primary"
                          : "border-l-2 border-transparent text-text-secondary hover:bg-white/[0.03] hover:text-text-primary"
                      }`}
                    >
                      <FileText
                        size={13}
                        className={isActive ? "text-[#E8F630] shrink-0" : "text-text-ghost shrink-0"}
                      />
                      <span className="font-display text-[11px] tracking-wide truncate">
                        {file.name}
                      </span>
                      <span className="text-[9px] text-text-ghost ml-auto shrink-0 tabular-nums">
                        {file.size}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── Mobile file selector ── */}
      <div className="md:hidden w-full flex flex-col gap-3 min-h-0">
        <select
          value={activeFileId}
          onChange={(e) => setActiveFileId(e.target.value)}
          className="bg-bg-surface border border-border-subtle rounded-lg px-3 py-2 text-text-primary font-display text-xs tracking-wide shrink-0"
        >
          {categories.map((category) => (
            <optgroup key={category} label={category}>
              {memoryFiles
                .filter((f) => f.category === category)
                .map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.name} ({file.size})
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <div className="flex-1 min-h-0">
          <PanelShell label={activeFile.name} accentColor="#E8F630" className="h-full">
            <pre className="text-[12px] leading-relaxed text-text-secondary font-mono whitespace-pre-wrap break-words">
              {activeFile.content}
            </pre>
          </PanelShell>
        </div>
      </div>

      {/* ── Right Panel: File Content ── */}
      <div className="hidden md:flex flex-1 min-w-0 min-h-0">
        <PanelShell label={activeFile.name} accentColor="#E8F630" className="flex-1">
          <pre className="text-[12px] leading-relaxed text-text-secondary font-mono whitespace-pre-wrap break-words">
            {activeFile.content}
          </pre>
        </PanelShell>
      </div>
    </div>
  );
}
