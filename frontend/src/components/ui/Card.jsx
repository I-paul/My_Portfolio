import { cn } from "@/utils/cn"

export default function Card({ children, className, interactive = true, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-800/80 bg-[#13151c]/90 backdrop-blur-md p-6 h-full shadow-lg shadow-black/40",
        interactive && "card-interactive",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
