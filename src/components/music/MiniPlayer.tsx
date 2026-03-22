"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useMusic } from "@/context/MusicContext";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    pause,
    resume,
    next,
    prev,
    setVolume,
    seekTo,
  } = useMusic();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-10 bg-bg-surface border-b border-border-subtle flex items-center gap-3 px-3 shrink-0">
      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={prev}
          className="p-1 text-text-secondary hover:text-text-primary transition-colors"
        >
          <SkipBack size={13} />
        </button>
        <button
          onClick={isPlaying ? pause : resume}
          className="p-1 text-text-primary hover:text-amber-400 transition-colors"
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          onClick={next}
          className="p-1 text-text-secondary hover:text-text-primary transition-colors"
        >
          <SkipForward size={13} />
        </button>
      </div>

      {/* Track info */}
      <div className="flex items-center gap-2 min-w-0 shrink-0">
        <span className="text-[11px] text-text-primary font-medium truncate max-w-[140px]">
          {currentTrack.title}
        </span>
        <span className="text-[10px] text-text-ghost truncate max-w-[100px] hidden sm:inline">
          {currentTrack.artist}
        </span>
      </div>

      {/* Progress */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-[10px] text-text-ghost tabular-nums w-8 text-right shrink-0">
          {formatTime(currentTime)}
        </span>
        <div
          className="flex-1 h-1 bg-border-subtle rounded-full cursor-pointer group relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            seekTo(pct * duration);
          }}
        >
          <div
            className="h-full bg-amber-400/80 rounded-full transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-text-ghost tabular-nums w-8 shrink-0">
          {formatTime(duration)}
        </span>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-1.5">
        <Volume2 size={13} className="text-text-ghost shrink-0" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 accent-amber-400 cursor-pointer"
        />
      </div>
    </div>
  );
}
