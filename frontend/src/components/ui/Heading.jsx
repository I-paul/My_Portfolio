import { cn } from "@/utils/cn"

const sizes = {
  xl: "text-5xl md:text-7xl font-semibold tracking-tight",
  lg: "text-3xl md:text-4xl font-semibold tracking-tight",
  md: "text-2xl md:text-3xl font-medium tracking-tight",
  sm: "text-xl font-medium",
}

export default function Heading({ as, size = "lg", className, children }) {
  const Tag = as ?? "h2"
  return (
    <Tag className={cn("font-display", sizes[size], className)}>
      {children}
    </Tag>
  )
}
