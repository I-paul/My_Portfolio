import { cn } from "@/utils/cn"

export default function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-300 border border-neutral-800",
        className
      )}
    >
      {children}
    </span>
  )
}
