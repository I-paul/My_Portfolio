import Container from "@/components/ui/Container"
import { personalInfo } from "@/data/personal"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/60 py-10 bg-neutral-950">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          {/* Personality microcopy — emerald, monospace, low-key */}
          <p
            className="text-xs font-mono"
            style={{ color: "rgba(16,185,129,0.45)" }}
          >
            console.log(&quot;thanks for scrolling this far 👋&quot;)
          </p>

          {/* Only real social links — no Twitter */}
          <div className="flex gap-6">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              aria-label="Israel Paul on GitHub"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              aria-label="Israel Paul on LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
