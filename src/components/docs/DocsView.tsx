"use client";

import { useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import PanelShell from "@/components/layout/PanelShell";
import { docs, DocCategory } from "@/data/docsData";

const categoryLabels: Record<DocCategory, string> = {
  "getting-started": "Getting Started",
  architecture: "Architecture",
  agents: "Agents",
  workflows: "Workflows",
};

const categoryOrder: DocCategory[] = [
  "getting-started",
  "architecture",
  "agents",
  "workflows",
];

function renderContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="font-display text-xs font-bold tracking-[0.08em] uppercase text-text-primary mt-4 mb-1.5"
        >
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-display text-sm font-bold tracking-[0.1em] uppercase text-text-primary mt-5 mb-2"
        >
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h1
          key={i}
          className="font-display text-base font-bold tracking-[0.1em] uppercase text-text-primary mb-3"
        >
          {line.slice(2)}
        </h1>
      );
    }
    if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        return (
          <p key={i} className="text-sm text-text-secondary ml-3 mb-1">
            <span className="text-text-primary font-medium">{match[1]}</span>
            {match[2]}
          </p>
        );
      }
    }
    if (line.startsWith("- ")) {
      return (
        <p key={i} className="text-sm text-text-secondary ml-3 mb-1">
          <span className="text-text-ghost mr-1.5">•</span>
          {line.slice(2)}
        </p>
      );
    }
    if (line.match(/^\d+\.\s/)) {
      const match = line.match(/^(\d+)\.\s\*\*(.+?)\*\*\s*[—–-]\s*(.*)$/);
      if (match) {
        return (
          <p key={i} className="text-sm text-text-secondary ml-3 mb-1">
            <span className="text-text-ghost mr-1.5">{match[1]}.</span>
            <span className="text-text-primary font-medium">{match[2]}</span>
            {" — " + match[3]}
          </p>
        );
      }
      return (
        <p key={i} className="text-sm text-text-secondary ml-3 mb-1">
          {line}
        </p>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return (
      <p key={i} className="text-sm text-text-secondary mb-1 leading-relaxed">
        {line}
      </p>
    );
  });
}

export default function DocsView() {
  const [selectedId, setSelectedId] = useState(docs[0].id);
  const selectedDoc = docs.find((d) => d.id === selectedId) ?? docs[0];

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full min-h-0">
      {/* Mobile: dropdown doc selector */}
      <div className="md:hidden shrink-0">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full bg-bg-surface border border-border-subtle rounded-lg px-3 py-2.5 text-text-primary font-display text-xs tracking-wide min-h-[44px]"
        >
          {categoryOrder.map((cat) => {
            const catDocs = docs.filter((d) => d.category === cat);
            if (catDocs.length === 0) return null;
            return (
              <optgroup key={cat} label={categoryLabels[cat]}>
                {catDocs.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.title}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </div>

      {/* Desktop: Left panel — nav */}
      <div className="hidden md:block shrink-0 w-56">
        <PanelShell label="Documentation" count={docs.length} noPadding>
          <div className="py-1">
            {categoryOrder.map((cat) => {
              const catDocs = docs.filter((d) => d.category === cat);
              if (catDocs.length === 0) return null;
              return (
                <div key={cat}>
                  <p className="font-display text-[10px] font-bold tracking-[0.1em] uppercase text-text-ghost px-3 pt-3 pb-1">
                    {categoryLabels[cat]}
                  </p>
                  {catDocs.map((doc) => {
                    const isActive = doc.id === selectedId;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedId(doc.id)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors text-xs ${
                          isActive
                            ? "bg-white/5 text-text-primary"
                            : "text-text-secondary hover:bg-white/[0.03] hover:text-text-primary"
                        }`}
                      >
                        <BookOpen
                          size={12}
                          className={
                            isActive ? "text-[#E8F630]" : "text-text-ghost"
                          }
                        />
                        <span className="truncate flex-1">{doc.title}</span>
                        {isActive && (
                          <ChevronRight size={12} className="text-text-ghost" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </PanelShell>
      </div>

      {/* Right panel — content */}
      <div className="flex-1 min-h-0">
        <PanelShell
          label={selectedDoc.title}
          className="h-full"
        >
          <div className="pr-2">{renderContent(selectedDoc.content)}</div>
        </PanelShell>
      </div>
    </div>
  );
}
