"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";

interface UpdateEntry {
  title: string;
  version: string;
  date: string;
  image: string;
}

// Dummy Update Log entries - You can easily edit these manually anytime!
const entries: UpdateEntry[] = [
  {
    title: "[v0.8.4] Added new Ruins Map and environmental lighting",
    version: "v0.8.4 Alpha",
    date: "Aug 01, 2026",
    image: "/bentengan-1.png",
  },
  {
    title: "[v0.8.0] Overhauled Main Menu UI, sound effects, and lobby navigation",
    version: "v0.8.0 Alpha",
    date: "Jul 25, 2026",
    image: "/bentengan-2.png",
  },
  {
    title: "[v0.7.5] Expanded Field Map",
    version: "v0.7.5 Alpha",
    date: "Jul 14, 2026",
    image: "/bentengan-3.png",
  },
  {
    title: "[v0.7.0] Introduced Lobby and item shop",
    version: "v0.7.0 Alpha",
    date: "Jul 02, 2026",
    image: "/bentengan-4.jpg",
  },
];

export default function Journal() {
  return (
    <section id="updates" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Bentengan Development
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-text-primary mb-3">
              Update <span className="font-display italic font-normal">log</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md">
              Follow our development progress and release notes leading up to Bentengan&apos;s launch on August 17, 2026.
            </p>
          </div>

          {/* View all updates button */}
          <a
            href="#updates"
            className="hidden md:inline-flex group relative items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-stroke bg-surface hover:border-transparent transition-all duration-300"
          >
            <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 inline-flex items-center gap-2 text-text-primary">
              View all updates
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>

        {/* Horizontal Update Pills List */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 15px 40px -15px rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.4)",
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 bg-surface/30 hover:bg-surface border border-white/10 rounded-[32px] sm:rounded-full transition-colors duration-300 cursor-pointer"
            >
              {/* Left: Image & Title */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2">
                  {entry.title}
                </h3>
              </div>

              {/* Right: Version Tag, Date & Arrow */}
              <div className="flex items-center gap-3 sm:gap-6 shrink-0 self-end sm:self-center pr-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm text-white/80">
                  <Tag className="w-3.5 h-3.5 text-white/70" />
                  <span className="font-mono">{entry.version}</span>
                </div>
                <span className="text-xs sm:text-sm text-muted font-mono">
                  {entry.date}
                </span>
                <div className="w-9 h-9 rounded-full bg-bg border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white group-active:bg-white group-active:text-black group-active:border-white">
                  <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-black group-active:text-black transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
