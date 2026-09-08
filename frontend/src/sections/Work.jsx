import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Badge from "@/components/ui/Badge"
import SectionLabel from "@/components/ui/SectionLabel"
import Stagger from "@/components/motion/Stagger"
import Reveal from "@/components/motion/Reveal"
import DecorativeLines from "@/components/motion/DecorativeLines"
import { projects } from "@/data/projects"

/* ─── Project thumbnail gradients — plain dual-accent blend, no icons ───────── */

const PROJECT_GRADIENTS = {
  4: "linear-gradient(135deg, rgba(59, 130, 246, 0.32) 0%, rgba(15, 23, 42, 0.95) 52%, rgba(6, 95, 70, 0.28) 100%)",
  2: "radial-gradient(ellipse at 80% 20%, rgba(16, 185, 129, 0.3) 0%, rgba(13, 19, 33, 0.92) 55%, rgba(59, 130, 246, 0.24) 100%)",
  1: "linear-gradient(225deg, rgba(59, 130, 246, 0.3) 0%, rgba(10, 20, 25, 0.94) 50%, rgba(6, 95, 70, 0.34) 100%)",
  3: "radial-gradient(circle at 20% 80%, rgba(6, 95, 70, 0.32) 0%, rgba(15, 23, 42, 0.92) 55%, rgba(59, 130, 246, 0.28) 100%)",
}

/** Clean, smooth gradient blend of electric blue and dark emerald — no icons or glyphs */
function PlaceholderThumb({ id }) {
  const gradient =
    PROJECT_GRADIENTS[id] ??
    "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(6, 95, 70, 0.3) 100%)"

  return (
    <div
      className="project-thumb w-full"
      style={{ background: gradient }}
      aria-hidden="true"
    />
  )
}

/* ─── Project card ──────────────────────────────────────────────────────── */

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  )
}

function ProjectCard({ project }) {
  return (
    <div
      data-fun-target="true"
      className="rounded-xl border border-neutral-800/80 bg-[#13151c]/90 backdrop-blur-md overflow-hidden card-interactive group flex flex-col h-full shadow-lg shadow-black/40"
    >
      {/* Thumbnail */}
      {project.placeholder ? (
        <PlaceholderThumb id={project.id} />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full aspect-video object-cover rounded-t-xl"
          style={{ aspectRatio: "16/9" }}
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action links */}
        <div className="flex gap-4 pt-4 border-t border-neutral-800/60">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-blue-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <GitHubIcon />
              View Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-blue-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function Work() {
  return (
    <section id="work" className="relative py-24 overflow-hidden">
      <DecorativeLines variant="bezier" className="bottom-0 -left-[10%] w-[1000px] -rotate-6 z-0" />
      <Container className="relative z-10">
        <Reveal>
          <SectionLabel number="03">Projects</SectionLabel>
          <Heading className="mb-12">Selected Work</Heading>
        </Reveal>

        <Stagger staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
