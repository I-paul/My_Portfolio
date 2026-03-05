import Container from "@/components/ui/Container"
import Text from "@/components/ui/Text"
import { personalInfo } from "@/data/personal"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-12 bg-neutral-950">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Text className="text-neutral-500! text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </Text>
          <div className="flex gap-6">
            <a 
              href={personalInfo.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
            <a 
              href={personalInfo.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a 
              href={personalInfo.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              Twitter
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
