"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const roles = ["Creative", "Solid", "Family", "Friendly"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Timeline
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Name reveal
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );

      // Blur in elements
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-bg"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt="Jothem Studio Background"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-text-primary/70 uppercase tracking-[0.3em] mb-8 font-medium drop-shadow-md">
           
        </p>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          Jothem Studio
        </h1>

        {/* Role line */}
        <div className="blur-in text-lg md:text-2xl font-medium text-text-primary mb-6 flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-normal text-2xl md:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          >
            {roles[roleIndex]}
          </span>
          <span>Game Community.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-base md:text-lg text-text-primary font-medium max-w-lg mb-12 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
          Jothem Studio is an Indonesian game studio specializing in Roblox game development. 
          We are currently working on a game named "Bentengan," which is scheduled to be released on August 17, 2026.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          {/* Solid See Works */}
          <a
            href="#work"
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 bg-text-primary text-bg transition-all duration-300 hover:scale-105 hover:bg-bg hover:text-text-primary overflow-hidden shadow-lg"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">See Works</span>
          </a>

          {/* Outlined Reach out */}
          <a
            href="#contact"
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 border-2 border-stroke bg-bg/80 backdrop-blur-sm text-text-primary transition-all duration-300 hover:scale-105 hover:border-transparent overflow-hidden shadow-lg"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">Reach out...</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-text-primary/70 uppercase tracking-[0.2em] font-medium drop-shadow-md">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
