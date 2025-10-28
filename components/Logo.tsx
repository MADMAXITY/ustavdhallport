import Image from 'next/image'

export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Utsav Dhall"
      width={120}
      height={40}
      className={className}
      priority
    />
  )
}
