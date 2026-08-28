import { motion, useReducedMotion } from "framer-motion"

export default function Reveal({ children, delay = 0 }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: shouldReduce ? 0.1 : 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
