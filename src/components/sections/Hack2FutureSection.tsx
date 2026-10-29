"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Rocket,
  ExternalLink,
  Clock,
  Sparkles,
  Trophy,
  Shield,
  Code2,
  Terminal,
  Cpu,
  Globe2,
} from "lucide-react";
import { soundManager } from "@/lib/audio/SoundManager";

export const Hack2FutureSection: React.FC = () => {
  // Live Countdown to March 12, 2027 (Avinya & Hack2Future Launch)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2027-03-12T10:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const tracks = [
    {
      icon: Cpu,
      title: "Generative AI & Edge Compute",
      desc: "Architect lightweight autonomous models, multi-modal reasoning engines, and edge intelligence systems.",
    },
    {
      icon: Globe2,
      title: "Decentralized Systems & Web3",
      desc: "Engineer resilient peer-to-peer protocols, zero-knowledge proofs, and secure decentralized infrastructure.",
    },
    {
      icon: Shield,
      title: "Maritime & Space Tech",
      desc: "Design autonomous navigational telemetry, satellite data processors, and resilient planetary robotics.",
    },
    {
      icon: Code2,
      title: "Open Innovation",
      desc: "Tackle cross-disciplinary frontier challenges with breakthrough software engineering and human-centric design.",
    },
  ];

  return (
    <section
      id="hack2future"
      className="relative min-h-screen w-full py-32 sm:py-40 bg-black overflow-hidden border-t border-white/10"
    >
      {/* Deep Space Background Artwork & Nebula Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/hack2future/bg.webp"
          alt="Space Horizon"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-screen"
        />
        {/* Orbital Radial Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[#3971fe]/20 via-[#f59e0b]/10 to-transparent blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-transparent to-[#05070B]" />
      </div>

      {/* High-Tech Orbital Rings Overlay */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none animate-spin" style={{ animationDuration: "90s" }} />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full border border-dashed border-[#f59e0b]/15 pointer-events-none animate-spin" style={{ animationDuration: "60s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Mission Eyebrow */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.25em]">
              ORBITAL SECTOR // NATIONAL HACKATHON
            </span>
            <span className="text-white/20">•</span>
            <span className="font-mono text-xs text-neutral-400">IIIT DHARWAD</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>MISSION PROTOCOL 2.0</span>
          </div>
        </div>

        {/* Main Astronaut Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 sm:mb-28">
          {/* Left: Content, Countdown, CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 mb-6">
              <Rocket className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-amber-400 uppercase">
                FLAGSHIP 24-HOUR HACKATHON
              </span>
            </div>

            <h2 className="font-space font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
              HACK<span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">2</span>
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                FUTURE
              </span>
              <span className="text-3xl sm:text-4xl italic text-amber-400 ml-3">2.0</span>
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
              The flagship national-level hackathon of IIIT Dharwad. 24 hours of non-stop
              engineering, high-velocity prototyping, and algorithmic conquest under mentorship
              from premier industry leaders.
            </p>

            {/* Countdown Clock HUD */}
            <div className="w-full max-w-md p-5 rounded-2xl bg-neutral-900/60 border border-white/15 backdrop-blur-xl mb-8 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  MISSION LAUNCH COUNTDOWN
                </span>
                <span className="text-[10px] text-neutral-500">12 MAR 2027</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="font-space text-2xl sm:text-3xl font-bold text-white block">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Days</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="font-space text-2xl sm:text-3xl font-bold text-white block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Hours</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="font-space text-2xl sm:text-3xl font-bold text-white block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Mins</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="font-space text-2xl sm:text-3xl font-bold text-amber-400 block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Secs</span>
                </div>
              </div>
            </div>

            {/* Devfolio Apply Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="https://hack2future.devfolio.co/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="group w-full sm:w-auto px-8 py-4 rounded-xl text-white font-space font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(57,113,254,0.45)] flex items-center justify-center gap-3"
                style={{ backgroundColor: "#3971fe" }}
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/images/hack2future/devfolio.webp"
                    alt="Devfolio Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>APPLY WITH DEVFOLIO</span>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://hack2future.iiitdwd.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/20 text-neutral-200 font-space text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>OFFICIAL PORTAL</span>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Right: Floating Astronaut Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient Nebula Light */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-amber-500/20 via-blue-500/20 to-transparent blur-3xl pointer-events-none" />

            {/* Astronaut Graphic */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-float-gentle">
              <Image
                src="/images/hack2future/hero1.webp"
                alt="Hack2Future Astronaut"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-contain filter contrast-110"
                priority
              />
            </div>

            {/* Floating Mission Badges */}
            <div className="absolute -bottom-4 left-4 p-3 rounded-xl bg-black/80 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  PRIZE POOL
                </span>
                <span className="font-space font-bold text-white text-sm">
                  ₹1,50,000+ CASH & SWAG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon Tracks Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 block mb-2">
              // MISSION TRACKS
            </span>
            <h3 className="font-space text-2xl sm:text-3xl font-bold text-white tracking-wide">
              CHOOSE YOUR ARENA OF INNOVATION
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-lg group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-space text-base font-bold text-white mb-2">
                    {track.title}
                  </h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    {track.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Flight Path / Timeline */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/30 border border-white/10 backdrop-blur-xl">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              MISSION SEQUENCE
            </span>
            <h4 className="font-space text-xl sm:text-2xl font-bold text-white mt-1">
              From Launch Pad to Final Orbit
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", date: "FEB – MAR 2027", title: "Applications Open", desc: "Form your crew of 2-4 and submit your profiles via Devfolio." },
              { step: "02", date: "MAR 12, 10:00 AM", title: "Ignition & Reveal", desc: "Inauguration ceremony and real-world problem statements unlocked." },
              { step: "03", date: "MAR 12 – MAR 13", title: "24-Hour Build", desc: "Non-stop engineering sprint with active mentor check-ins." },
              { step: "04", date: "MAR 13, 04:00 PM", title: "Grand Pitch & Awards", desc: "Live jury demonstrations and national championship podium." },
            ].map((s, idx) => (
              <div key={idx} className="relative p-5 rounded-xl bg-black/40 border border-white/10">
                <span className="font-mono text-xs font-bold text-amber-400 mb-1 block">
                  PHASE {s.step} • {s.date}
                </span>
                <h5 className="font-space text-base font-semibold text-white mb-2">
                  {s.title}
                </h5>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
