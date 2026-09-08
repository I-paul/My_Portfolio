import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import SectionLabel from "@/components/ui/SectionLabel"
import Reveal from "@/components/motion/Reveal"
import Stagger from "@/components/motion/Stagger"
import { personalInfo } from "@/data/personal"

const highlights = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Full-Stack Engineering",
    description:
      "Building end-to-end applications with React on the frontend and Node.js, FastAPI, or Express on the backend — with a focus on clean APIs and maintainable architecture.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    title: "AI/ML Integration",
    description:
      "Studying B.Tech in AI and Machine Learning, with hands-on experience in real-time object tracking (PyTorch + OpenCV) and face-recognition systems deployed in production.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Performance-Driven",
    description:
      "Optimized a newsletter platform that cut load time by 1.4s and boosted UI responsiveness by 60%. Reducing query latency and bundle size isn't an afterthought — it's part of the design.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-neutral-950/50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionLabel number="04">About</SectionLabel>
            <Heading className="mb-8">About Me</Heading>
          </Reveal>

          {/* Real bio paragraph */}
          <Reveal delay={0.1}>
            <p className="text-neutral-200 text-base md:text-lg leading-relaxed max-w-3xl mb-14">
              {personalInfo.bio} Currently pursuing a B.Tech in Artificial Intelligence and Machine
              Learning at St. Joseph&apos;s College of Engineering (Chennai), I&apos;ve shipped backend
              systems at Slate Technologies and optimized production web apps at Frost &amp;
              Sullivan — always with measurable impact on performance and reliability.
            </p>
          </Reveal>

          {/* Highlight cards */}
          <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                data-fun-target="true"
                className="rounded-xl border border-neutral-800/80 bg-[#13151c]/90 backdrop-blur-md p-6 h-full card-interactive shadow-lg shadow-black/40"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-blue-400"
                  style={{ background: "rgba(59,130,246,0.12)" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
