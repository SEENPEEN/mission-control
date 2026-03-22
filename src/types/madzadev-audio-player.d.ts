declare module "@madzadev/audio-player" {
  import { FC } from "react";

  interface Track {
    url: string;
    title: string;
    tags: string[];
  }

  interface PlayerProps {
    trackList: Track[];
    includeTags?: boolean;
    includeSearch?: boolean;
    showPlaylist?: boolean;
    autoPlayNextTrack?: boolean;
    customColorScheme?: Record<string, string>;
  }

  const Player: FC<PlayerProps>;
  export default Player;
}
