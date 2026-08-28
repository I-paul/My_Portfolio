import { cn } from "@/utils/cn"

// Static lookup prevents Tailwind from purging dynamically generated class names
const colsMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
}

export default function Grid({ columns = 3, className, children }) {
  const lgCols = colsMap[columns] ?? "lg:grid-cols-3"

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6",
        lgCols,
        className
      )}
    >
      {children}
    </div>
  )
}
