import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Badge from "@/components/ui/Badge"
import SectionLabel from "@/components/ui/SectionLabel"
import Stagger from "@/components/motion/Stagger"
import Reveal from "@/components/motion/Reveal"
import DecorativeLines from "@/components/motion/DecorativeLines"
import { projects } from "@/data/projects"

/* ─── SVG thumbnail icons ─────────────────────────────────────────────── */

function CameraIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-blue-400/60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z"
      />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-blue-400/60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-blue-400/60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}

function FaceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-blue-400/60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden="true"
    >
      {/* Face outline */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C8.134 2 5 5.134 5 9c0 2.386 1.11 4.51 2.845 5.88C6.67 15.6 6 16.72 6 18v1a1 1 0 001 1h10a1 1 0 001-1v-1c0-1.28-.67-2.4-1.845-3.12C17.89 13.51 19 11.386 19 9c0-3.866-3.134-7-7-7z"
      />
      {/* Eyes */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5h.01M14.5 9.5h.01" />
      {/* Scan lines */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h.5M16.5 6H17M7 12h.5M16.5 12H17" />
    </svg>
  )
}

const ICONS = {
  camera: CameraIcon,
  smile: SmileIcon,
  mail: MailIcon,
  face: FaceIcon,
}

/** Generated SVG placeholder thumbnail — never shows a broken image */
function PlaceholderThumb({ icon, initials }) {
  const Icon = ICONS[icon] ?? CameraIcon

  return (
    <div
      className="project-thumb flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 30% 30%, rgba(59,130,246,0.12) 0%, transparent 70%), linear-gradient(135deg, #111111 0%, #0d1117 100%)",
      }}
      aria-hidden="true"
    >
      {/* Grid dot pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`dot-${initials}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#3B82F6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dot-${initials})`} />
      </svg>

      {/* Icon + initials */}
      <div className="relative flex flex-col items-center gap-3">
        <Icon />
        <span
          className="font-display text-2xl font-semibold tracking-widest"
          style={{ color: "rgba(99,155,255,0.3)" }}
        >
          {initials}
        </span>
      </div>
    </div>
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
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden card-interactive group flex flex-col h-full">
      {/* Thumbnail */}
      {project.placeholder ? (
        <PlaceholderThumb
          icon={project.placeholderIcon}
          initials={project.placeholderInitials}
        />
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
        <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-1">
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
      <DecorativeLines variant="bezier" className="bottom-0 -left-[10%] w-[1000px] text-emerald-500/10 -rotate-6 z-0" />
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
