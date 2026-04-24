"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/**
 * Compact toggle for the header — shows sun/moon icon, clicking cycles dark↔light.
 * Long-press or right-click opens a 3-option popover (Dark / Light / System).
 */
export default function ThemeToggle() {
  const { resolved, preference, toggle, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const options = [
    { value: "dark",   label: "Dark",   Icon: Moon },
    { value: "light",  label: "Light",  Icon: Sun },
    { value: "system", label: "System", Icon: Monitor },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Main toggle button */}
      <button
        onClick={toggle}
        onContextMenu={(e) => { e.preventDefault(); setMenuOpen((v) => !v); }}
        aria-label={`Switch to ${resolved === "dark" ? "light" : "dark"} mode`}
        title="Click to toggle · Right-click for options"
        className="relative flex items-center justify-center w-8 h-8 text-[#6B6B6B] hover:text-[#C8A96E] transition-colors duration-300 group"
      >
        {/* Sun icon — visible in dark mode */}
        <Sun
          size={16}
          strokeWidth={1.5}
          className="absolute transition-all duration-400"
          style={{
            opacity: resolved === "dark" ? 1 : 0,
            transform: resolved === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
          }}
        />
        {/* Moon icon — visible in light mode */}
        <Moon
          size={16}
          strokeWidth={1.5}
          className="absolute transition-all duration-400"
          style={{
            opacity: resolved === "light" ? 1 : 0,
            transform: resolved === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
          }}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className="absolute right-0 top-full mt-2 w-36 overflow-hidden transition-all duration-300 z-50"
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: menuOpen ? "auto" : "none",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {options.map(({ value, label, Icon }) => (
          <button
            key={value}
            onClick={() => { setTheme(value); setMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase transition-colors duration-200"
            style={{
              color: preference === value ? "#C8A96E" : "var(--text-muted)",
              backgroundColor: preference === value ? "rgba(200,169,110,0.06)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (preference !== value) e.currentTarget.style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              if (preference !== value) e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <Icon size={12} strokeWidth={1.5} />
            {label}
            {preference === value && (
              <span className="ml-auto w-1 h-1 bg-[#C8A96E] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
