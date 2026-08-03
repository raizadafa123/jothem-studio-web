"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { clsx } from "clsx";

interface ProjectCard {
  title: string;
  category: string;
  year: string;
  image: string;
  colSpan: string;
  aspect: string;
}

const projects: ProjectCard[] = [
  {
    title: "Bentengan Main Menu",
    category: "Game UI & Experience",
    year: "2026",
    image: "/bentengan-2.png",
    colSpan: "md:col-span-7",
    aspect: "min-h-[380px] md:min-h-[440px]",
  },
  {
    title: "Fields Gameplay Map",
    category: "World Building & Environment",
    year: "2026",
    image: "/bentengan-3.png",
    colSpan: "md:col-span-5",
    aspect: "min-h-[380px] md:min-h-[440px]",
  },
  {
    title: "Ruins Gameplay Map",
    category: "Level Design & Lighting",
    year: "2026",
    image: "/bentengan-1.png",
    colSpan: "md:col-span-5",
    aspect: "min-h-[380px] md:min-h-[440px]",
  },
  {
    title: "Lobby",
    category: "Interactive Social Hub",
    year: "2026",
    image: "/bentengan-4.jpg",
    colSpan: "md:col-span-7",
    aspect: "min-h-[380px] md:min-h-[440px]",
  },
];

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
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
                Bentengan &apos;26 Showcase
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-text-primary mb-3">
              Game <span className="font-display italic font-normal">preview</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md">
              An exclusive look into the environments, UI, and world of Bentengan, releasing August 17, 2026.
            </p>
          </div>

          {/* View all work button (desktop only) */}
          <a
            href="#work"
            className="hidden md:inline-flex group relative items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-stroke bg-surface hover:border-transparent transition-all duration-300"
          >
            <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 inline-flex items-center gap-2 text-text-primary">
              View all work
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -12,
                boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.22)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={clsx(
                "group relative overflow-hidden rounded-3xl bg-surface border border-white/10 cursor-pointer transition-colors duration-300",
                project.colSpan,
                project.aspect
              )}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Halftone Overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />

              {/* Interactive Top-Right UI Badge */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 text-xs font-medium transform translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-lg">
                <span>View Screenshot</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10">
                <div>
                  <p className="text-xs text-white/70 tracking-widest uppercase mb-1 font-medium">
                    {project.category}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">
                    {project.title}
                  </h3>
                </div>
                <span className="text-xs text-white/70 font-mono px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                  {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Image Modal - Ultra-Smooth 60FPS (Zero Blur Shader Overhead) */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 md:p-12">
              {/* Sibling Backdrop Overlay (Zero CSS blur filter, pure high-performance compositing) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 cursor-pointer"
                style={{ willChange: "opacity" }}
              />

              {/* Ultra-Smooth Apple/Linear-style Fluid Pop-Up Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 14 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1], // Apple macOS / iOS fluid deceleration curve
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 max-w-6xl max-h-[90vh] w-auto h-auto bg-surface border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col cursor-default transform-gpu"
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
              >
                {/* Top Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Full Image Display */}
                <div className="relative flex-1 flex items-center justify-center bg-black/50 overflow-hidden max-h-[75vh]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    decoding="async"
                    loading="eager"
                    className="max-w-full max-h-[75vh] w-auto h-auto object-contain select-none transform-gpu"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>

                {/* Caption Footer */}
                <div className="p-5 sm:p-6 bg-surface border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted tracking-widest uppercase font-medium mb-1">
                      {selectedProject.category}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-medium text-text-primary">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <span className="text-xs text-text-primary font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 self-start sm:self-center">
                    {selectedProject.year}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
