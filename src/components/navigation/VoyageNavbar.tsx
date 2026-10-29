"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Compass,
  Menu,
  X,
  Radio,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { soundManager } from "@/lib/audio/SoundManager";

interface VoyageNavbarProps {
  activeSector: string;
  onOpenEventsLog: () => void;
  onSectorSelect: (sectorId: string) => void;
}

export const VoyageNavbar: React.FC<VoyageNavbarProps> = ({
  activeSector,
  onOpenEventsLog,
  onSectorSelect,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    soundManager.playClick();
  };

  const navItems = [
    { id: "hero", label: "HELM", day: "00", name: "Departure" },
    { id: "outpost", label: "OUTPOST", day: "01", name: "Day 1 (Dune)" },
    { id: "pandemonium", label: "PANDEMONIUM", day: "02", name: "Day 2 (Cyberpunk)" },
    { id: "carnival", label: "CARNIVAL", day: "03", name: "Day 3 (Festival)" },
    { id: "hack2future", label: "HACK2FUTURE", day: "★", name: "Hackathon" },
  ];

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    onSectorSelect(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#05070B]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Nautical Telemetry */}
          <div
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900/80 border border-white/15 p-1.5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
              <Image
                src="/images/avinya-sail-cream.webp"
                alt="Avinya Emblem"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-cinzel font-bold text-base sm:text-lg tracking-[0.2em] text-white group-hover:text-[#E05A2B] transition-colors">
                  AVINYA
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-[#E05A2B]/20 text-[#E05A2B] border border-[#E05A2B]/40">
                  2027
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                <span className="text-[#E05A2B] hidden sm:inline">15°29&apos;N 75°01&apos;E</span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span>IIIT DHARWAD</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-neutral-900/60 border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSector === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? "text-white font-semibold bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`text-[9px] ${
                      isActive ? "text-[#E05A2B]" : "text-neutral-500"
                    }`}
                  >
                    {item.day}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Audio, Expedition Log, Devfolio */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Atmosphere Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isMuted ? "Unmute Ambient Soundscape" : "Mute Soundscape"}
              className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                !isMuted
                  ? "bg-[#E05A2B]/20 border-[#E05A2B] text-[#E05A2B] shadow-[0_0_15px_rgba(224,90,43,0.3)] animate-pulse"
                  : "bg-neutral-900/60 border-white/15 text-neutral-400 hover:text-white hover:border-white/30"
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline text-[11px]">AUDIO OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#E05A2B]" />
                  <span className="hidden md:inline text-[11px]">ATMOSPHERE ON</span>
                </>
              )}
            </button>

            {/* Expedition Events Log Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenEventsLog();
              }}
              className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono tracking-wider text-white transition-all duration-300 flex items-center gap-1.5 backdrop-blur-md hover:scale-105 active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 text-[#E05A2B]" />
              <span className="hidden sm:inline">VOYAGE LOG</span>
              <span className="sm:hidden">LOG</span>
            </button>

            {/* Devfolio Apply CTA */}
            <a
              href="https://hack2future.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#E05A2B] to-[#F5C542] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(224,90,43,0.4)]"
            >
              <span>REGISTER</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-900/80 border border-white/15 text-neutral-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col pt-24 px-6 pb-8 border-b border-white/15">
          <div className="text-xs font-mono text-neutral-500 mb-4 tracking-widest uppercase">
            // VOYAGE ARCHIPELAGO SECTORS
          </div>
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                  activeSector === item.id
                    ? "bg-[#E05A2B]/15 border-[#E05A2B] text-white"
                    : "bg-neutral-900/60 border-white/10 text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-[#E05A2B]">SECTOR {item.day}</div>
                  <div className="font-cinzel text-lg font-bold text-white tracking-wide">
                    {item.label}
                  </div>
                  <div className="text-xs text-neutral-400 font-sans">{item.name}</div>
                </div>
                <Compass className="w-5 h-5 text-neutral-500" />
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href="https://hack2future.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E05A2B] to-[#F5C542] text-black font-bold text-sm tracking-widest text-center flex items-center justify-center gap-2 uppercase shadow-lg"
            >
              <span>APPLY VIA DEVFOLIO</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="text-center text-[10px] font-mono text-neutral-500">
              AVINYA 2027 • 12–14 MARCH 2027 • IIIT DHARWAD
            </div>
          </div>
        </div>
      )}
    </>
  );
};
