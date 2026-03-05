import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Card from "@/components/ui/Card"
import Text from "@/components/ui/Text"
import Badge from "@/components/ui/Badge"
import Reveal from "@/components/motion/Reveal"
import { projects } from "@/data/projects"

export default function Work() {
  return (
    <section id="work" className="py-24">
      <Container>
        <Reveal>
          <Heading className="mb-12">Projects</Heading>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <Card>
                <div className="mb-4">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <Text className="mb-4">{project.description}</Text>
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      View Code →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
