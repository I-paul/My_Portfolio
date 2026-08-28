import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PageTransition from "@/components/layout/PageTransition"
import Cursor from "@/components/ui/Cursor"
import Hero from "@/sections/Hero"
import Experience from "@/sections/Experience"
import Work from "@/sections/Work"
import About from "@/sections/About"
import Skills from "@/sections/Skills"
import Contact from "@/sections/Contact"

export default function App() {
  return (
    <>
      {/* Custom cursor — only activates on pointer:fine devices */}
      <Cursor />
      
      <PageTransition>
        <div className="noise-overlay bg-transparent text-white">
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
