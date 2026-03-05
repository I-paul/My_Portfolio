import { personalInfo } from "@/data/personal"

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-center py-6">
          <div className="hidden md:flex gap-8">
            <a href="#work" className="text-neutral-400 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#about" className="text-neutral-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" className="text-neutral-400 hover:text-white transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
