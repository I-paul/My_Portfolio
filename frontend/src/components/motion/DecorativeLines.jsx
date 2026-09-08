import { motion, useReducedMotion } from "framer-motion"

function HudFilters({ variant }) {
  return (
    <defs>
      <filter id={`hud-glow-${variant}`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`hud-glow-emerald-${variant}`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  )
}

export default function DecorativeLines({ variant = "bezier", className = "" }) {
  const prefersReduced = useReducedMotion()

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2.2, ease: "easeInOut" } 
    }
  }

  const staticVariants = {
    hidden: { pathLength: 1, opacity: 1 },
    visible: { pathLength: 1, opacity: 1 }
  }

  const activeVariants = prefersReduced ? staticVariants : pathVariants

  if (variant === "circuit") {
    const mainTrace = "M-50 180 h160 l45 -45 h155 l35 35 v55 l45 45 h195 l45 -45 h180"
    const subTrace = "M-30 230 h130 l40 -40 h140 l30 30 h120 l40 40 h160"

    return (
      <svg 
        className={`pointer-events-none absolute ${className}`} 
        viewBox="0 0 900 420" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 0 8px var(--color-accent-blue, rgba(59, 130, 246, 0.45)))" }}
      >
        <HudFilters variant={variant} />

        {/* Technical HUD grid lines / tick marks */}
        <g opacity="0.4" stroke="var(--color-accent-blue, #3B82F6)" strokeWidth="1">
          <line x1="155" y1="125" x2="155" y2="145" />
          <line x1="145" y1="135" x2="165" y2="135" />
          <line x1="390" y1="215" x2="390" y2="235" />
          <line x1="380" y1="225" x2="400" y2="225" />
          <line x1="675" y1="260" x2="675" y2="280" />
          <line x1="665" y1="270" x2="685" y2="270" />
        </g>

        {/* Auxiliary dashed schematic path */}
        <motion.path 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-80px" }}
          d={subTrace} 
          stroke="var(--color-accent-blue, #3B82F6)" 
          strokeWidth="1.2" 
          strokeDasharray="6 6" 
          opacity="0.45" 
          strokeLinejoin="round"
        />

        {/* Primary circuit schematic path */}
        <motion.path 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-80px" }}
          d={mainTrace} 
          stroke="var(--color-accent-blue, #3B82F6)" 
          strokeWidth="2" 
          strokeLinejoin="round" 
          opacity="0.75"
          filter={`url(#hud-glow-${variant})`}
        />

        {/* Traveling energy pulse along main trace */}
        {!prefersReduced && (
          <motion.path
            d={mainTrace}
            stroke="var(--color-accent-blue-light, #93C5FD)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "28 750", strokeDashoffset: 750 }}
            animate={{ strokeDashoffset: -750 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            filter={`url(#hud-glow-${variant})`}
          />
        )}

        {/* Connection Nodes - Primary Accent with Fun Mode Color Variants */}
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="155" cy="135" r="3.5" fill="var(--color-accent-blue, #3B82F6)" 
          className="hud-node-cyan"
        />
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="390" cy="225" r="4" fill="var(--color-accent-blue, #3B82F6)" 
          className="hud-node-magenta"
        />
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="780" cy="225" r="3.5" fill="var(--color-accent-blue, #3B82F6)" 
          className="hud-node-purple"
        />

        {/* Key Junction Accent Node - Secondary Accent */}
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="310" cy="135" r="5" fill="var(--color-accent-emerald, #10B981)" 
          filter={`url(#hud-glow-emerald-${variant})`}
          className="hud-node-gold"
        />
        {/* Emerald/Gold Node Target Bracket */}
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="310" cy="135" r="9" stroke="var(--color-accent-emerald, #10B981)" strokeWidth="1" strokeDasharray="3 3" opacity="0.85"
          className="hud-node-lime"
        />

        {/* Second Emerald/Gold Node */}
        <motion.circle 
          variants={activeVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          cx="630" cy="270" r="4.5" fill="var(--color-accent-emerald, #10B981)" 
          filter={`url(#hud-glow-emerald-${variant})`}
          className="hud-node-cyan"
        />
      </svg>
    )
  }

  // Variant: Hybrid curved/schematic HUD line
  const bezierTrace = "M-50 200 C 120 280, 240 120, 380 160 h120 l40 40 h150 C 760 240, 840 160, 950 200"
  const secondaryArc = "M-50 240 C 100 320, 260 160, 410 200 h90 l40 40 h120 C 730 280, 820 200, 950 240"

  return (
    <svg 
      className={`pointer-events-none absolute ${className}`} 
      viewBox="0 0 900 420" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 0 8px var(--color-accent-blue, rgba(59, 130, 246, 0.45)))" }}
    >
      <HudFilters variant={variant} />

      {/* Crosshair coordinate markers */}
      <g opacity="0.4" stroke="var(--color-accent-blue, #3B82F6)" strokeWidth="1">
        <line x1="380" y1="150" x2="380" y2="170" />
        <line x1="370" y1="160" x2="390" y2="160" />
        <line x1="540" y1="190" x2="540" y2="210" />
        <line x1="530" y1="200" x2="550" y2="200" />
      </g>

      {/* Auxiliary dashed schematic path */}
      <motion.path 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-80px" }}
        d={secondaryArc} 
        stroke="var(--color-accent-blue, #3B82F6)" 
        strokeWidth="1.2" 
        strokeDasharray="6 6" 
        opacity="0.45" 
      />

      {/* Primary hybrid curve/circuit path */}
      <motion.path 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-80px" }}
        d={bezierTrace} 
        stroke="var(--color-accent-blue, #3B82F6)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.75"
        filter={`url(#hud-glow-${variant})`}
      />

      {/* Traveling energy pulse */}
      {!prefersReduced && (
        <motion.path
          d={bezierTrace}
          stroke="var(--color-accent-blue-light, #93C5FD)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "30 800", strokeDashoffset: 800 }}
          animate={{ strokeDashoffset: -800 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          filter={`url(#hud-glow-${variant})`}
        />
      )}

      {/* Primary accent connection nodes */}
      <motion.circle 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        cx="380" cy="160" r="3.5" fill="var(--color-accent-blue, #3B82F6)" 
        className="hud-node-cyan"
      />
      <motion.circle 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        cx="690" cy="200" r="3.5" fill="var(--color-accent-blue, #3B82F6)" 
        className="hud-node-purple"
      />

      {/* Focal secondary accent node with target bracket */}
      <motion.circle 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        cx="500" cy="160" r="5" fill="var(--color-accent-emerald, #10B981)" 
        filter={`url(#hud-glow-emerald-${variant})`}
        className="hud-node-gold"
      />
      <motion.circle 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        cx="500" cy="160" r="9" stroke="var(--color-accent-emerald, #10B981)" strokeWidth="1" strokeDasharray="3 3" opacity="0.85"
        className="hud-node-magenta"
      />

      {/* Second secondary accent node */}
      <motion.circle 
        variants={activeVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        cx="540" cy="200" r="4.5" fill="var(--color-accent-emerald, #10B981)" 
        filter={`url(#hud-glow-emerald-${variant})`}
        className="hud-node-lime"
      />
    </svg>
  )
}
