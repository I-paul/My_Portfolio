import { useState, useEffect, useCallback, useRef } from "react"
import { personalInfo } from "@/data/personal"
import useScrollProgress from "@/hooks/useScrollProgress"

const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

const SECTIONS = ["experience", "work", "about", "skills", "contact"]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [hidden, setHidden] = useState(false)
  const [logoWobble, setLogoWobble] = useState(false)
  const wobbleTimeout = useRef(null)
  const progress = useScrollProgress()

  const handleLogoClick = useCallback(() => {
    // Clear any in-flight wobble so rapid clicks always restart cleanly
    if (wobbleTimeout.current) clearTimeout(wobbleTimeout.current)
    setLogoWobble(false)
    // RAF ensures the class is actually removed before re-adding it
    requestAnimationFrame(() => {
      setLogoWobble(true)
      wobbleTimeout.current = setTimeout(() => setLogoWobble(false), 450)
    })
  }, [])

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const current = window.scrollY
      setHidden(current > lastY && current > 80)
      lastY = current
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observers = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const handleNavClick = useCallback(() => setMenuOpen(false), [])

  const isActive = (href) => activeSection === href.replace("#", "")

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <nav
        className={[
          "fixed top-0 z-50 w-full border-b border-neutral-800/60 bg-black/85 backdrop-blur-md transition-transform duration-300",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">

            {/* Logo / initials */}
            <a
              href="#"
              onClick={handleLogoClick}
              className={[
                "text-base font-display font-semibold tracking-tight text-white hover:text-blue-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded inline-block",
                logoWobble ? "ip-wobble-active" : "",
              ].join(" ")}
              aria-label="Israel Paul — back to top"
            >
              IP
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={[
                    "text-sm transition-colors duration-200 relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded",
                    isActive(href)
                      ? "text-white after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-px after:bg-blue-500"
                      : "text-neutral-400 hover:text-white",
                  ].join(" ")}
                >
                  {label}
                </a>
              ))}

              {/* Resume CTA */}
              {personalInfo.resumeAvailable && (
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
                >
                  Résumé ↗
                </a>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden flex-col gap-1.5 p-2 text-neutral-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile slide-in menu */}
        <div
          className={[
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-neutral-800/60 bg-black/95",
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className={[
                  "py-2 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded",
                  isActive(href) ? "text-blue-400" : "text-neutral-300 hover:text-white",
                ].join(" ")}
              >
                {label}
              </a>
            ))}
            {personalInfo.resumeAvailable && (
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="mt-3 inline-block rounded-full border border-blue-500/50 text-blue-400 text-sm font-medium px-5 py-2 text-center hover:bg-blue-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                View Résumé ↗
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
