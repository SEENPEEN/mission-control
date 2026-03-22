"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
} from "lucide-react";
import PanelShell from "@/components/layout/PanelShell";
import { useMusic } from "@/context/MusicContext";
import { albums } from "@/data/musicData";
import type { Track } from "@/data/musicData";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const albumGradients: Record<string, string> = {
  "Mission Tapes Vol. 1": "from-amber-500/60 to-orange-700/60",
  Unreleased: "from-purple-500/60 to-indigo-700/60",
};

function NowPlaying() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    pause,
    resume,
    play,
    next,
    prev,
    setVolume,
    seekTo,
    playlist,
  } = useMusic();

  const track = currentTrack || playlist[0];
  if (!track) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const gradient = albumGradients[track.album] || "from-gray-500/60 to-gray-700/60";

  return (
    <div className="bg-bg-card border border-border-subtle rounded-lg p-5 flex flex-col sm:flex-row gap-5">
      {/* Album art placeholder */}
      <div
        className={`w-full sm:w-36 h-36 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
      >
        <Music size={40} className="text-white/30" />
      </div>

      {/* Info + controls */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-[10px] text-text-ghost font-display tracking-[0.1em] uppercase">
            {track.album}
          </p>
          <h2 className="text-lg text-text-primary font-display font-bold tracking-wide mt-1">
            {track.title}
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">{track.artist}</p>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div
            className="w-full h-1.5 bg-border-subtle rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              seekTo(pct * duration);
            }}
          >
            <div
              className="h-full bg-amber-400 rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-text-ghost tabular-nums">
              {formatTime(currentTime)}
            </span>
            <span className="text-[10px] text-text-ghost tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={prev}
            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            <SkipBack size={18} />
          </button>
          <button
            onClick={() => {
              if (!currentTrack) play(track);
              else if (isPlaying) pause();
              else resume();
            }}
            className="w-10 h-10 rounded-full bg-amber-400 text-bg-deep flex items-center justify-center hover:bg-amber-300 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <button
            onClick={next}
            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            <SkipForward size={18} />
          </button>

          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <Volume2 size={14} className="text-text-ghost" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-amber-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, play, pause, resume } = useMusic();
  const isActive = currentTrack?.id === track.id;

  return (
    <button
      onClick={() => {
        if (isActive && isPlaying) pause();
        else if (isActive) resume();
        else play(track);
      }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
        isActive
          ? "bg-amber-400/[0.07] border-l-2 border-amber-400"
          : "hover:bg-white/[0.03] border-l-2 border-transparent"
      }`}
    >
      {/* Track number / play icon */}
      <span className="w-6 text-center shrink-0">
        {isActive && isPlaying ? (
          <Pause size={13} className="text-amber-400 mx-auto" />
        ) : (
          <span className="text-[11px] text-text-ghost tabular-nums group-hover:hidden">
            {index + 1}
          </span>
        )}
        {!(isActive && isPlaying) && (
          <Play
            size={13}
            className="text-text-secondary mx-auto hidden group-hover:block"
          />
        )}
      </span>

      {/* Title + Artist */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs truncate ${
            isActive ? "text-amber-400 font-medium" : "text-text-primary"
          }`}
        >
          {track.title}
        </p>
        <p className="text-[10px] text-text-ghost truncate">{track.artist}</p>
      </div>

      {/* Duration */}
      <span className="text-[11px] text-text-ghost tabular-nums shrink-0">
        {track.duration}
      </span>
    </button>
  );
}

export default function MusicView() {
  const { playlist } = useMusic();

  return (
    <div className="flex flex-col gap-4 h-full min-h-0">
      {/* Now playing */}
      <NowPlaying />

      {/* Track list by album */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
        {albums.map((album) => {
          const albumTracks = playlist.filter((t) => t.album === album);
          return (
            <PanelShell
              key={album}
              label={album}
              count={albumTracks.length}
              accentColor={album === "Unreleased" ? "#a855f7" : "#f59e0b"}
            >
              <div className="space-y-0.5">
                {albumTracks.map((track, i) => (
                  <TrackRow key={track.id} track={track} index={i} />
                ))}
              </div>
            </PanelShell>
          );
        })}

        {/* Drop zone hint */}
        <div className="border border-dashed border-border-subtle rounded-lg p-4 text-center">
          <p className="text-[11px] text-text-ghost font-display tracking-[0.1em] uppercase">
            Drop audio files into public/music/ to add tracks
          </p>
        </div>
      </div>
    </div>
  );
}
