"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Music, Minimize2, Maximize2 } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    // 1. Attempt to play immediately and retry until playback starts
    const attemptPlay = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    attemptPlay();
    const autoplayInterval = setInterval(() => {
      if (!audio.paused) {
        setIsPlaying(true);
        clearInterval(autoplayInterval);
      } else {
        attemptPlay();
      }
    }, 1500);

    // 2. Play automatically on the user's first click, tap, or keypress anywhere on the page
    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          clearInterval(autoplayInterval);
          window.removeEventListener("click", handleFirstInteraction);
          window.removeEventListener("keydown", handleFirstInteraction);
          window.removeEventListener("touchstart", handleFirstInteraction);
          window.removeEventListener("pointerdown", handleFirstInteraction);
          window.removeEventListener("mousedown", handleFirstInteraction);
        }).catch(() => {});
      }
    };

    window.addEventListener("start-music", handleFirstInteraction);
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("mousedown", handleFirstInteraction);

    // Attempt to load duration right away if metadata is already loaded
    if (audio.readyState >= 1) {
      updateDuration();
    }

    return () => {
      clearInterval(autoplayInterval);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("start-music", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("mousedown", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  };

  const handleSkipBack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSkipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (duration > 0) {
      const nextTime = Math.min(duration, audio.currentTime + 10);
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = Math.max(0, Math.min(duration, (clickX / width) * duration));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/laskar-pelangi.mp3"
        preload="auto"
        autoPlay
        loop
      />

      {/* Minimized Pill Button */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 bg-[#121212]/90 hover:bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-full shadow-2xl shadow-black/80 text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
          title="Expand music player"
        >
          <div className="relative flex items-center justify-center">
            <Music className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
            )}
          </div>
          <span className="text-xs font-medium text-white/90">
            Laskar Pelangi — Nidji
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors ml-1" />
        </button>
      ) : (
        /* Expanded Sleek Glassmorphic Widget */
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[340px] sm:w-[380px] bg-[#111111]/90 sm:bg-[#111111]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl shadow-black/80 p-3 sm:px-4 sm:py-3.5 text-white transition-all duration-300">
          <div className="flex items-center gap-3">
            {/* Left: Album Art */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10 shadow-inner group">
              <img
                src="/jothem-logo.png"
                alt="Laskar Pelangi Album Art"
                className="w-full h-full object-contain p-1.5 transform transition-transform duration-700 group-hover:scale-110"
              />
              {/* Spinning visualizer icon in bottom corner */}
              <div className="absolute bottom-1 left-1 w-3 h-3 flex items-center justify-center">
                <div
                  className={`w-2 h-2 rounded-full bg-white/70 ${
                    isPlaying ? "animate-pulse" : "opacity-40"
                  }`}
                />
              </div>
            </div>

            {/* Middle: Title & Progress Bar */}
            <div className="flex-1 min-w-0">
              {/* Top Row: Track Name & Minimize Button */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    Laskar Pelangi — Nidji
                  </h4>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  title="Minimize player"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Row: Timestamp & Progress Line */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/70 font-mono min-w-[26px]">
                  {formatTime(currentTime)}
                </span>
                {/* Seekbar */}
                <div
                  onClick={handleSeek}
                  className="relative flex-1 h-1.5 bg-white/20 hover:bg-white/30 rounded-full overflow-hidden cursor-pointer group py-1"
                >
                  <div className="absolute left-0 top-0 bottom-0 bg-white group-hover:bg-white/90 rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-white/50 font-mono min-w-[26px] text-right">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right: Media Controls */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 pl-1">
              <button
                onClick={handleSkipBack}
                className="p-1 text-white/60 hover:text-white hover:scale-110 transition active:scale-95"
                title="Restart"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white hover:scale-105 transition active:scale-95 shadow-md"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white text-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                )}
              </button>

              <button
                onClick={handleSkipForward}
                className="p-1 text-white/60 hover:text-white hover:scale-110 transition active:scale-95"
                title="Skip +10s"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
