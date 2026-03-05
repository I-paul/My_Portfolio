import { cn } from "@/utils/cn"

const variants = {
  primary: "bg-white text-black hover:bg-neutral-200",
  outline: "border border-neutral-700 hover:bg-neutral-900",
  ghost: "hover:text-white",
}

export default function Button({ variant = "primary", className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
