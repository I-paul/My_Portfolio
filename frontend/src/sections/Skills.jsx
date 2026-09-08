import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import SectionLabel from "@/components/ui/SectionLabel"
import Reveal from "@/components/motion/Reveal"
import Stagger from "@/components/motion/Stagger"
import { skills } from "@/data/skills"

// Simple icon map for common skills
const SKILL_ICONS = {
  Python: "🐍",
  Java: "☕",
  JavaScript: "JS",
  SQL: "🗄",
  React: "⚛",
  "Node.js": "🟢",
  Express: "⚡",
  FastAPI: "⚡",
  "Tailwind CSS": "🎨",
  Firebase: "🔥",
  "Framer Motion": "✦",
  PyTorch: "🔦",
  OpenCV: "👁",
  PostgreSQL: "🐘",
  MongoDB: "🍃",
  "Firebase Firestore": "🔥",
  Git: "⎇",
  GitHub: "⬡",
  Docker: "🐳",
  Postman: "📮",
  Vercel: "△",
  "VS Code": "🔷",
  "RESTful APIs": "🔗",
}

function SkillCategory({ category, items }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold text-neutral-300 mb-4 flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"
          aria-hidden="true"
        />
        {category}
      </h3>
      <Stagger
        staggerDelay={0.05}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => (
          <span key={skill} data-fun-target="true" className="skill-chip">
            {SKILL_ICONS[skill] && (
              <span aria-hidden="true" className="text-xs">{SKILL_ICONS[skill]}</span>
            )}
            {skill}
          </span>
        ))}
      </Stagger>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <Container>
        <Reveal>
          <SectionLabel number="05">Skills</SectionLabel>
          <Heading className="mb-14">Technical Skills</Heading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {skills.map((group) => (
            <Reveal key={group.category}>
              <SkillCategory category={group.category} items={group.items} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}