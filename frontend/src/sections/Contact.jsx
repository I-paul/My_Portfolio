import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import Text from "@/components/ui/Text"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import Reveal from "@/components/motion/Reveal"
import { personalInfo } from "@/data/personal"

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Heading className="mb-6">Get in Touch</Heading>
          </Reveal>
          <Reveal>
            <Badge className="mb-8">{personalInfo.availability}</Badge>
          </Reveal>
          <Reveal>
            <Text className="mb-8 text-lg">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </Text>
          </Reveal>
          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="primary"
                onClick={() => window.location.href = `mailto:${personalInfo.email}`}
              >
                Send Email
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(personalInfo.resume, '_blank')}
              >
                View Resume
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex gap-6 justify-center">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
