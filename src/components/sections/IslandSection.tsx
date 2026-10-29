"use client";

import React from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Users,
  Sparkles,
  ChevronRight,
  Flame,
  Zap,
  Music,
} from "lucide-react";
import { EventData } from "@/data/events";
import { soundManager } from "@/lib/audio/SoundManager";
import confetti from "canvas-confetti";

export interface IslandConfig {
  id: string;
  worldName: "The Last Outpost" | "Pandemonium" | "The Carnival Island";
  day: string;
  date: string;
  themeTitle: string;
  tagline: string;
  description: string;
  coordinates: string;
  heroImage: string;
  islandGraphic: string;
  accentColor: string;
  secondaryAccent: string;
  bgColor: string;
  glowClass: string;
  borderClass: string;
  atmosphereBadge: string;
  events: EventData[];
}

interface IslandSectionProps {
  island: IslandConfig;
  onSelectEvent: (event: EventData) => void;
}

export const IslandSection: React.FC<IslandSectionProps> = ({
  island,
  onSelectEvent,
}) => {
  const triggerCarnivalFireworks = () => {
    soundManager.playClick();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F5C542", "#E85A26", "#00E5FF", "#FF007F", "#10B981"],
    });
  };

  return (
    <section
      id={island.id}
      className="relative min-h-screen w-full py-28 sm:py-36 overflow-hidden border-t border-white/10"
      style={{
        backgroundColor: island.bgColor,
      }}
    >
      {/* Cinematic Parallax Background Artwork */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src={island.heroImage}
          alt={island.themeTitle}
          fill
          className="object-cover object-center opacity-30 filter contrast-125"
          sizes="100vw"
        />

        {/* Ambient Gradient Masks */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, transparent 20%, ${island.bgColor} 85%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-transparent to-[#05070B]/90" />
      </div>

      {/* Grid Pattern with sector theme */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-1"
        style={{
          backgroundImage: `radial-gradient(${island.accentColor} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sector Eyebrow & Telemetry Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase border"
              style={{
                backgroundColor: `${island.accentColor}20`,
                borderColor: `${island.accentColor}50`,
                color: island.accentColor,
              }}
            >
              {island.day}
            </span>
            <span className="font-mono text-xs text-white/50 tracking-wider">
              {island.date}
            </span>
            <span className="text-white/20">•</span>
            <span className="font-mono text-xs text-white/40 hidden sm:inline">
              {island.coordinates}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Compass className="w-3.5 h-3.5 text-neutral-500" />
            <span className="uppercase tracking-widest">{island.atmosphereBadge}</span>
          </div>
        </div>

        {/* Island Hero Intro Layout: Graphic + Monumental Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 sm:mb-24">
          {/* Island 3D/Artwork Motif Card */}
          <div className="lg:col-span-5 relative group">
            <div
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 backdrop-blur-md shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              style={{
                boxShadow: `0 20px 60px ${island.accentColor}25`,
              }}
            >
              <Image
                src={island.islandGraphic}
                alt={island.themeTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* In-Card Island Identifier */}
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                    SECTOR LANDMARK
                  </span>
                  <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    {island.themeTitle}
                  </h4>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md"
                  style={{ color: island.accentColor }}
                >
                  <Compass className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Carnival Fireworks Special Button */}
            {island.worldName === "The Carnival Island" && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={triggerCarnivalFireworks}
                  className="px-5 py-2.5 rounded-full bg-[#F5C542]/20 hover:bg-[#F5C542]/30 border border-[#F5C542]/60 text-[#F5C542] text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,197,66,0.25)]"
                >
                  <Sparkles className="w-4 h-4 text-[#F5C542] animate-spin" />
                  <span>IGNITE FESTIVAL CELEBRATION</span>
                </button>
              </div>
            )}
          </div>

          {/* Island Narrative & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span
              className="text-xs font-mono tracking-[0.25em] uppercase font-bold mb-2"
              style={{ color: island.accentColor }}
            >
              // {island.tagline}
            </span>

            <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-wide leading-tight mb-6">
              {island.themeTitle}
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">
              {island.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Calendar className="w-3.5 h-3.5" style={{ color: island.accentColor }} />
                <span>{island.date}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-3.5 h-3.5" style={{ color: island.accentColor }} />
                <span>IIIT Dharwad Sector</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Trophy className="w-3.5 h-3.5" style={{ color: island.accentColor }} />
                <span>{island.events.length} Major Expeditions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Expeditions & Events Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: island.accentColor }} />
              <h3 className="font-space text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                EXPEDITION DIRECTORY // {island.day}
              </h3>
            </div>
            <span className="font-mono text-xs text-white/40">
              SELECT EVENT FOR INTEL & RULES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {island.events.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectEvent(event);
                }}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900/40 hover:bg-neutral-900/70 border border-white/10 hover:border-white/30 backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Accent Top Border Highlight on Hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: island.accentColor }}
                />

                {/* Event Thumbnail Preview */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-neutral-950">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Log Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-black/70 border border-white/20 text-neutral-300 backdrop-blur-sm">
                    {event.logNumber}
                  </div>

                  {/* Prize Tag */}
                  {event.prizePool && (
                    <div
                      className="absolute bottom-3 right-3 px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider text-black backdrop-blur-sm shadow-md"
                      style={{ backgroundColor: island.accentColor }}
                    >
                      {event.prizePool}
                    </div>
                  )}
                </div>

                {/* Event Titles */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider font-semibold"
                      style={{ color: island.accentColor }}
                    >
                      {event.displayCategory}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {event.day}
                    </span>
                  </div>

                  <h4 className="font-cinzel text-xl font-bold text-white tracking-wide group-hover:text-white transition-colors mb-2">
                    {event.title}
                  </h4>

                  {event.subtitle && (
                    <p className="font-space text-xs text-neutral-300 font-medium mb-3">
                      {event.subtitle}
                    </p>
                  )}

                  <p className="text-neutral-400 text-xs font-light line-clamp-3 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event Card Bottom Telemetry & CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1 text-neutral-300">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {event.time}
                    </span>
                    <span className="truncate max-w-[170px] text-[10px] text-neutral-400">
                      {event.venue}
                    </span>
                  </div>

                  <div
                    className="p-2 rounded-full border border-white/15 group-hover:border-white/40 bg-white/5 group-hover:bg-white/15 transition-all group-hover:scale-110"
                    style={{ color: island.accentColor }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
