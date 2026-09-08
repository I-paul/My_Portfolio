import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"

const SILHOUETTE_SRC = "/images/fun-mode/hero-silhouette.png"

/**
 * HeroSilhouette:
 * Iron Man background tribute watermark.
 * - Rendered as a CSS mask filled with a rich Stark Gold gradient (#FFE27A -> #FFD700 -> #FFB800 -> #D97706)
 * - Animates down from off-screen top (translateY(-100%)) with an eased ease-out landing motion (1.3s)
 * - Settles into resting position with low (~10-12%) opacity behind page content
 * - Gracefully handles missing asset without console error spam or broken-image icons
 * - Fades out on exit
 */
export default function HeroSilhouette() {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const img = new Image()
    img.src = SILHOUETTE_SRC
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setHasError(true)
  }, [])

  // Gracefully render nothing if file doesn't exist yet or fails to load
  if (hasError) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 0.12 } : { y: "-100%", opacity: 0 }}
        animate={
          isLoaded
            ? prefersReduced
              ? { opacity: 0.12 }
              : { y: "0%", opacity: 0.12 }
            : { opacity: 0 }
        }
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{
          duration: 1.3,
          ease: [0.16, 1, 0.3, 1], // Eased descending landing entrance
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <div
          className={`w-[85vw] h-[85vh] max-w-4xl max-h-[850px] transition-opacity duration-700 select-none ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage: `url(${SILHOUETTE_SRC})`,
            WebkitMaskImage: `url(${SILHOUETTE_SRC})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            background: "radial-gradient(ellipse at 50% 35%, #FFE27A 0%, #FFD700 35%, #FFB800 65%, #D97706 100%)",
            filter: "drop-shadow(0 0 45px rgba(255, 184, 0, 0.45)) drop-shadow(0 0 20px rgba(237, 28, 36, 0.35))",
          }}
        />
      </motion.div>
    </div>
  )
}
