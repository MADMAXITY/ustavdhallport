export default function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tighter ${className}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      UD
    </span>
  )
}
