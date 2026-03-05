import { cn } from "@/utils/cn"

export default function Grid({ columns = 3, className, children }) {
  return (
    <div
      className={cn(
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`,
        className
      )}
    >
      {children}
    </div>
  )
}
