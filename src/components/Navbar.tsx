"use client";

import React, { useEffect, useState } from "react";
import { clsx } from "clsx";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Updates", href: "#updates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Simple intersection check for active nav
      const scrollPos = window.scrollY + 300;
      const workEl = document.getElementById("work");
      const updatesEl = document.getElementById("updates");

      if (updatesEl && scrollPos >= updatesEl.offsetTop) {
        setActiveTab("Updates");
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveTab("Work");
      } else {
        setActiveTab("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    e.preventDefault();
    setActiveTab(label);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav
        className={clsx(
          "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-shadow duration-300",
          scrolled && "shadow-md shadow-black/10"
        )}
      >
        {/* 1. Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "Home", "#home")}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 hover:scale-110 overflow-hidden"
          title="Jothem Studio"
        >
          {/* Accent gradient border circle */}
          <span className="absolute inset-0 rounded-full accent-gradient transition-transform duration-500 group-hover:rotate-180" />
          {/* Inner circle with Jothem Studio Logo */}
          <span className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-bg overflow-hidden p-1">
            <img
              src="/jothem-logo.png"
              alt="Jothem Studio"
              className="w-full h-full object-contain select-none"
            />
          </span>
        </a>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.label, link.href)}
                className={clsx(
                  "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium",
                  isActive
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 5. "Say hi" button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "Contact", "#contact")}
          className="group relative inline-flex items-center text-xs sm:text-sm font-medium text-text-primary rounded-full"
        >
          {/* Hover accent gradient border behind */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Inner content wrapped in surface */}
          <span className="relative z-10 inline-flex items-center gap-1 bg-surface rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 group-hover:bg-surface/80">
            Say hi <span className="text-muted group-hover:text-text-primary transition-colors">↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}
