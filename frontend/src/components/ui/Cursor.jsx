import { useEffect, useRef } from "react"

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed w-8 h-8 border-2 border-white rounded-full mix-blend-screen z-50"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  )
}
