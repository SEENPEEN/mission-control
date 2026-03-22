"use client";

import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const tracks = [
  { url: "/music/night-operations.mp3", title: "SEEN - Night Operations", tags: ["Mission Tapes Vol. 1"] },
  { url: "/music/command-center.mp3", title: "SEEN - Command Center", tags: ["Mission Tapes Vol. 1"] },
  { url: "/music/protocol.mp3", title: "SEEN - Protocol", tags: ["Mission Tapes Vol. 1"] },
  { url: "/music/frequency.mp3", title: "SEEN - Frequency", tags: ["Unreleased"] },
  { url: "/music/override.mp3", title: "SEEN - Override", tags: ["Unreleased"] },
];

const colors = {
  tagsBackground: "#f59e0b",
  tagsText: "#000000",
  tagsBackgroundHoverActive: "#d97706",
  tagsTextHoverActive: "#000000",
  searchBackground: "#1c1c1c",
  searchText: "#e0e0e0",
  searchPlaceHolder: "#404040",
  playerBackground: "#141414",
  titleColor: "#e0e0e0",
  timeColor: "#737373",
  progressSlider: "#f59e0b",
  progressUsed: "#f59e0b",
  progressLeft: "#2a2a2a",
  bufferLoaded: "#1c1c1c",
  volumeSlider: "#f59e0b",
  volumeUsed: "#f59e0b",
  volumeLeft: "#2a2a2a",
  playlistBackground: "#141414",
  playlistText: "#737373",
  playlistBackgroundHoverActive: "#1c1c1c",
  playlistTextHoverActive: "#e0e0e0",
};

export default function MusicView() {
  return (
    <div className="flex flex-col gap-4 h-full min-h-0">
      <div>
        <h1 className="font-display text-sm text-text-primary tracking-[0.15em] uppercase">
          MUSIC
        </h1>
        <p className="text-[11px] text-text-ghost mt-1">
          Drop mp3 files into public/music/ folder to add tracks
        </p>
        <p className="text-[11px] text-text-ghost mt-0.5">
          {tracks.length} tracks
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <Player
          trackList={tracks}
          includeTags={true}
          includeSearch={true}
          showPlaylist={true}
          autoPlayNextTrack={true}
          customColorScheme={colors}
        />
      </div>
    </div>
  );
}
