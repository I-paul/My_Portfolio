import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Text from "@/components/ui/Text"
import Card from "@/components/ui/Card"
import Reveal from "@/components/motion/Reveal"
import { personalInfo } from "@/data/personal"

export default function About() {
  const highlights = [
    {
      title: "Experience",
      description: "Building modern web applications with a focus on performance and user experience",
    },
    {
      title: "Passion",
      description: "Continuously learning new technologies and best practices in web development",
    },
    {
      title: "Approach",
      description: "Writing clean, maintainable code with attention to detail and scalability",
    },
  ]

  return (
    <section id="about" className="py-24 bg-neutral-950/50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Heading className="mb-12 text-center">About Me</Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {highlights.map((item, index) => (
              <Reveal key={index}>
                <Card>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <Text className="text-neutral-300!">{item.description}</Text>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
