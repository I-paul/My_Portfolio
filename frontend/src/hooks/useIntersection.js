import { useEffect, useRef, useState } from "react"

export default function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current // capture before async cleanup
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1, ...options })

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // options intentionally excluded: stable ref options passed at call site

  return [ref, isVisible]
}
