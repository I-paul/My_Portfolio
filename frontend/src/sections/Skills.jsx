import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Magnetic from "@/components/ui/Magnetic"
import Card from "@/components/ui/Card"
import Text from "@/components/ui/Text"
import Reveal from "@/components/motion/Reveal"
import { skills } from "@/data/skills"

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <Container>
        <Reveal>
          <Heading className="mb-12">Skills</Heading>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-around">
          {skills.map((skillGroup) => (
            <Reveal key={skillGroup.category}>
              <h3 className="text-lg font-medium mb-4 ">{skillGroup.category}</h3>
              <Card>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill}>
                      <Text className="text-neutral-300! m-0!">{skill}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
