import { useState, useEffect } from "react"

/**
 * EasterEggToggle:
 * Subtle, unobtrusive desktop button in the bottom-right corner.
 * Focusable and accessible via keyboard Tab and screen readers.
 * Toggles "fun mode" and listens to Escape to exit.
 * Not rendered on touch devices (pointer: fine only).
 */
export default function EasterEggToggle({ isFunMode, onToggle }) {
  const [isDesktop, setIsDesktop] = useState(() => {
    return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  })

  useEffect(() => {
    // Listen for changes in pointer fine media query
    const mq = window.matchMedia("(pointer: fine)")
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    // Escape key exits fun mode cleanly
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFunMode) {
        onToggle()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFunMode, onToggle])

  if (!isDesktop) return null

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFunMode ? "Exit fun mode (Escape)" : "Toggle fun mode"}
      aria-pressed={isFunMode}
      title={isFunMode ? "Exit fun mode (Escape)" : "Toggle fun mode"}
      className={[
        "fixed bottom-5 right-5 z-40 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isFunMode
          ? "opacity-90 bg-emerald-950/80 border border-emerald-400/80 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.5)] scale-105"
          : "opacity-35 hover:opacity-100 focus:opacity-100 bg-neutral-900/60 border border-neutral-700/60 text-neutral-400 hover:text-blue-400 hover:border-blue-500/60 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]",
      ].join(" ")}
    >
      {/* Mini Arc-Reactor / HUD Ring Icon */}
      <svg
        viewBox="0 0 24 24"
        className={`w-4 h-4 transition-transform duration-500 ${isFunMode ? "rotate-90 text-emerald-300" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" strokeDasharray="5 3" />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="currentColor"
          fillOpacity={isFunMode ? "0.6" : "0.15"}
          strokeWidth="1.2"
        />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" />
      </svg>
    </button>
  )
}
