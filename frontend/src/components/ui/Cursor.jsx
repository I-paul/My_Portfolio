import { useEffect, useRef, useState } from "react"

/**
 * Iron-Man HUD Targeting Reticle Cursor:
 * - Rotating thin circular reticle with corner brackets and bright glossy center point
 * - On hover: scales down slightly, tightens, brackets pulse with emerald glow ("lock on")
 * - On click: produces a quick radiating repulsor pulse ring (~300ms)
 * - Gated behind pointer: fine and prefers-reduced-motion
 */
export default function Cursor({ isFunMode = false }) {
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [pulses, setPulses] = useState([])
  const [isReduced] = useState(() => {
    return (
      (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || 
      (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches)
    )
  })

  useEffect(() => {
    // If reduced motion is preferred or fun mode is active, completely bypass cursor logic
    if (isReduced || isFunMode) {
      document.body.classList.remove("custom-cursor-active")
      return
    }

    document.body.classList.add("custom-cursor-active")

    const onMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onMouseOver = (e) => {
      const target = e.target.closest("a, button, [role='button'], .card-interactive, [data-fun-target]")
      setIsHovering(!!target)
    }

    const onClick = (e) => {
      const newPulse = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      }
      setPulses((prev) => [...prev, newPulse])

      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== newPulse.id))
      }, 300)
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onMouseOver)
    window.addEventListener("click", onClick)

    if (dotRef.current) {
      dotRef.current.style.transform = "translate3d(-50px, -50px, 0)"
    }

    return () => {
      document.body.classList.remove("custom-cursor-active")
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      window.removeEventListener("click", onClick)
    }
  }, [isReduced, isFunMode])

  if (isReduced || isFunMode) return null

  return (
    <>
      {/* Reticle Translation Layer */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] top-0 left-0"
        style={{ transition: "transform 100ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div
          className="relative flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            width: "44px",
            height: "44px",
            transform: `translate(-50%, -50%) scale(${isHovering ? 0.84 : 1})`,
          }}
        >
          {/* Outer Rotating HUD Target Reticle */}
          <svg
            viewBox="0 0 44 44"
            className="absolute inset-0 w-full h-full hud-reticle-spinning"
            style={{
              filter: isHovering
                ? "drop-shadow(0 0 6px rgba(16, 185, 129, 0.8))"
                : "drop-shadow(0 0 5px rgba(59, 130, 246, 0.7))",
              transition: "filter 0.2s ease",
            }}
          >
            {/* Segmented outer ring */}
            <circle
              cx="22"
              cy="22"
              r="15"
              fill="none"
              stroke={isHovering ? "#10B981" : "#3B82F6"}
              strokeWidth="1.2"
              strokeDasharray="14 10"
              opacity="0.85"
            />

            {/* Corner lock-on brackets */}
            <g
              stroke={isHovering ? "#34D399" : "#60A5FA"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className={isHovering ? "animate-pulse" : ""}
            >
              {/* Top-Left */}
              <path d="M 8 15 V 8 H 15" />
              {/* Top-Right */}
              <path d="M 29 8 H 36 V 15" />
              {/* Bottom-Left */}
              <path d="M 8 29 V 36 H 15" />
              {/* Bottom-Right */}
              <path d="M 36 29 V 36 H 29" />
            </g>
          </svg>

          {/* Central glowing arc-reactor / targeting center point */}
          <div
            className="rounded-full transition-all duration-200 z-10"
            style={{
              width: isHovering ? "6px" : "4px",
              height: isHovering ? "6px" : "4px",
              backgroundColor: "#ffffff",
              boxShadow: isHovering
                ? "0 0 10px 3px rgba(16, 185, 129, 0.9), 0 0 20px 6px rgba(16, 185, 129, 0.5)"
                : "0 0 8px 2px rgba(59, 130, 246, 0.9), 0 0 16px 4px rgba(59, 130, 246, 0.45)",
            }}
          />
        </div>
      </div>

      {/* Repulsor Pulses on Click */}
      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-[9998] rounded-full border border-blue-400 repulsor-pulse-active"
          style={{
            left: pulse.x,
            top: pulse.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  )
}
