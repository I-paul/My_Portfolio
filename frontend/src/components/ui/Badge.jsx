import { cn } from "@/utils/cn"

const variants = {
  default: "bg-neutral-900 text-neutral-300 border-neutral-800",
  accent: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  success: "bg-emerald-900/30 text-emerald-400 border-emerald-700/40",
}

export default function Badge({ className, variant = "default", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border",
        variants[variant] ?? variants.default,
        className
      )}
    >
      {children}
    </span>
  )
}
