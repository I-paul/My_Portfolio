import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Text from "@/components/ui/Text"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import { personalInfo } from "@/data/personal"
import TextFlow from "../components/motion/TextSmooth"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <Container>
        <Reveal>
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="text-neutral-400">Hi, I'm</span>
            </div>
            <Heading as="h1" size="xl" className="mb-6">
              {personalInfo.name}
            </Heading>
            <Heading as="h2" size="lg" className="mb-6 text-neutral-300 w-250">
              {personalInfo.title}
            </Heading>
            <Text className="mb-1 text-xl max-w-2xl">
              {personalInfo.location}
            </Text>
            <Text className="mb-8 text-lg max-w-2xl">
              {personalInfo.bio}
            </Text>
            <div className="flex gap-4">
              <Button onClick={() => window.location.href = '#contact'}>
                Get in touch
              </Button>
              <Button variant="outline" onClick={() => window.open(personalInfo.resume, '_blank')}>
                View Resume
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
