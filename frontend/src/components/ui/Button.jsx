import { cn } from "@/utils/cn"

const variants = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  outline:
    "border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  ghost:
    "text-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
}

export default function Button({ variant = "primary", className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
