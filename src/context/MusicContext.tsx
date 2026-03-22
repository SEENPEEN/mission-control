"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { Track, tracks as defaultPlaylist } from "@/data/musicData";

interface MusicContextValue {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  volume: number;
  currentTime: number;
  duration: number;
  play: (track?: Track) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  seekTo: (t: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist] = useState<Track[]>(defaultPlaylist);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number>(0);

  // Sync time with animation frame for smooth progress
  const updateTime = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      setCurrentTime(audio.currentTime);
      animFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, []);

  const play = useCallback(
    (track?: Track) => {
      const target = track || currentTrack || playlist[0];
      if (!target) return;

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.addEventListener("ended", () => {
          // Auto-advance to next track
          setCurrentTrack((prev) => {
            if (!prev) return null;
            const idx = defaultPlaylist.findIndex((t) => t.id === prev.id);
            const nextTrack = defaultPlaylist[(idx + 1) % defaultPlaylist.length];
            audioRef.current!.src = nextTrack.src;
            audioRef.current!.play().catch(() => {});
            setIsPlaying(true);
            return nextTrack;
          });
        });
        audioRef.current.addEventListener("loadedmetadata", () => {
          setDuration(audioRef.current!.duration);
        });
        audioRef.current.addEventListener("error", () => {
          // File not found — set duration from track data, stay in paused state
          if (target) {
            const parts = target.duration.split(":");
            setDuration(parseInt(parts[0]) * 60 + parseInt(parts[1]));
          }
          setIsPlaying(false);
        });
      }

      const audio = audioRef.current;
      audio.volume = volume;

      if (track && track.id !== currentTrack?.id) {
        audio.src = track.src;
        audio.currentTime = 0;
        setCurrentTime(0);
        setCurrentTrack(track);
        // Parse fallback duration from string
        const parts = track.duration.split(":");
        setDuration(parseInt(parts[0]) * 60 + parseInt(parts[1]));
      }

      audio.play().catch(() => {
        // Audio file missing — that's okay, UI still works
      });
      setIsPlaying(true);
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(updateTime);
    },
    [currentTrack, playlist, volume, updateTime]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    cancelAnimationFrame(animFrameRef.current);
  }, []);

  const resume = useCallback(() => {
    if (currentTrack) {
      audioRef.current?.play().catch(() => {});
      setIsPlaying(true);
      animFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, [currentTrack, updateTime]);

  const next = useCallback(() => {
    if (!currentTrack) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = playlist[(idx + 1) % playlist.length];
    play(nextTrack);
  }, [currentTrack, playlist, play]);

  const prev = useCallback(() => {
    if (!currentTrack) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = playlist[(idx - 1 + playlist.length) % playlist.length];
    play(prevTrack);
  }, [currentTrack, playlist, play]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const seekTo = useCallback((t: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      audioRef.current?.pause();
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playlist,
        volume,
        currentTime,
        duration,
        play,
        pause,
        resume,
        next,
        prev,
        setVolume,
        seekTo,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
