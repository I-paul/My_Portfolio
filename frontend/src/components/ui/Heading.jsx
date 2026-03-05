import { cn } from "@/utils/cn"
import TextFlow from "../motion/TextSmooth"
const sizes = {
  xl: "text-5xl md:text-7xl font-semibold",
  lg: "text-4xl md:text-5xl font-semibold",
  md: "text-2xl md:text-3xl font-medium",
  sm: "text-xl font-medium",
}

export default function Heading({ as: Tag = "h2", size = "lg", className, children }) {
  return (
    <Tag className={cn(sizes[size], "tracking-tight", className)}>
      {children}
    </Tag>
  )
}
