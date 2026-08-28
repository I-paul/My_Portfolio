import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(SplitText)

/**
 * TextFlow — GSAP SplitText stagger reveal.
 * Respects prefers-reduced-motion: skips animation entirely if the user
 * has opted for reduced motion (detected via the CSS media query).
 */
export default function TextFlow({ children, stagger = 0.04, delay = 0 }) {
  const textRef = useRef(null)
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useGSAP(
    () => {
      if (!textRef.current || prefersReduced) return

      const split = SplitText.create(textRef.current, { type: "chars,words" })

      gsap.set(split.chars, { opacity: 0, y: 20 })
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
        onComplete: () => split.revert(),
      })

      return () => split.revert()
    },
    { dependencies: [children, prefersReduced] }
  )

  return <span ref={textRef}>{children}</span>
}