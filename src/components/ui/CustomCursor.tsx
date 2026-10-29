"use client";

import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer"))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Central Cursor Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
        }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-[#E05A2B] transition-transform duration-200 ${
            hovered ? "scale-150 bg-[#F5C542]" : ""
          }`}
        />
      </div>

      {/* Outer Floating Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${pos.x - 16}px, ${pos.y - 16}px, 0)`,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border border-white/40 transition-all duration-300 ${
            hovered
              ? "scale-150 border-[#E05A2B] bg-[#E05A2B]/10 shadow-[0_0_15px_rgba(224,90,43,0.4)]"
              : ""
          }`}
        />
      </div>
    </>
  );
};
