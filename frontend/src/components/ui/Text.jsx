import { cn } from "@/utils/cn"

export default function Text({ className, children }) {
  return (
    <p className={cn("text-base text-neutral-400 leading-relaxed", className)}>
      {children}
    </p>
  )
}
