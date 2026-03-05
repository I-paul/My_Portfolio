import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PageTransition from "@/components/layout/PageTransition"
import Hero from "@/sections/Hero"
import Work from "@/sections/Work"
import About from "@/sections/About"
import Skills from "@/sections/Skills"
import Contact from "@/sections/Contact"

export default function App() {
  return (
    <PageTransition>
      <div className="bg-black text-white">
        <Navbar />
        <main>
          <Hero />
          <Work />
          <About />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
