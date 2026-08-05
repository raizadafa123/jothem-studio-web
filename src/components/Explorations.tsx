"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LightboxModal, { ExplorationItem } from "./LightboxModal";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const explorations: ExplorationItem[] = [
  {
    id: 1,
    title: "Founder",
    category: "Aizu (@Ngensta)",
    image: "/roblox-avatar.png",
    rotation: "-4deg",
    description: "An Indonesian Roblox game studio currently developing Bentengan, releasing August 17, 2026.",
    href: "https://www.roblox.com/users/1189523403/profile",
  },
  {
    id: 2,
    title: "Head Admin",
    category: "Kayzen (@Arapdty)",
    image: "/roblox-avatar-4.png",
    rotation: "5deg",
    description: "Head Admin at Jothem Studio, managing community operations and development coordination.",
    href: "https://www.roblox.com/users/8001016351/profile",
  },
  {
    id: 3,
    title: "Co-Founder",
    category: "Syu (@syushirone)",
    image: "/roblox-avatar-2.png",
    rotation: "3deg",
    description: "Co-Founder of Jothem Studio and developer of Bentengan, releasing August 17, 2026.",
    href: "https://www.roblox.com/users/5043732548/profile",
  },
  {
    id: 4,
    title: "Admin",
    category: "Damos (@damosins)",
    image: "/Damos.png",
    rotation: "-3deg",
    description: "Admin at Jothem Studio, supporting community moderating and event management.",
    href: "https://www.roblox.com/users/7975562669/profile",
  },
  {
    id: 5,
    title: "Lead Developer",
    category: "TheDranxX (@TheDranxX)",
    image: "/roblox-avatar-3.png",
    rotation: "4deg",
    description: "Lead Developer at Jothem Studio, leading technical systems and game architecture.",
    href: "https://www.roblox.com/users/3754187279/profile",
  },
  {
    id: 6,
    title: "Admin",
    category: "Abel (@5tranger4gain)",
    image: "/roblox-avatar-6.png",
    rotation: "-2deg",
    description: "Admin at Jothem Studio, assisting in team coordination and community engagement.",
    href: "https://www.roblox.com/users/1316877437/profile",
  },
  {
    id: 7,
    title: "Admin",
    category: "Tsu (@zero_hsu)",
    image: "/roblox-avatar-7.png",
    rotation: "3deg",
    description: "Admin at Jothem Studio, supporting community moderating and events.",
    href: "https://www.roblox.com/users/4974441040/profile",
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);
  const isTouch = useIsTouchDevice();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const colLeft = colLeftRef.current;
      const colRight = colRightRef.current;

      if (!section || !content || !colLeft || !colRight) return;

      // Pin the center content block
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });

      // Left column scrolls upward (faster)
      gsap.fromTo(
        colLeft,
        { y: 200 },
        {
          y: -500,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Right column starts lower and scrolls upward (slower offset)
      gsap.fromTo(
        colRight,
        { y: 500 },
        {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const leftItems = explorations.filter((item) => ["Founder", "Co-Founder", "Lead Developer"].includes(item.title));
  const rightItems = explorations.filter((item) => !["Founder", "Co-Founder", "Lead Developer"].includes(item.title));

  return (
    <>
      <section
        ref={sectionRef}
        id="explorations"
        className="relative w-full bg-bg"
        style={{ minHeight: "300vh" }}
      >
        {/* Layer 1: Center content — pinned by GSAP (z-10, in normal flow) */}
        <div
          ref={contentRef}
          className="relative z-10 w-full h-screen flex flex-col justify-center items-center text-center px-6"
        >
          <div className="pointer-events-auto max-w-xl mx-auto">
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium block mb-5">
              Jothem Studio
            </span>
            <h2 className="text-5xl md:text-7xl font-normal tracking-tight text-text-primary mb-5 leading-tight">
              Meet{" "}
              <span className="font-display italic font-normal">Our Teams</span>
            </h2>
          </div>
        </div>

        {/* Layer 2: Parallax image columns — absolute over full section */}
        <div className="absolute top-0 left-0 right-0 bottom-0 z-20 pointer-events-none overflow-hidden">
          <div className="relative h-full max-w-[1400px] mx-auto px-8 md:px-16">
            <div className="absolute inset-0 grid grid-cols-2 gap-8 md:gap-16 px-8 md:px-16">
              {/* Left Column */}
              <div
                ref={colLeftRef}
                className="flex flex-col items-center gap-10 md:gap-16 pt-[15vh]"
              >
                {leftItems.map((item) => (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      if (item.href) {
                        window.open(item.href, "_blank", "noopener,noreferrer");
                      } else {
                        setSelectedItem(item);
                      }
                    }}
                    initial={{ rotate: item.rotation }}
                    animate={{ rotate: item.rotation }}
                    {...(!isTouch && {
                      whileHover: {
                        y: -12,
                        rotate: "0deg",
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        zIndex: 40,
                      },
                    })}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`group relative w-full max-w-[280px] md:max-w-[340px] aspect-square rounded-3xl overflow-hidden ${item.href ? 'bg-grid' : 'bg-surface'} border border-white/10 shadow-2xl cursor-pointer pointer-events-auto transition-colors duration-300`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full ${item.href ? 'object-cover scale-125 object-center' : 'object-cover'}`}
                    />

                    {/* Interactive Top-Right Badge */}
                    {item.href && (
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 text-xs font-medium transform translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:border-white active:translate-y-0 active:opacity-100 active:bg-white active:text-black active:border-white transition-all duration-300 shadow-lg">
                        <span>Roblox Profile</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 active:translate-x-0.5 transition-transform" />
                      </div>
                    )}

                    {/* Bottom caption always visible & clean */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10">
                      <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
                        {item.category}
                      </span>
                      <h4 className="text-lg font-display italic text-white mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div
                ref={colRightRef}
                className="flex flex-col items-center gap-10 md:gap-16 pt-[50vh]"
              >
                {rightItems.map((item) => (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      if (item.href) {
                        window.open(item.href, "_blank", "noopener,noreferrer");
                      } else {
                        setSelectedItem(item);
                      }
                    }}
                    initial={{ rotate: item.rotation }}
                    animate={{ rotate: item.rotation }}
                    {...(!isTouch && {
                      whileHover: {
                        y: -12,
                        rotate: "0deg",
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        zIndex: 40,
                      },
                    })}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`group relative w-full max-w-[280px] md:max-w-[340px] aspect-square rounded-3xl overflow-hidden ${item.href ? 'bg-grid' : 'bg-surface'} border border-white/10 shadow-2xl cursor-pointer pointer-events-auto transition-colors duration-300`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full ${item.href ? 'object-cover scale-125 object-center' : 'object-cover'}`}
                    />

                    {/* Interactive Top-Right Badge */}
                    {item.href && (
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 text-xs font-medium transform translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:border-white active:translate-y-0 active:opacity-100 active:bg-white active:text-black active:border-white transition-all duration-300 shadow-lg">
                        <span>Roblox Profile</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 active:translate-x-0.5 transition-transform" />
                      </div>
                    )}

                    {/* Bottom caption always visible & clean */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10">
                      <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
                        {item.category}
                      </span>
                      <h4 className="text-lg font-display italic text-white mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
