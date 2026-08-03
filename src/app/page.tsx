"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Journal from "@/components/Journal";
import Explorations from "@/components/Explorations";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-bg text-text-primary selection:bg-[#4E85BF] selection:text-white">
      {/* Section 1: Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Navbar */}
      <Navbar />

      {/* Section 2: Hero */}
      <Hero />

      {/* Section 3: Selected Works */}
      <SelectedWorks />

      {/* Section 4: Journal & Notes */}
      <Journal />

      {/* Section 5: Explorations (Parallax Gallery) */}
      <Explorations />

      {/* Section 6: Stats */}
      <div id="resume">
        <Stats />
      </div>

      {/* Section 7: Contact / Footer */}
      <Footer />

      {/* Floating Glassmorphism Music Player */}
      <MusicPlayer />
    </main>
  );
}
