import { useEffect, useRef, useState } from "react"

/**
 * Custom cursor — single dot driven by a CSS transform for a snappy, zero-lag feel.
 * Only rendered on pointer:fine devices (never on touch/mobile).
 * Scales up and turns emerald when hovering interactive elements.
 * Generates an emerald ripple effect on click.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [ripples, setRipples] = useState([])
  const [isReduced] = useState(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches || 
           !window.matchMedia("(pointer: fine)").matches
  })

  useEffect(() => {
    if (isReduced) return

    // Hide native cursor only when custom cursor is active
    document.body.classList.add("custom-cursor-active")

    // Update position via direct DOM manipulation to bypass React render overhead,
    // using translate3d for GPU acceleration. CSS transition provides the smooth ease.
    const onMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onMouseOver = (e) => {
      // Check if cursor is over a link, button, or interactive card
      const target = e.target.closest("a, button, [role='button'], .card-interactive")
      setIsHovering(!!target)
    }

    const onClick = (e) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      }
      setRipples((prev) => [...prev, newRipple])
      
      // Ripple animation lasts 350ms, remove it from DOM right after
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 350)
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onMouseOver)
    window.addEventListener("click", onClick)

    // Set initial position off-screen to avoid top-left flash
    if (dotRef.current) {
      dotRef.current.style.transform = "translate3d(-20px, -20px, 0)"
    }

    return () => {
      document.body.classList.remove("custom-cursor-active")
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      window.removeEventListener("click", onClick)
    }
  }, [])

  if (isReduced) return null

  return (
    <>
      {/* 
        Translation layer: Positioned top-left, handles the x/y movement.
        The 100ms cubic-bezier transition gives a fast, snappy ease-out feel
        that completely removes the "laggy" trailing sensation of a lerp.
      */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] top-0 left-0"
        style={{ transition: "transform 100ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* 
          Visual layer: Centered on the translation point via -50% -50%.
          Handles the scale, color, and glow transitions smoothly on hover.
          Glossy treatment via radial-gradient.
        */}
        <div
          className="rounded-full transition-all duration-150 ease-out"
          style={{
            width: isHovering ? "32px" : "24px",
            height: isHovering ? "32px" : "24px",
            background: isHovering 
              ? "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, #10B981 50%, #047857 100%)" 
              : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, #3B82F6 50%, #1d4ed8 100%)",
            transform: "translate(-50%, -50%)",
            boxShadow: isHovering 
              ? "0 0 24px 6px rgba(16, 185, 129, 0.5)" 
              : "0 0 20px 4px rgba(59, 130, 246, 0.4)"
          }}
        />
      </div>

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-[9998] rounded-full border border-emerald-400 cursor-ripple-active"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)"
          }}
        />
      ))}
    </>
  )
}
