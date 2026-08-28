import { motion, useReducedMotion } from "framer-motion"

export default function FadeIn({ children, delay = 0, className }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduce ? 0.1 : 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
