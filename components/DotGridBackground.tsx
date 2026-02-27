"use client"

import { useEffect, useRef } from 'react'

export default function DotGridBackground() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#080808' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100" />

      {/* Mouse-reactive glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,87,34,0.07) 0%, transparent 70%)',
          top: 0,
          left: 0,
          willChange: 'transform',
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Static ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(255,87,34,0.04) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,87,34,0.04) 0%, transparent 60%)',
          animationDelay: '1.5s',
        }}
      />
    </div>
  )
}
