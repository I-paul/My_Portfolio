import { cn } from "@/utils/cn"

export default function Card({ children, className, interactive = true }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 h-full",
        interactive && "card-interactive",
        className
      )}
    >
      {children}
    </div>
  )
}
