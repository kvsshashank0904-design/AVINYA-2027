"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Compass, ChevronDown, Anchor, Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { soundManager } from "@/lib/audio/SoundManager";

interface HeroSectionProps {
  onEnterExperience: () => void;
  onExploreMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterExperience,
  onExploreMap,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#04060A] via-[#080D15] to-[#0E1520] select-none"
    >
      {/* Background Layer 1: Distant Celestial Celestial Moon & Nebulas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Giant Moon / Sun Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-b from-[#E05A2B]/15 via-[#F5C542]/5 to-transparent blur-[120px] pointer-events-none animate-pulse-glow" />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#04060A_95%)]" />

        {/* Distant Mysterious Archipelago Mountains Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-[45vh] sm:h-[55vh] z-1 opacity-70">
          <Image
            src="/images/Lone Explorer Beneath a Giant Moon.png"
            alt="Distant Horizon"
            fill
            className="object-cover object-bottom mix-blend-luminosity opacity-40 filter contrast-125 brightness-75"
            priority
          />
          {/* Horizon Fog Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/70 to-transparent" />
        </div>
      </div>

      {/* Grid Overlay for Nautical / High-Tech Chart Vibe */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-1"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center pt-20 sm:pt-24 pb-16">
        {/* Sector Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6 shadow-2xl animate-float-gentle">
          <span className="w-2 h-2 rounded-full bg-[#E05A2B] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E05A2B]">
            IIIT DHARWAD // FLAGSHIP FEST
          </span>
          <span className="text-white/30">•</span>
          <span className="font-mono text-xs text-neutral-300 tracking-wider">
            12–14 MARCH 2027
          </span>
        </div>

        {/* Main Title: AVINYA */}
        <div className="relative my-2 sm:my-4">
          <h1 className="font-cinzel text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-[0.18em] sm:tracking-[0.22em] uppercase leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <span className="bg-gradient-to-b from-white via-[#F5ECE1] to-[#A89886] bg-clip-text text-transparent">
              AVINYA
            </span>
          </h1>

          {/* Glowing Aura Behind Text */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-[#E05A2B] via-[#F5C542] to-[#FF007F]" />
        </div>

        {/* Year 2027 Badge & Coordinates */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-1 mb-6">
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#E05A2B]/70" />
          <span className="font-space text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.35em] text-[#F5C542]">
            2 0 2 7
          </span>
          <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#E05A2B]/70" />
        </div>

        {/* Subtitle / Storytelling Copy */}
        <p className="max-w-2xl text-neutral-300 text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide mb-10 drop-shadow-md">
          Step aboard our expedition vessel and journey across three uncharted islands:
          from the desert dunes of <span className="text-[#E05A2B] font-medium">The Last Outpost</span>,
          through the cyberpunk metropolis of <span className="text-[#FF007F] font-medium">Pandemonium</span>,
          to the starlit euphoria of <span className="text-[#F5C542] font-medium">The Carnival Island</span>.
        </p>

        {/* Key Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          {/* Main Enter Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onEnterExperience();
            }}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#E05A2B] via-[#E87332] to-[#F5C542] text-black font-space font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(224,90,43,0.5)] flex items-center justify-center gap-3 overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <Anchor className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-500" />
            <span>ENTER THE EXPERIENCE</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Explore Archipelago Map Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onExploreMap();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-neutral-900/70 hover:bg-neutral-800/90 border border-white/20 text-neutral-200 font-space text-sm tracking-[0.18em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-xl flex items-center justify-center gap-2.5 shadow-lg hover:border-white/40"
          >
            <Compass className="w-4 h-4 text-[#F5C542]" />
            <span>CHART COURSE</span>
          </button>
        </div>

        {/* Fest Telemetry Data Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 mt-14 pt-8 border-t border-white/10 text-left w-full max-w-3xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E05A2B]">
              VOYAGE DURATION
            </span>
            <span className="font-space font-semibold text-white text-base sm:text-lg">
              3 Days • 3 Worlds
            </span>
            <span className="text-[11px] text-neutral-400">12, 13 & 14 March 2027</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF007F]">
              EXPEDITION BASE
            </span>
            <span className="font-space font-semibold text-white text-base sm:text-lg">
              IIIT Dharwad
            </span>
            <span className="text-[11px] text-neutral-400">Karnataka, India</span>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5C542]">
              FLAGSHIP MISSION
            </span>
            <span className="font-space font-semibold text-white text-base sm:text-lg">
              Hack2Future 2.0
            </span>
            <span className="text-[11px] text-neutral-400">National Level Hackathon</span>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div
        onClick={onEnterExperience}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group transition-opacity hover:opacity-100 opacity-80"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase group-hover:text-[#E05A2B] transition-colors">
          SCROLL TO STEER VESSEL
        </span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-[#E05A2B] transition-colors">
          <div className="w-1.5 h-2.5 rounded-full bg-[#E05A2B] animate-bounce" />
        </div>
        <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-[#E05A2B] animate-pulse" />
      </div>
    </section>
  );
};
