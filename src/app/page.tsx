"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { eventsData, EventData } from "@/data/events";
import { AtmosphericCanvas } from "@/components/canvas/AtmosphericCanvas";
import { VoyageBoat } from "@/components/voyage/VoyageBoat";
import { VoyageNavbar } from "@/components/navigation/VoyageNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { IslandSection, IslandConfig } from "@/components/sections/IslandSection";
import { Hack2FutureSection } from "@/components/sections/Hack2FutureSection";
import { ArchipelagoMap } from "@/components/sections/ArchipelagoMap";
import { FooterSection } from "@/components/sections/FooterSection";
import { EventModal } from "@/components/ui/EventModal";
import { ExpeditionDrawer } from "@/components/ui/ExpeditionDrawer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { soundManager } from "@/lib/audio/SoundManager";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AvinyaVoyagePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSector, setActiveSector] = useState<string>("hero");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Filter events per island
  const outpostEvents = eventsData.filter((e) => e.world === "The Last Outpost");
  const pandemoniumEvents = eventsData.filter((e) => e.world === "Pandemonium");
  const carnivalEvents = eventsData.filter((e) => e.world === "The Carnival Island");

  const islands: IslandConfig[] = [
    {
      id: "outpost",
      worldName: "The Last Outpost",
      day: "DAY 01",
      date: "12 MARCH 2027",
      themeTitle: "THE LAST OUTPOST",
      tagline: "DESERT FRONTIER // DUNE ATMOSPHERE",
      description:
        "A vast, mysterious desert realm inspired by the atmosphere of Dune. Ancient futuristic spires, drifting terracotta dust storms, warm sunset lighting, and an enduring sense of exploration. Drop anchor for the 24-hour hackathon and algorithmic regattas.",
      coordinates: "15°28'40\"N  75°01'15\"E",
      heroImage: "/images/Lone Explorer Beneath a Giant Moon.png",
      islandGraphic: "/images/LastOutpost.webp",
      accentColor: "#E05A2B",
      secondaryAccent: "#D99036",
      bgColor: "#14100E",
      glowClass: "glow-dune",
      borderClass: "border-[#E05A2B]/40",
      atmosphereBadge: "SECTOR 01: DUNE WASTES",
      events: outpostEvents,
    },
    {
      id: "pandemonium",
      worldName: "Pandemonium",
      day: "DAY 02",
      date: "13 MARCH 2027",
      themeTitle: "PANDEMONIUM",
      tagline: "SYNTHWAVE CYBERPUNK METROPOLIS",
      description:
        "High-voltage retro-futurism where mechanical sparks fly and competitive fervor takes over. Neon magenta and violet skies reflect upon dark oceanic waters as combat robotics, supersonic drone gauntlets, and tournament esports collide in thunderous glory.",
      coordinates: "15°29'10\"N  75°01'45\"E",
      heroImage: "/images/Neon Island City at Sunset.png",
      islandGraphic: "/images/pandemonium.webp",
      accentColor: "#FF007F",
      secondaryAccent: "#00E5FF",
      bgColor: "#090514",
      glowClass: "glow-cyber",
      borderClass: "border-[#FF007F]/40",
      atmosphereBadge: "SECTOR 02: NEON CITY",
      events: pandemoniumEvents,
    },
    {
      id: "carnival",
      worldName: "The Carnival Island",
      day: "DAY 03",
      date: "14 MARCH 2027",
      themeTitle: "THE CARNIVAL ISLAND",
      tagline: "CELEBRATORY FESTIVAL LAGOON",
      description:
        "Shore leave for the soul — palm silhouettes, an illuminated Ferris wheel, and golden waterfront celebration. The grand finale features national battles of the bands, choreo showcases, and the climactic celebrity star pro-nite under fireworks and collective festival euphoria.",
      coordinates: "15°29'55\"N  75°02'20\"E",
      heroImage: "/images/Twilight Lights Over the Waterfront Pier.png",
      islandGraphic: "/images/carnivalisland.webp",
      accentColor: "#F5C542",
      secondaryAccent: "#E85A26",
      bgColor: "#061715",
      glowClass: "glow-carnival",
      borderClass: "border-[#F5C542]/40",
      atmosphereBadge: "SECTOR 03: FESTIVAL LAGOON",
      events: carnivalEvents,
    },
  ];

  // Initialize Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();

      // Calculate global scroll progress (0 to 1)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, e.scroll / maxScroll)) : 0;
      setScrollProgress(progress);

      // Determine active sector and modulate soundscape
      if (progress < 0.18) {
        setActiveSector("hero");
        soundManager.setWorld("hero");
      } else if (progress >= 0.18 && progress < 0.44) {
        setActiveSector("outpost");
        soundManager.setWorld("lastOutpost");
      } else if (progress >= 0.44 && progress < 0.70) {
        setActiveSector("pandemonium");
        soundManager.setWorld("pandemonium");
      } else if (progress >= 0.70 && progress < 0.86) {
        setActiveSector("carnival");
        soundManager.setWorld("carnivalIsland");
      } else {
        setActiveSector("hack2future");
        soundManager.setWorld("hack2future");
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const navigateToSector = (sectorId: string) => {
    const element = document.getElementById(sectorId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -60, duration: 1.5 });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#05070B] text-neutral-100 overflow-x-hidden">
      {/* Cinematic Film Grain Overlay */}
      <div className="bg-grain" />

      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Interactive 60fps Ambient Canvas Particle System */}
      <AtmosphericCanvas
        scrollProgress={scrollProgress}
        activeWorld={
          activeSector === "outpost"
            ? "lastOutpost"
            : activeSector === "pandemonium"
            ? "pandemonium"
            : activeSector === "carnival"
            ? "carnivalIsland"
            : activeSector === "hack2future"
            ? "hack2future"
            : "hero"
        }
      />

      {/* The Vessel Sailing Through the Archipelago */}
      <VoyageBoat
        scrollProgress={scrollProgress}
        activeWorld={
          activeSector === "outpost"
            ? "Sector 01: Outpost"
            : activeSector === "pandemonium"
            ? "Sector 02: Pandemonium"
            : activeSector === "carnival"
            ? "Sector 03: Carnival"
            : activeSector === "hack2future"
            ? "Sector 04: Hack2Future"
            : "Departure Waters"
        }
      />

      {/* Fixed Top HUD & Sector Navigation */}
      <VoyageNavbar
        activeSector={activeSector}
        onOpenEventsLog={() => setIsDrawerOpen(true)}
        onSectorSelect={navigateToSector}
      />

      {/* Section 0: Hero Opening */}
      <HeroSection
        onEnterExperience={() => navigateToSector("outpost")}
        onExploreMap={() => navigateToSector("archipelago-map")}
      />

      {/* Interactive Archipelago Sea Chart Overview */}
      <ArchipelagoMap onNavigateTo={navigateToSector} />

      {/* Sections 1, 2, 3: The Three Island Worlds */}
      {islands.map((island) => (
        <IslandSection
          key={island.id}
          island={island}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />
      ))}

      {/* Section 4: Flagship Hack2Future Astronaut Mission */}
      <Hack2FutureSection />

      {/* Footer & Helm Coordinates */}
      <FooterSection
        onScrollToTop={() => navigateToSector("hero")}
        onNavigateTo={navigateToSector}
      />

      {/* Event Intelligence Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Full Expedition Log Drawer */}
      <ExpeditionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectEvent={(event) => {
          setIsDrawerOpen(false);
          setSelectedEvent(event);
        }}
      />
    </main>
  );
}
