import { motion } from "framer-motion"

export default function Parallax({ children, offset = 50 }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: -offset }}
      viewport={{ once: false, margin: "0px 0px -200px 0px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
