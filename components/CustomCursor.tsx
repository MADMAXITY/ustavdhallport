"use client"

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only run on pointer (non-touch) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let raf: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      raf = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Pointer state for interactive elements
    const handleEnterInteractive = () => setIsPointer(true)
    const handleLeaveInteractive = () => setIsPointer(false)

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnterInteractive)
      el.addEventListener('mouseleave', handleLeaveInteractive)
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
      })
    }
  }, [visible])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-all duration-150"
        style={{
          width: isPointer ? '6px' : '8px',
          height: isPointer ? '6px' : '8px',
          backgroundColor: isPointer ? '#ff5722' : '#f5f0eb',
          opacity: visible ? 1 : 0,
          willChange: 'transform',
          marginTop: isPointer ? '1px' : '0',
          marginLeft: isPointer ? '1px' : '0',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-all duration-200"
        style={{
          width: isPointer ? '44px' : '40px',
          height: isPointer ? '44px' : '40px',
          border: isPointer ? '1.5px solid rgba(255,87,34,0.8)' : '1px solid rgba(245,240,235,0.35)',
          opacity: visible ? 1 : 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
