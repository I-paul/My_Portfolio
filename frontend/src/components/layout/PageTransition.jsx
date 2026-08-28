import { motion } from "framer-motion"

/**
 * PageTransition — wraps the entire app in a mount fade.
 * Kept short (0.3s) so it doesn't compete with section-level reveals.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
