import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import SectionLabel from "@/components/ui/SectionLabel"
import Reveal from "@/components/motion/Reveal"
import DecorativeLines from "@/components/motion/DecorativeLines"
import { personalInfo } from "@/data/personal"

// Stat strings we want to surface visually (exact substrings from achievement text)
const STAT_PATTERNS = [
  /\b(60%)\b/,
  /\b(1\.4s)\b/,
  /\b(80%)\b/,
  /\b(20%)\b/,
  /\b(10%)\b/,
  /\b(30\+)\b/,
]

/** Wrap matched stat substrings in a <mark> styled as stat-callout */
function highlightStats(text) {
  const parts = []
  let remaining = text

  for (const pattern of STAT_PATTERNS) {
    const match = remaining.match(pattern)
    if (match) {
      const idx = remaining.indexOf(match[1])
      if (idx !== -1) {
        parts.push(remaining.slice(0, idx))
        parts.push(
          <mark key={match[1] + idx} className="stat-callout not-italic bg-transparent">
            {match[1]}
          </mark>
        )
        remaining = remaining.slice(idx + match[1].length)
      }
    }
  }
  parts.push(remaining)
  // If nothing matched, parts is just [text] — return the original string directly
  return parts.length === 1 ? text : parts
}

export default function Experience() {
  const { experience, education } = personalInfo

  return (
    <section id="experience" className="relative py-24 bg-neutral-950/40 overflow-hidden">
      <DecorativeLines variant="circuit" className="top-10 -right-[20%] w-[800px] rotate-12 z-0" />
      <Container className="relative z-10">
        <Reveal>
          <SectionLabel number="02">Experience</SectionLabel>
          <Heading className="mb-16">Work Experience</Heading>
        </Reveal>

        {/* Timeline — pb-20 gives generous breathing room between each entry */}
        <div className="relative">
          {experience.map((job, idx) => (
            <Reveal key={job.company} delay={idx * 0.1}>
              <div className="relative pl-10 pb-20 last:pb-0">
                {/* Timeline spine — connects entries with a fading blue line */}
                {idx < experience.length - 1 && (
                  <div
                    className="absolute left-[0.6rem] top-6 bottom-0 w-px"
                    style={{
                      background: "linear-gradient(to bottom, #3B82F6 0%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: "#3B82F6",
                    backgroundColor: "#0a0a0a",
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#3B82F6" }}
                  />
                </div>

                {/* Content card */}
                <div
                  data-fun-target="true"
                  className="rounded-xl border border-neutral-800/80 bg-[#13151c]/90 backdrop-blur-md p-7 card-interactive shadow-lg shadow-black/40"
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {job.role}
                      </h3>
                      <p className="text-blue-400 font-medium text-sm mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-neutral-400 font-mono block">
                        {job.duration}
                      </span>
                      <span className="text-xs text-neutral-500 block mt-0.5">
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Project label */}
                  <p className="text-neutral-400 text-xs mb-5 flex items-center gap-1.5">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                      />
                    </svg>
                    {job.project}
                  </p>

                  {/* Achievement bullets */}
                  <ul className="space-y-3">
                    {job.achievements.map((ach, i) => (
                      <li key={i} className="flex gap-3 text-sm text-neutral-200 leading-relaxed">
                        <span
                          className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-blue-500"
                          aria-hidden="true"
                        />
                        <span>{highlightStats(ach)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education — mt-20 separates it clearly from the timeline above */}
        <Reveal delay={0.2}>
          <div className="mt-20">
            <SectionLabel number="—">Education</SectionLabel>
            {education.map((edu) => (
              <div
                key={edu.institution}
                data-fun-target="true"
                className="rounded-xl border border-neutral-800/80 bg-[#13151c]/90 backdrop-blur-md p-6 mt-5 card-interactive shadow-lg shadow-black/40"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-400 text-sm mt-0.5">{edu.institution}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-neutral-400 font-mono">{edu.duration}</span>
                    <span className="text-xs text-neutral-500 block mt-0.5">{edu.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
