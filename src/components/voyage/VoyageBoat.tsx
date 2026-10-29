"use client";

import React from "react";
import Image from "next/image";
import { Compass, Wind } from "lucide-react";

interface VoyageBoatProps {
  scrollProgress: number; // 0 to 1
  activeWorld: string;
}

export const VoyageBoat: React.FC<VoyageBoatProps> = ({
  scrollProgress,
  activeWorld,
}) => {
  // Compute horizontal and vertical position of the vessel across the voyage
  // Progress 0: Anchored at departure bay (center bottom)
  // Progress 0.25 - 0.45: Cruising towards Dune Last Outpost (sweeps slightly left)
  // Progress 0.45 - 0.70: Entering Pandemonium Synthwave archipelago (cuts across towards right)
  // Progress 0.70 - 0.85: Approaching Carnival Island Lagoon (glides center)
  // Progress 0.85 - 1.0: Launching into Deep Space Hack2Future (elevates upwards into orbit)

  let boatX = 50; // percentage
  let boatY = 82; // percentage
  let boatScale = 1;
  let boatRotation = 0; // degrees
  let glowColor = "rgba(224, 90, 43, 0.45)"; // default warm amber

  if (scrollProgress < 0.2) {
    // Departure
    const t = scrollProgress / 0.2;
    boatX = 50 + t * -6;
    boatY = 82 - t * 4;
    boatScale = 1 - t * 0.15;
    boatRotation = -2 + t * 4;
    glowColor = "rgba(224, 90, 43, 0.5)";
  } else if (scrollProgress >= 0.2 && scrollProgress < 0.48) {
    // World 1: The Last Outpost (Dune)
    const t = (scrollProgress - 0.2) / 0.28;
    boatX = 44 + Math.sin(t * Math.PI) * 12;
    boatY = 78 - t * 6;
    boatScale = 0.85 + Math.sin(t * Math.PI) * 0.1;
    boatRotation = 3 - t * 5;
    glowColor = "rgba(224, 90, 43, 0.65)";
  } else if (scrollProgress >= 0.48 && scrollProgress < 0.74) {
    // World 2: Pandemonium (Cyberpunk)
    const t = (scrollProgress - 0.48) / 0.26;
    boatX = 56 - Math.sin(t * Math.PI) * 14;
    boatY = 72 - t * 4;
    boatScale = 0.88 + Math.sin(t * Math.PI) * 0.08;
    boatRotation = -4 + t * 6;
    glowColor = "rgba(255, 0, 127, 0.7)";
  } else if (scrollProgress >= 0.74 && scrollProgress < 0.88) {
    // World 3: Carnival Island
    const t = (scrollProgress - 0.74) / 0.14;
    boatX = 48 + t * 4;
    boatY = 68 - t * 4;
    boatScale = 0.92;
    boatRotation = 1 - t * 3;
    glowColor = "rgba(245, 197, 66, 0.7)";
  } else {
    // Hack2Future Space Mission
    const t = Math.min(1, (scrollProgress - 0.88) / 0.12);
    boatX = 52 + t * 2;
    boatY = 64 - t * 30; // ascends towards the cosmos
    boatScale = 0.92 - t * 0.4;
    boatRotation = -t * 12;
    glowColor = "rgba(57, 113, 254, 0.8)";
  }

  // Heading degrees for display
  const headingDegrees = Math.round(((scrollProgress * 280 + 35) % 360));

  return (
    <div
      className="fixed pointer-events-none z-30 transition-all duration-300 ease-out hidden sm:block"
      style={{
        left: `${boatX}%`,
        top: `${boatY}%`,
        transform: `translate(-50%, -50%) scale(${boatScale}) rotate(${boatRotation}deg)`,
      }}
    >
      {/* Vessel Container with oceanic bobbing */}
      <div className="relative animate-sway flex flex-col items-center">
        {/* Bow Lantern Glow */}
        <div
          className="absolute -top-4 w-12 h-12 rounded-full blur-xl pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: glowColor }}
        />

        {/* Sail & Hull Graphics */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
          <Image
            src="/images/avinya-sail-cream.webp"
            alt="Avinya Flagship Sail"
            fill
            className="object-contain filter contrast-125"
            priority
          />
        </div>

        {/* Water Wake / Wave Ripples */}
        <div className="absolute -bottom-2 w-32 h-6 pointer-events-none opacity-60">
          <div
            className="w-full h-full rounded-full blur-md"
            style={{
              background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Tactical Nautical HUD Floating Chip */}
        <div className="absolute -bottom-7 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-neutral-300 shadow-xl whitespace-nowrap">
          <Compass className="w-3 h-3 text-[#E05A2B] animate-spin" style={{ animationDuration: "12s" }} />
          <span>HDG {headingDegrees}°</span>
          <span className="text-white/30">•</span>
          <span className="text-white/60 uppercase">{activeWorld}</span>
        </div>
      </div>
    </div>
  );
};
