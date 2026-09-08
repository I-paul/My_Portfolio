import { useEffect, useRef, useState, useCallback } from "react"

const CRAFT_SIZE = 40
const ACCEL = 0.65
const DAMPING = 0.925
const MAX_SPEED = 8.0
const BOOST_IMPULSE = 18.0
const LERP_ROTATION = 0.18

const SPARKLE_COLORS = ["#00F5FF", "#FF007F", "#00FF66", "#FFD700", "#A855F7"]

/**
 * FunCharacter:
 * Directional flying Stark-tech craft with velocity physics,
 * rotation-to-face-direction, rear thruster flares, double-tap Space boost,
 * lockstep safe-viewport camera follow (instant, non-lagging),
 * multi-color sparkle/confetti particle bursts, and interactive target activation.
 */
export default function FunCharacter() {
  const craftRef = useRef(null)
  const thrusterRef = useRef(null)
  const trailRef = useRef(null)
  const canvasRef = useRef(null)

  // Document-space coordinates
  const posRef = useRef({
    x: typeof window !== "undefined" ? window.scrollX + window.innerWidth / 2 - CRAFT_SIZE / 2 : 400,
    y: typeof window !== "undefined" ? window.scrollY + window.innerHeight / 2 - CRAFT_SIZE / 2 : 400,
  })

  // Velocity vector
  const velRef = useRef({ vx: 0, vy: 0 })

  // Current visual heading in degrees (0 = nose facing UP)
  const rotDegRef = useRef(0)

  // Input tracking
  const keysPressed = useRef(new Set())
  const lastSpaceTimeRef = useRef(0)
  const lastBoostTimeRef = useRef(0)
  const [isBoosting, setIsBoosting] = useState(false)
  const [isThrusting, setIsThrusting] = useState(false)

  // Collision tracking
  const activeTargetsRef = useRef(new Set())

  // Multi-color particle system
  const particlesRef = useRef([])

  const [isReduced, setIsReduced] = useState(() => {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e) => setIsReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Spawns multi-color sparkle burst trailing craft on boost
  const spawnBoostSparkles = useCallback((screenX, screenY, facingDeg) => {
    if (isReduced) return
    const oppRad = (facingDeg + 90) * (Math.PI / 180)
    for (let i = 0; i < 28; i++) {
      const spread = (Math.random() - 0.5) * 1.6
      const speed = 3 + Math.random() * 8
      const angle = oppRad + spread
      particlesRef.current.push({
        x: screenX + CRAFT_SIZE / 2,
        y: screenY + CRAFT_SIZE / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2.5 + Math.random() * 4,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        alpha: 1.0,
        decay: 0.02 + Math.random() * 0.025,
        shape: Math.random() > 0.4 ? "star" : "circle",
      })
    }
  }, [isReduced])

  // Spawns multi-color confetti pop at target element upon activation
  const spawnTargetConfetti = useCallback((rect) => {
    if (isReduced) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2.5 + Math.random() * 6
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 3 + Math.random() * 3.5,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        alpha: 1.0,
        decay: 0.025 + Math.random() * 0.025,
        shape: Math.random() > 0.5 ? "diamond" : "circle",
      })
    }
  }, [isReduced])

  // Keyboard controls: WASD / Arrows + Double-Tap Space
  useEffect(() => {
    const thrustKeys = new Set([
      "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
      "KeyW", "KeyA", "KeyS", "KeyD",
      "w", "a", "s", "d", "W", "A", "S", "D"
    ])

    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return

      // Double-tap Space detection for directional boost
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault()
        const now = performance.now()
        const timeSinceLastSpace = now - lastSpaceTimeRef.current
        const timeSinceLastBoost = now - lastBoostTimeRef.current

        if (timeSinceLastSpace <= 300 && timeSinceLastBoost > 550) {
          lastBoostTimeRef.current = now
          const facingRad = (rotDegRef.current - 90) * (Math.PI / 180)
          velRef.current.vx += Math.cos(facingRad) * BOOST_IMPULSE
          velRef.current.vy += Math.sin(facingRad) * BOOST_IMPULSE

          setIsBoosting(true)
          setTimeout(() => setIsBoosting(false), 350)

          const sX = posRef.current.x - window.scrollX
          const sY = posRef.current.y - window.scrollY
          spawnBoostSparkles(sX, sY, rotDegRef.current)
        }

        lastSpaceTimeRef.current = now
        return
      }

      if (thrustKeys.has(e.code) || thrustKeys.has(e.key)) {
        keysPressed.current.add(e.code)
        setIsThrusting(true)

        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code) || ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault()
        }
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current.delete(e.code)
      if (e.key === "ArrowUp") keysPressed.current.delete("ArrowUp")
      if (e.key === "ArrowDown") keysPressed.current.delete("ArrowDown")
      if (e.key === "ArrowLeft") keysPressed.current.delete("ArrowLeft")
      if (e.key === "ArrowRight") keysPressed.current.delete("ArrowRight")
      if (e.key === "w" || e.key === "W") keysPressed.current.delete("KeyW")
      if (e.key === "a" || e.key === "A") keysPressed.current.delete("KeyA")
      if (e.key === "s" || e.key === "S") keysPressed.current.delete("KeyS")
      if (e.key === "d" || e.key === "D") keysPressed.current.delete("KeyD")

      if (keysPressed.current.size === 0) {
        setIsThrusting(false)
      }
    }

    const handleBlur = () => {
      keysPressed.current.clear()
      setIsThrusting(false)
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false })
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleBlur)
    }
  }, [spawnBoostSparkles])

  // Main flight physics, instant safe-zone camera follow, and collision loop
  useEffect(() => {
    if (isReduced) {
      if (craftRef.current) {
        const screenX = posRef.current.x - window.scrollX
        const screenY = posRef.current.y - window.scrollY
        craftRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) rotate(${rotDegRef.current}deg)`
      }
      return
    }

    let animationFrameId

    const loop = () => {
      const keys = keysPressed.current
      let ax = 0
      let dy = 0

      if (keys.has("ArrowUp") || keys.has("KeyW")) dy -= 1
      if (keys.has("ArrowDown") || keys.has("KeyS")) dy += 1
      if (keys.has("ArrowLeft") || keys.has("KeyA")) ax -= 1
      if (keys.has("ArrowRight") || keys.has("KeyD")) ax += 1

      // Normalize diagonal thrust
      if (ax !== 0 && dy !== 0) {
        ax *= 0.7071
        dy *= 0.7071
      }

      // Apply acceleration
      velRef.current.vx += ax * ACCEL
      velRef.current.vy += dy * ACCEL

      // Speed clamping
      const currentSpeed = Math.hypot(velRef.current.vx, velRef.current.vy)
      const allowedMax = keysPressed.current.size > 0 && currentSpeed > MAX_SPEED + 6 ? currentSpeed : MAX_SPEED

      if (currentSpeed > allowedMax) {
        velRef.current.vx = (velRef.current.vx / currentSpeed) * allowedMax
        velRef.current.vy = (velRef.current.vy / currentSpeed) * allowedMax
      }

      // Apply damping / friction
      velRef.current.vx *= DAMPING
      velRef.current.vy *= DAMPING

      // Cut off micro velocities
      if (Math.abs(velRef.current.vx) < 0.04) velRef.current.vx = 0
      if (Math.abs(velRef.current.vy) < 0.04) velRef.current.vy = 0

      // Update document-space position
      posRef.current.x += velRef.current.vx
      posRef.current.y += velRef.current.vy

      // Clamp strictly to actual document bounds
      const maxDocX = Math.max(document.documentElement.scrollWidth, window.innerWidth) - CRAFT_SIZE
      const maxDocY = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - CRAFT_SIZE

      posRef.current.x = Math.max(8, Math.min(maxDocX - 8, posRef.current.x))
      posRef.current.y = Math.max(8, Math.min(maxDocY - 8, posRef.current.y))

      // Rotation heading alignment
      if (currentSpeed > 0.25) {
        const targetDeg = Math.atan2(velRef.current.vy, velRef.current.vx) * (180 / Math.PI) + 90
        let diff = (targetDeg - rotDegRef.current) % 360
        if (diff > 180) diff -= 360
        if (diff < -180) diff += 360
        rotDegRef.current += diff * LERP_ROTATION
      }

      // ─────────────────────────────────────────────────────────────
      // LOCKSTEP SAFE-PADDING VIEWPORT FOLLOW (Instant, Non-Lagging)
      // Enforce a centered safe box (22% inset from all four edges).
      // The craft is never allowed to visually leave this box on any frame.
      // ─────────────────────────────────────────────────────────────
      const padY = Math.round(window.innerHeight * 0.22)
      const padX = Math.round(window.innerWidth * 0.22)

      const minScreenY = padY
      const maxScreenY = window.innerHeight - padY - CRAFT_SIZE
      const minScreenX = padX
      const maxScreenX = window.innerWidth - padX - CRAFT_SIZE

      const curScrollX = window.scrollX
      const curScrollY = window.scrollY

      let targetScrollX = curScrollX
      let targetScrollY = curScrollY

      if (posRef.current.y - curScrollY < minScreenY) {
        targetScrollY = posRef.current.y - minScreenY
      } else if (posRef.current.y - curScrollY > maxScreenY) {
        targetScrollY = posRef.current.y - maxScreenY
      }

      if (posRef.current.x - curScrollX < minScreenX) {
        targetScrollX = posRef.current.x - minScreenX
      } else if (posRef.current.x - curScrollX > maxScreenX) {
        targetScrollX = posRef.current.x - maxScreenX
      }

      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const maxScrollX = Math.max(0, document.documentElement.scrollWidth - window.innerWidth)
      targetScrollY = Math.max(0, Math.min(maxScrollY, targetScrollY))
      targetScrollX = Math.max(0, Math.min(maxScrollX, targetScrollX))

      if (targetScrollX !== curScrollX || targetScrollY !== curScrollY) {
        window.scrollTo({
          top: targetScrollY,
          left: targetScrollX,
          behavior: "instant",
        })
      }

      // Update DOM transform for craft (positioned fixed to viewport)
      const currentScreenX = posRef.current.x - window.scrollX
      const currentScreenY = posRef.current.y - window.scrollY

      if (craftRef.current) {
        craftRef.current.style.transform = `translate3d(${currentScreenX}px, ${currentScreenY}px, 0) rotate(${rotDegRef.current}deg)`
      }

      // Collision detection with [data-fun-target] elements
      const droneBox = {
        left: currentScreenX,
        top: currentScreenY,
        right: currentScreenX + CRAFT_SIZE,
        bottom: currentScreenY + CRAFT_SIZE,
      }

      const targets = document.querySelectorAll("[data-fun-target]")
      const currentFrameHits = new Set()

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        if (rect.right < 0 || rect.left > window.innerWidth) return

        const isOverlapping = !(
          droneBox.right < rect.left ||
          droneBox.left > rect.right ||
          droneBox.bottom < rect.top ||
          droneBox.top > rect.bottom
        )

        if (isOverlapping) {
          currentFrameHits.add(target)
          if (!target.classList.contains("fun-target-activated")) {
            target.classList.add("fun-target-activated")
            spawnTargetConfetti(rect)
          }
        }
      })

      activeTargetsRef.current.forEach((prevTarget) => {
        if (!currentFrameHits.has(prevTarget)) {
          prevTarget.classList.remove("fun-target-activated")
        }
      })
      activeTargetsRef.current = currentFrameHits

      // ─────────────────────────────────────────────────────────────
      // Multi-Color Canvas Sparkle / Confetti Rendering
      // ─────────────────────────────────────────────────────────────
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (ctx) {
          if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          const particles = particlesRef.current
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.08
            p.vx *= 0.98
            p.alpha -= p.decay

            if (p.alpha <= 0) {
              particles.splice(i, 1)
              continue
            }

            ctx.save()
            ctx.globalAlpha = Math.max(0, p.alpha)
            ctx.fillStyle = p.color
            ctx.shadowColor = p.color
            ctx.shadowBlur = 8

            if (p.shape === "diamond") {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y - p.size)
              ctx.lineTo(p.x + p.size, p.y)
              ctx.lineTo(p.x, p.y + p.size)
              ctx.lineTo(p.x - p.size, p.y)
              ctx.closePath()
              ctx.fill()
            } else if (p.shape === "star") {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y - p.size * 1.5)
              ctx.quadraticCurveTo(p.x, p.y, p.x + p.size * 1.5, p.y)
              ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + p.size * 1.5)
              ctx.quadraticCurveTo(p.x, p.y, p.x - p.size * 1.5, p.y)
              ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - p.size * 1.5)
              ctx.closePath()
              ctx.fill()
            } else {
              ctx.beginPath()
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
              ctx.fill()
            }
            ctx.restore()
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
      activeTargetsRef.current.forEach((el) => {
        el.classList.remove("fun-target-activated")
      })
      activeTargetsRef.current.clear()
      particlesRef.current = []
    }
  }, [isReduced, spawnTargetConfetti])

  return (
    <>
      {/* Joyful Multi-Color Sparkle / Confetti Burst Layer */}
      {!isReduced && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9989] select-none"
        />
      )}

      {/* Stark Craft Container */}
      <div
        ref={craftRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9990] top-0 left-0"
        style={{
          width: `${CRAFT_SIZE}px`,
          height: `${CRAFT_SIZE}px`,
          willChange: "transform",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Trailing Boost Wake / Speed Lines */}
          {isBoosting && !isReduced && (
            <div
              ref={trailRef}
              className="absolute top-[80%] left-1/2 -translate-x-1/2 w-4 h-14 rounded-full pointer-events-none animate-pulse"
              style={{
                background: "linear-gradient(to bottom, #FFD700, #ED1C24, transparent)",
                filter: "blur(2px) drop-shadow(0 0 10px #FFB800)",
                transformOrigin: "top center",
              }}
            />
          )}

          {/* Dynamic Rear Thruster Flame */}
          {!isReduced && (
            <div
              ref={thrusterRef}
              className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 transition-all duration-150 rounded-full"
              style={{
                width: isThrusting || isBoosting ? "8px" : "4px",
                height: isBoosting ? "18px" : isThrusting ? "12px" : "5px",
                background: isBoosting
                  ? "linear-gradient(to bottom, #FFFFFF 0%, #FFD700 50%, #ED1C24 100%)"
                  : isThrusting
                  ? "linear-gradient(to bottom, #FFD700 0%, #FF8800 70%, transparent 100%)"
                  : "rgba(255, 184, 0, 0.4)",
                filter: isThrusting || isBoosting
                  ? "drop-shadow(0 0 8px #FFB800)"
                  : "drop-shadow(0 0 2px #FF8800)",
                opacity: isThrusting || isBoosting ? 1 : 0.4,
              }}
            />
          )}

          {/* Ambient Halo */}
          <div
            className="absolute inset-0 rounded-full blur-sm"
            style={{
              background: "radial-gradient(circle, rgba(255, 184, 0, 0.35) 0%, rgba(237, 28, 36, 0.2) 65%, transparent 100%)",
            }}
          />

          {/* Directional Flying Stark Craft Sprite (Nose points UP at 0 deg) */}
          <svg
            viewBox="0 0 40 40"
            className="relative w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="stark-armor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C51017" />
                <stop offset="100%" stopColor="#780A0E" />
              </linearGradient>
              <linearGradient id="gold-trim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Swept-back Delta Wings (Chevron Craft Silhouette) */}
            <polygon
              points="20,4 35,32 28,30 20,24 12,30 5,32"
              fill="url(#stark-armor)"
              stroke="#ED1C24"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Stark Gold Wing Leading Edge Trim */}
            <polyline
              points="20,4 35,32"
              stroke="url(#gold-trim)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <polyline
              points="20,4 5,32"
              stroke="url(#gold-trim)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Inner Armor Ridge Lines */}
            <line x1="20" y1="8" x2="20" y2="24" stroke="#FFB800" strokeWidth="1.2" opacity="0.8" />
            <line x1="16" y1="20" x2="12" y2="28" stroke="#ED1C24" strokeWidth="1" />
            <line x1="24" y1="20" x2="28" y2="28" stroke="#ED1C24" strokeWidth="1" />

            {/* Stark Arc Reactor Cockpit Core */}
            <circle cx="20" cy="18" r="4.5" fill="#FFD700" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="20" cy="18" r="2.2" fill="#FFFFFF" />

            {/* Wingtip Navigation Lights */}
            <circle cx="34" cy="31" r="1.2" fill="#FFD700" />
            <circle cx="6" cy="31" r="1.2" fill="#FFD700" />
          </svg>
        </div>
      </div>
    </>
  )
}
