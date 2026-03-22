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
    <div className="flex flex-col gap-6 h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <h1 className="font-display text-lg font-bold text-text-primary tracking-[0.15em] uppercase">
              Music
            </h1>
          </div>
          <p className="text-xs text-text-ghost mt-1 ml-[18px]">
            {tracks.length} tracks · Drop mp3 files into public/music/ to add more
          </p>
        </div>
      </div>

      {/* Player - full width, scaled up */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto [&_*]:!font-[inherit] [&_.player-container]:!rounded-xl [&_.player-container]:!border [&_.player-container]:!border-[#2a2a2a] [&_input[type=range]]:!h-2 [&_.playlist-track]:!py-3 [&_.playlist-track]:!text-base [&_.title]:!text-2xl [&_.title]:!font-bold [&_.title]:!tracking-wide [&_.time]:!text-lg [&_.controls-wrapper_svg]:!w-8 [&_.controls-wrapper_svg]:!h-8 [&_.search-input]:!py-3 [&_.search-input]:!text-base [&_.search-input]:!rounded-lg [&_.tag]:!py-2 [&_.tag]:!px-4 [&_.tag]:!text-sm [&_.tag]:!rounded-lg">
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
    </div>
  );
}
