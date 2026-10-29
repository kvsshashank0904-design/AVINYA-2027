"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Users,
  ShieldCheck,
  Tag,
  ExternalLink,
  Compass,
} from "lucide-react";
import { EventData } from "@/data/events";
import { soundManager } from "@/lib/audio/SoundManager";

interface EventModalProps {
  event: EventData | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#0C1017] border border-white/20 shadow-2xl my-auto text-left flex flex-col max-h-[90vh]">
        {/* Top Header Banner with Event Image */}
        <div className="relative w-full h-56 sm:h-72 shrink-0 bg-neutral-950">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover object-center filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1017] via-[#0C1017]/40 to-black/60" />

          {/* Close Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-neutral-300 hover:text-white transition-all backdrop-blur-md"
            aria-label="Close Event Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Meta Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-[11px] font-mono tracking-widest bg-black/70 border border-white/20 text-[#E05A2B] backdrop-blur-md">
              {event.logNumber}
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-mono tracking-widest bg-black/70 border border-white/20 text-neutral-300 backdrop-blur-md">
              {event.day}
            </span>
          </div>

          {/* Title & Subtitle overlaid on banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E05A2B] font-semibold block mb-1">
              {event.world} // {event.displayCategory}
            </span>
            <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
              {event.title}
            </h3>
            {event.subtitle && (
              <p className="font-space text-sm sm:text-base text-neutral-300 mt-1 font-medium">
                {event.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            {event.prizePool && (
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-[#F5C542]" /> Prize Pool
                </span>
                <span className="font-space text-sm font-bold text-[#F5C542] mt-0.5">
                  {event.prizePool}
                </span>
              </div>
            )}

            {event.teamSize && (
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#E05A2B]" /> Crew Size
                </span>
                <span className="font-space text-sm font-semibold text-white mt-0.5">
                  {event.teamSize}
                </span>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#00E5FF]" /> Date & Time
              </span>
              <span className="font-space text-xs font-medium text-white mt-0.5">
                {event.date}
              </span>
              <span className="text-[10px] text-neutral-400">{event.time}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF007F]" /> Coordinates
              </span>
              <span className="font-space text-xs font-medium text-white mt-0.5 truncate">
                {event.venue}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">{event.coordinates}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              EXPEDITION BRIEFING
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              {event.fullDescription || event.description}
            </p>
          </div>

          {/* Rules and Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                RULES OF ENGAGEMENT
              </h4>
              <ul className="space-y-2">
                {event.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 font-light"
                  >
                    <span className="font-mono text-xs text-[#E05A2B] shrink-0 font-semibold">
                      0{idx + 1}.
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {event.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-6 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#E05A2B]" />
            <span>IIIT DHARWAD • AVINYA 2027</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
            >
              CLOSE
            </button>

            <a
              href="https://hack2future.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E05A2B] to-[#F5C542] text-black font-space font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <span>REGISTER FOR EXPEDITION</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
