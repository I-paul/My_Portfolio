import { motion, useReducedMotion } from "framer-motion"

export default function DecorativeLines({ variant = "bezier", className = "" }) {
  const prefersReduced = useReducedMotion()

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2.5, ease: "easeInOut" } 
    }
  }

  const staticVariants = {
    hidden: { pathLength: 1, opacity: 1 },
    visible: { pathLength: 1, opacity: 1 }
  }

  const activeVariants = prefersReduced ? staticVariants : pathVariants

  if (variant === "circuit") {
    return (
      <svg 
        className={`pointer-events-none absolute ${className}`} 
        viewBox="0 0 800 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
      >
        <motion.path 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          d="M-100 200 h200 l50 -50 h150 l50 50 h250" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
        <motion.path 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          d="M-100 230 h180 l50 -50 h150 l50 50 h100" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinejoin="round" 
          strokeDasharray="4 4" 
          opacity="0.5" 
        />
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="150" cy="150" r="4" fill="currentColor" 
        />
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="350" cy="150" r="4" fill="currentColor" 
        />
      </svg>
    )
  }

  return (
    <svg 
      className={`pointer-events-none absolute ${className}`} 
      viewBox="0 0 800 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true"
    >
      <motion.path 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        d="M-100 200 C 100 300, 300 100, 500 200 S 700 100, 900 200" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <motion.path 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        d="M-100 220 C 120 320, 280 80, 520 220 S 680 80, 900 220" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeDasharray="4 8" 
        opacity="0.6" 
      />
    </svg>
  )
}
