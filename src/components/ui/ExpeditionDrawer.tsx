"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, Filter, Compass, Clock, Trophy, MapPin, ChevronRight } from "lucide-react";
import { EventData, eventsData } from "@/data/events";
import { soundManager } from "@/lib/audio/SoundManager";

interface ExpeditionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: EventData) => void;
}

export const ExpeditionDrawer: React.FC<ExpeditionDrawerProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
}) => {
  const [filterWorld, setFilterWorld] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!isOpen) return null;

  const worlds = [
    { id: "ALL", label: "ALL EVENTS" },
    { id: "The Last Outpost", label: "DAY 1: OUTPOST" },
    { id: "Pandemonium", label: "DAY 2: PANDEMONIUM" },
    { id: "The Carnival Island", label: "DAY 3: CARNIVAL" },
  ];

  const filteredEvents = eventsData.filter((ev) => {
    const matchesWorld = filterWorld === "ALL" || ev.world === filterWorld;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.displayCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWorld && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-xl h-full bg-[#080C14] border-l border-white/15 p-6 sm:p-8 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E05A2B]/20 border border-[#E05A2B]/40 flex items-center justify-center text-[#E05A2B]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                EXPEDITION VOYAGE LOG
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                OFFICIAL FESTIVAL DIRECTORY • AVINYA 2027
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="py-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expeditions by name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#E05A2B]"
            />
          </div>

          {/* World Filter Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {worlds.map((w) => (
              <button
                key={w.id}
                onClick={() => {
                  soundManager.playClick();
                  setFilterWorld(w.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                  filterWorld === w.id
                    ? "bg-[#E05A2B] text-black font-bold shadow-md"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                soundManager.playClick();
                onSelectEvent(ev);
              }}
              className="group p-4 rounded-xl bg-neutral-900/50 hover:bg-neutral-900/90 border border-white/10 hover:border-white/30 transition-all cursor-pointer flex gap-4 items-center"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                <Image
                  src={ev.image}
                  alt={ev.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 mb-0.5">
                  <span className="text-[#E05A2B] font-semibold">{ev.day}</span>
                  <span>•</span>
                  <span>{ev.displayCategory}</span>
                </div>
                <h4 className="font-space text-sm font-bold text-white truncate group-hover:text-[#F5C542] transition-colors">
                  {ev.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-mono mt-1">
                  <span>{ev.date}</span>
                  {ev.prizePool && <span className="text-[#F5C542]">{ev.prizePool}</span>}
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0" />
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-neutral-500 text-xs font-mono">
              NO EXPEDITIONS MATCHED CRITERIA
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center text-[10px] font-mono text-neutral-500">
          IIIT DHARWAD • TECHNO-CULTURAL FEST 2027
        </div>
      </div>
    </div>
  );
};
