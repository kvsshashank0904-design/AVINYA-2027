"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Compass, Heart, ExternalLink, ShieldCheck } from "lucide-react";
import { soundManager } from "@/lib/audio/SoundManager";

interface FooterSectionProps {
  onScrollToTop: () => void;
  onNavigateTo: (sectorId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onScrollToTop,
  onNavigateTo,
}) => {
  return (
    <footer className="relative w-full bg-[#030508] border-t border-white/10 pt-20 pb-12 overflow-hidden text-neutral-400">
      {/* Background Graphic Watermark */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[450px] h-[450px] pointer-events-none opacity-[0.03]">
        <Image
          src="/images/avinya-sail-cream.webp"
          alt="Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-full bg-white/5 border border-white/15 p-1.5 flex items-center justify-center">
                <Image
                  src="/images/avinya-sail-cream.webp"
                  alt="Avinya Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="font-cinzel text-2xl font-bold text-white tracking-[0.2em]">
                AVINYA 2027
              </span>
            </div>

            <p className="text-sm font-light leading-relaxed max-w-md text-neutral-400 mb-6">
              The flagship techno-cultural festival of the Indian Institute of Information
              Technology, Dharwad. A three-day expedition across uncharted realms of code, robotics,
              art, sound, and space exploration.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Compass className="w-4 h-4 text-[#E05A2B]" />
              <span>15°29&apos;10&quot;N 75°01&apos;45&quot;E • IIIT DHARWAD CAMPUS</span>
            </div>
          </div>

          {/* Island Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-space text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">
              ARCHIPELAGO SECTORS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigateTo("outpost");
                  }}
                  className="hover:text-[#E05A2B] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-600">01.</span>
                  <span>DAY 1: THE LAST OUTPOST</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigateTo("pandemonium");
                  }}
                  className="hover:text-[#FF007F] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-600">02.</span>
                  <span>DAY 2: PANDEMONIUM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigateTo("carnival");
                  }}
                  className="hover:text-[#F5C542] transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-600">03.</span>
                  <span>DAY 3: THE CARNIVAL ISLAND</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigateTo("hack2future");
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-neutral-600">★</span>
                  <span>HACK2FUTURE 2.0 (HACKATHON)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals & Registrations */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-space text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">
                PORTALS & REGISTRATION
              </h4>
              <div className="space-y-3">
                <a
                  href="https://hack2future.devfolio.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between text-xs font-mono text-white group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3971fe]" />
                    Devfolio Hack2Future Portal
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>

                <a
                  href="https://hack2future.iiitdwd.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between text-xs font-mono text-white group"
                >
                  <span>Official Hack2Future Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>

                <a
                  href="https://iiitdwd.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between text-xs font-mono text-white group"
                >
                  <span>IIIT Dharwad Official Site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onScrollToTop();
                }}
                className="px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/20 text-xs font-mono text-white flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <span>RETURN TO HELM</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#E05A2B]" />
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Credits Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2027 AVINYA • Indian Institute of Information Technology, Dharwad.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with passion for the voyagers of IIIT Dharwad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
