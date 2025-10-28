"use client"

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    const numStars = 100
    const maxDistance = 150
    const mouseRadius = 200
    let mouseX = -1000
    let mouseY = -1000

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5
        })
      }
    }

    const drawStar = (star: Star) => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fill()
    }

    const drawLine = (star1: Star, star2: Star, distance: number) => {
      const opacity = 1 - distance / maxDistance
      ctx.beginPath()
      ctx.moveTo(star1.x, star1.y)
      ctx.lineTo(star2.x, star2.y)
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, i) => {
        // Mouse interaction
        const dx = mouseX - star.x
        const dy = mouseY - star.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)

        if (distToMouse < mouseRadius) {
          const force = (mouseRadius - distToMouse) / mouseRadius
          star.vx -= (dx / distToMouse) * force * 0.1
          star.vy -= (dy / distToMouse) * force * 0.1
        }

        // Update position
        star.x += star.vx
        star.y += star.vy

        // Boundary detection with wrapping
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Damping
        star.vx *= 0.99
        star.vy *= 0.99

        // Random drift to keep movement
        star.vx += (Math.random() - 0.5) * 0.02
        star.vy += (Math.random() - 0.5) * 0.02

        // Speed limit
        const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy)
        if (speed > 1) {
          star.vx = (star.vx / speed) * 1
          star.vy = (star.vy / speed) * 1
        }

        drawStar(star)

        // Draw connections
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[j].x - star.x
          const dy = stars[j].y - star.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            drawLine(star, stars[j], distance)
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    resize()
    initStars()
    animate()

    window.addEventListener('resize', () => {
      resize()
      initStars()
    })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#0a0a0a' }}
    />
  )
}
