"use client";

import React from "react";
import Image from "next/image";
import { Compass, MapPin, Anchor, ArrowUpRight, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/audio/SoundManager";

interface ArchipelagoMapProps {
  onNavigateTo: (sectorId: string) => void;
}

export const ArchipelagoMap: React.FC<ArchipelagoMapProps> = ({ onNavigateTo }) => {
  const islands = [
    {
      id: "outpost",
      day: "DAY 01",
      date: "12 MARCH 2027",
      title: "THE LAST OUTPOST",
      theme: "Dune Desert Frontier",
      coordinates: "15°28'40\"N 75°01'15\"E",
      accent: "#E05A2B",
      image: "/images/LastOutpost.webp",
      desc: "Vast terracotta dunes, ancient industrial ruins, and the 24-Hour flagship hackathon.",
    },
    {
      id: "pandemonium",
      day: "DAY 02",
      date: "13 MARCH 2027",
      title: "PANDEMONIUM",
      theme: "Synthwave Cyberpunk City",
      coordinates: "15°29'10\"N 75°01'45\"E",
      accent: "#FF007F",
      image: "/images/pandemonium.webp",
      desc: "Neon metropolis under magenta skies, heavy combat robotics, and high-speed drone gauntlets.",
    },
    {
      id: "carnival",
      day: "DAY 03",
      date: "14 MARCH 2027",
      title: "THE CARNIVAL ISLAND",
      theme: "Festival Lagoon & Concerts",
      coordinates: "15°29'55\"N 75°02'20\"E",
      accent: "#F5C542",
      image: "/images/carnivalisland.webp",
      desc: "Golden illuminated Ferris wheel, waterside carnival, national battle of the bands, and celebrity star pro-nite.",
    },
  ];

  return (
    <section
      id="archipelago-map"
      className="relative w-full py-28 sm:py-36 bg-[#04070D] overflow-hidden border-t border-white/10"
    >
      {/* Ambient Sea Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/images/parchment-texture.webp"
          alt="Sea Chart Texture"
          fill
          className="object-cover mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 mb-4">
            <Compass className="w-4 h-4 text-[#E05A2B] animate-spin" style={{ animationDuration: "16s" }} />
            <span className="font-mono text-xs text-[#E05A2B] uppercase tracking-[0.25em]">
              EXPEDITION NAUTICAL CHART
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-wide mb-4">
            THE THREE ISLANDS OF AVINYA
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            The archipelago consists of three distinct worlds in the territorial waters of IIIT Dharwad.
            Each island awakens for one day of the festival. Chart your course and explore each territory below.
          </p>
        </div>

        {/* Islands 3-Card Interactive Route Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {islands.map((island, index) => (
            <div
              key={island.id}
              onClick={() => {
                soundManager.playClick();
                onNavigateTo(island.id);
              }}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900/60 border border-white/15 hover:border-white/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col justify-between shadow-2xl"
            >
              {/* Top Accent Stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
                style={{ backgroundColor: island.accent }}
              />

              {/* Island Preview Graphic */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-black">
                <Image
                  src={island.image}
                  alt={island.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Day Badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest text-black shadow-lg"
                  style={{ backgroundColor: island.accent }}
                >
                  {island.day}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/80">
                  <span>{island.date}</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              {/* Information */}
              <div>
                <span
                  className="text-[11px] font-mono tracking-wider uppercase block mb-1"
                  style={{ color: island.accent }}
                >
                  {island.theme}
                </span>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">
                  {island.title}
                </h3>

                <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
                  {island.desc}
                </p>
              </div>

              {/* Coordinates Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span>{island.coordinates}</span>
                <span className="text-white group-hover:underline">NAVIGATE HERE →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
