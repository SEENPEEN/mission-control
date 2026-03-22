export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  src: string;
}

export const tracks: Track[] = [
  {
    id: "track-1",
    title: "Night Operations",
    artist: "SEEN",
    album: "Mission Tapes Vol. 1",
    duration: "3:42",
    src: "/music/night-operations.mp3",
  },
  {
    id: "track-2",
    title: "Command Center",
    artist: "SEEN",
    album: "Mission Tapes Vol. 1",
    duration: "4:15",
    src: "/music/command-center.mp3",
  },
  {
    id: "track-3",
    title: "Protocol",
    artist: "SEEN",
    album: "Mission Tapes Vol. 1",
    duration: "2:58",
    src: "/music/protocol.mp3",
  },
  {
    id: "track-4",
    title: "Frequency",
    artist: "SEEN",
    album: "Unreleased",
    duration: "3:31",
    src: "/music/frequency.mp3",
  },
  {
    id: "track-5",
    title: "Override",
    artist: "SEEN",
    album: "Unreleased",
    duration: "4:02",
    src: "/music/override.mp3",
  },
];

export const albums = [...new Set(tracks.map((t) => t.album))];
