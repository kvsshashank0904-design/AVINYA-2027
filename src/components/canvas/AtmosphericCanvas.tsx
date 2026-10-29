"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  seed: number;
}

interface AtmosphericCanvasProps {
  scrollProgress: number; // 0 to 1
  activeWorld?: "hero" | "lastOutpost" | "pandemonium" | "carnivalIsland" | "hack2future";
}

export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({
  scrollProgress,
  activeWorld = "hero",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particle pool
    const particleCount = 120;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        color: "#ffffff",
        seed: Math.random() * 1000,
      });
    }

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Determine palette and motion parameters based on world & scroll progress
      // 0.0 - 0.22: Hero / Ocean
      // 0.22 - 0.48: Last Outpost (Dune)
      // 0.48 - 0.73: Pandemonium (Synthwave)
      // 0.73 - 0.88: Carnival Island
      // 0.88 - 1.00: Hack2Future
      let targetColor = "rgba(220, 230, 255, ";
      let windX = 0.2;
      let windY = -0.15;
      let isStreaks = false;

      if (activeWorld === "lastOutpost" || (scrollProgress >= 0.18 && scrollProgress < 0.45)) {
        // Dune desert amber & sand storm
        targetColor = "rgba(235, 120, 50, ";
        windX = 1.4; // blowing desert sands
        windY = -0.3;
      } else if (activeWorld === "pandemonium" || (scrollProgress >= 0.45 && scrollProgress < 0.72)) {
        // Synthwave neon magenta / cyan rain
        targetColor = "rgba(255, 0, 160, ";
        windX = -0.2;
        windY = 2.4; // digital rain
        isStreaks = true;
      } else if (activeWorld === "carnivalIsland" || (scrollProgress >= 0.72 && scrollProgress < 0.87)) {
        // Festive golden fireflies / lantern motes
        targetColor = "rgba(255, 205, 75, ";
        windX = Math.sin(time) * 0.4;
        windY = -0.6; // floating embers
      } else if (activeWorld === "hack2future" || scrollProgress >= 0.87) {
        // Astronaut deep space starfield warp
        targetColor = "rgba(100, 180, 255, ";
        windX = 0;
        windY = -1.8;
        isStreaks = true;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply velocities with world wind
        p.x += p.vx + windX;
        p.y += p.vy + windY;

        // Mouse interaction: gentle repulsion
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Loop around borders
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Dynamic twinkle
        const pulse = Math.sin(time * 2 + p.seed) * 0.3 + 0.7;
        const currentAlpha = Math.min(1, Math.max(0.05, p.alpha * pulse));

        ctx.fillStyle = `${targetColor}${currentAlpha})`;

        if (isStreaks) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + windX * 4, p.y + windY * 6);
          ctx.lineWidth = p.size * 0.7;
          ctx.strokeStyle = `${targetColor}${currentAlpha * 0.8})`;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Soft glow for larger embers
          if (p.size > 2) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `${targetColor}${currentAlpha * 0.15})`;
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [scrollProgress, activeWorld]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] transition-opacity duration-1000"
      style={{ opacity: 0.9 }}
    />
  );
};
