import { cn } from "@/utils/cn"

/**
 * Editorial section label in uppercase monospace.
 * Example: <SectionLabel number="01">Work</SectionLabel>
 * Renders: "01 — Work"
 */
export default function SectionLabel({ number, children, className }) {
  return (
    <div className={cn("section-label mb-4", className)}>
      {number && <span>{number} — </span>}
      {children}
    </div>
  )
}
