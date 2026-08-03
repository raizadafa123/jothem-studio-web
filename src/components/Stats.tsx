"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 1, suffix: "", label: "Projects Done" },
  { value: 100, suffix: "%", label: "Satisfied Players" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-counter");

      counters.forEach((counter) => {
        const targetValue = parseFloat(counter.getAttribute("data-value") || "0");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            counter.innerText = Math.floor(obj.val).toString();
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {statsData.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center md:items-start pt-8 md:pt-0 ${
                idx === 0 ? "" : "md:pl-12"
              }`}
            >
              <div className="flex items-baseline font-display italic text-6xl md:text-8xl text-text-primary tracking-tight mb-3">
                <span className="stat-counter tabular-nums" data-value={stat.value}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted uppercase tracking-[0.25em] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
