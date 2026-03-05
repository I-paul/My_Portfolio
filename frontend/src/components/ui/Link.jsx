import { cn } from "@/utils/cn"

export default function Link({ className, ...props }) {
  return (
    <a
      className={cn(
        "transition-colors duration-300 hover:text-white text-neutral-400",
        className
      )}
      {...props}
    />
  )
}
