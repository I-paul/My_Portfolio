export default function Card({ children }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 h-full">
      {children}
    </div>
  )
}
