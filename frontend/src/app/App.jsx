import { useState, useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PageTransition from "@/components/layout/PageTransition"
import Cursor from "@/components/ui/Cursor"
import EasterEggToggle from "@/components/ui/EasterEggToggle"
import FunCharacter from "@/components/motion/FunCharacter"
import HeroSilhouette from "@/components/motion/HeroSilhouette"
import Hero from "@/sections/Hero"
import Experience from "@/sections/Experience"
import Work from "@/sections/Work"
import About from "@/sections/About"
import Skills from "@/sections/Skills"
import Contact from "@/sections/Contact"

export default function App() {
  const [isFunMode, setIsFunMode] = useState(false)

  // Toggle page-wide vibrancy class on document root
  useEffect(() => {
    document.documentElement.classList.toggle("fun-mode-active", isFunMode)
    return () => {
      document.documentElement.classList.remove("fun-mode-active")
    }
  }, [isFunMode])

  return (
    <>
      {/* Soft vignette overlay to pull focus toward center content */}
      <div className="vignette-overlay" aria-hidden="true" />

      {/* Custom HUD cursor — hidden while fun mode is active */}
      <Cursor isFunMode={isFunMode} />

      {/* Iron Man background silhouette tribute — active during fun mode */}
      {isFunMode && <HeroSilhouette />}

      {/* Controllable flying craft — only mounted while fun mode is active */}
      {isFunMode && <FunCharacter />}

      {/* Unobtrusive Easter egg toggle button */}
      <EasterEggToggle
        isFunMode={isFunMode}
        onToggle={() => setIsFunMode((prev) => !prev)}
      />
      
      <PageTransition>
        <div className="noise-overlay bg-transparent text-white relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Work />
            <About />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  )
}
