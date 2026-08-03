"use client";

import React, { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";

const socials = [
  { label: "Discord", href: "https://discord.gg/VE7xsxyvr6" },
  { label: "TikTok", href: "https://www.tiktok.com/@jothemstudios?is_from_webapp=1&sender_device=pc" },
  { label: "Email", href: "mailto:studiojothem@gmail.com" },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative bg-bg pt-20 md:pt-28 pb-8 md:pb-12 overflow-hidden border-t border-stroke"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt="Jothem Studio Background"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Heavier dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Center CTA */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-20 md:mb-28">
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-6">
          
        </span>
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight mb-8 max-w-2xl leading-tight">
          Let&apos;s build something timeless.
        </h2>

        {/* Email CTA Button with gradient hover border ring */}
        <a
          href="mailto:studiojothem@gmail.com"
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium text-text-primary bg-surface/90 backdrop-blur-md border border-white/15 hover:border-transparent transition-all duration-300 shadow-2xl"
        >
          {/* Accent gradient ring on hover */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-gradient-shift" />
          <span className="relative z-10 inline-flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted group-hover:text-text-primary transition-colors" />
            <span>studiojothem@gmail.com</span>
            <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-muted">
        {/* Left: Social Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors font-medium"
            >
              {social.label}
            </a>
          ))}
        </div>

        {/* Right: Pulsing Dot + Availability & Copyright */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium text-text-primary">
              Available for projects
            </span>
          </div>
          <span className="hidden md:inline text-stroke">|</span>
          <span className="text-muted font-mono">
            &copy; {new Date().getFullYear()} Jothem Studio
          </span>
        </div>
      </div>
    </footer>
  );
}
