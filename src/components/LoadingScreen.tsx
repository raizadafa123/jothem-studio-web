"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Jothem Studio", "Game Community", "Bentengan '26"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = React.useState(0);
  const [wordIndex, setWordIndex] = React.useState(0);
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    // Counter: increments by 2 every 25ms → reaches 100 in ~1.25s
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Cycle words every 600ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 select-none"
    >
      {/* Top-left label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
          Jothem Studio
        </span>
      </motion.div>

      {/* Center rotating words */}
      <div className="flex justify-center items-center h-24 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom area: counter and progress bar */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          {count === 100 ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("start-music"));
                onComplete();
              }}
              className="px-6 py-3 bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-[0.25em] rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-3 cursor-pointer"
            >
              <span>Enter Website</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.button>
          ) : (
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              Loading Assets...
            </span>
          )}
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Bottom progress bar */}
        <div className="w-full h-[3px] bg-stroke/50 overflow-hidden relative rounded-full">
          <div
            className="h-full w-full accent-gradient origin-left transition-transform duration-75 ease-linear"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
