import { useEffect, useRef, useState } from "react"

export default function CanvasBackground() {
  const canvasRef = useRef(null)
  // Initialize state synchronously since we are CSR-only
  const [isReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  useEffect(() => {
    if (isReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId
    let particles = []
    let width = 0
    let height = 0

    const initCanvas = () => {
      const parent = canvas.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = width
      canvas.height = height
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const numParticles = 40 // Sparse field
      for (let i = 0; i < numParticles; i++) {
        // 85% blue, 15% emerald
        const isEmerald = Math.random() > 0.85
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35, // Very slow drift
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.5 + 0.5,
          color: isEmerald ? "rgba(16, 185, 129, 0.4)" : "rgba(59, 130, 246, 0.4)",
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges smoothly
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Draw Network Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          const maxDist = 140 // Only connect nearby particles

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq)
            const opacity = (1 - dist / maxDist) * 0.12 // Keep lines very faint (12% max)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    let isRunning = true
    const loop = () => {
      if (isRunning) draw()
      animationFrameId = requestAnimationFrame(loop)
    }

    // Pause loop when tab is backgrounded
    const handleVisibilityChange = () => {
      isRunning = !document.hidden
    }

    window.addEventListener("resize", initCanvas)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    initCanvas()
    loop()

    return () => {
      window.removeEventListener("resize", initCanvas)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (isReduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  )
}
