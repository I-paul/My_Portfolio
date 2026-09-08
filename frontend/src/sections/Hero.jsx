import { motion } from "framer-motion"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import TextFlow from "@/components/motion/TextSmooth"
import CanvasBackground from "@/components/motion/CanvasBackground"
import { personalInfo } from "@/data/personal"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background network effect scoped to Hero */}
      <CanvasBackground />

      {/* Background glow */}
      <div className="hero-glow relative z-0" aria-hidden="true" />

      <Container>
        <div className="relative z-10 max-w-4xl hero-backdrop-panel rounded-3xl p-6 sm:p-10 sm:py-12 border border-neutral-800/60 shadow-2xl">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Badge variant="success">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden="true"
              />
              {personalInfo.availability}
            </Badge>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-300 text-lg mb-3 font-medium"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name — GSAP SplitText reveal */}
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-white mb-4 leading-none">
            <TextFlow stagger={0.035} delay={0.3}>
              {personalInfo.name}
            </TextFlow>
          </h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="font-display text-xl md:text-2xl font-medium text-neutral-200 mb-3 max-w-xl"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="text-neutral-400 text-sm mb-6 flex items-center gap-2"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {personalInfo.location}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="text-neutral-200 text-base leading-relaxed max-w-2xl mb-10"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              data-fun-target="true"
              onClick={() => (window.location.href = "#contact")}
            >
              Get in touch
            </Button>
            {personalInfo.resumeAvailable && (
              <Button
                variant="outline"
                data-fun-target="true"
                onClick={() => window.open(personalInfo.resume, "_blank")}
              >
                View Résumé ↗
              </Button>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
