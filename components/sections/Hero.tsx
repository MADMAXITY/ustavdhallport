"use client"

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TERMINAL_SEQUENCE = [
  { type: 'command', text: '$ whoami', delay: 600 },
  { type: 'output', text: 'Utsav Dhall  —  Software Engineer 2 @ NetApp', delay: 120 },
  { type: 'gap', text: '', delay: 400 },
  { type: 'command', text: '$ cat tech-stack.txt', delay: 600 },
  { type: 'output', text: 'Golang · Node.js · Kubernetes · AWS · Docker', delay: 120 },
  { type: 'gap', text: '', delay: 400 },
  { type: 'command', text: '$ ./stats --career', delay: 600 },
  { type: 'output-success', text: '✓  10,000+ concurrent users handled', delay: 180 },
  { type: 'output-success', text: '✓  45% API response time improvement', delay: 180 },
  { type: 'output-success', text: '✓  40% infrastructure cost reduction', delay: 180 },
  { type: 'gap', text: '', delay: 200 },
]

type LineType = 'command' | 'output' | 'output-success' | 'gap'

interface TerminalLine {
  type: LineType
  text: string
}

function MagneticButton({ children, className, onClick, variant, size }: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'default'
  size?: 'lg' | 'default' | 'sm'
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 90) {
      const strength = (90 - dist) / 90
      el.style.transform = `translate(${dx * strength * 0.35}px, ${dy * strength * 0.35}px)`
      el.style.transition = 'transform 0.1s ease'
    }
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
      <Button variant={variant} size={size} onClick={onClick} className="w-full">
        {children}
      </Button>
    </div>
  )
}

export default function Hero() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentTyping, setCurrentTyping] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const sleep = (ms: number) => new Promise<void>((res) => {
      timeoutId = setTimeout(res, ms)
    })

    async function run() {
      await sleep(800)
      if (cancelled) return

      for (const item of TERMINAL_SEQUENCE) {
        if (cancelled) return

        if (item.type === 'gap') {
          setLines(prev => [...prev, { type: 'gap', text: '' }])
          await sleep(item.delay)
          continue
        }

        if (item.type === 'command') {
          // Type character by character
          for (let i = 0; i <= item.text.length; i++) {
            if (cancelled) return
            setCurrentTyping(item.text.slice(0, i))
            await sleep(40 + Math.random() * 30)
          }
          await sleep(item.delay)
          setLines(prev => [...prev, { type: item.type as LineType, text: item.text }])
          setCurrentTyping('')
        } else {
          setLines(prev => [...prev, { type: item.type as LineType, text: item.text }])
          await sleep(item.delay)
        }
      }
      if (!cancelled) setDone(true)
    }

    run()
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      {/* Large background name */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-mono font-black text-[12vw] leading-none tracking-tighter"
          style={{ color: 'rgba(255,255,255,0.018)', whiteSpace: 'nowrap' }}
        >
          UTSAV DHALL
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl mx-auto z-10"
      >
        {/* Terminal window */}
        <div
          className="rounded-xl overflow-hidden border border-dark-border shadow-2xl"
          style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)' }}
        >
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-border" style={{ background: '#111' }}>
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-warm/30 flex-1 text-center select-none">
              utsav@dhall: ~
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed min-h-[280px]">
            {lines.map((line, i) => {
              if (line.type === 'gap') return <div key={i} className="h-2" />
              if (line.type === 'command') {
                return (
                  <div key={i} className="text-warm/90">
                    {line.text}
                  </div>
                )
              }
              if (line.type === 'output-success') {
                return (
                  <div key={i} className="text-primary ml-2">
                    {line.text}
                  </div>
                )
              }
              return (
                <div key={i} className="text-warm/50 ml-2">
                  {line.text}
                </div>
              )
            })}

            {/* Currently typing line */}
            {currentTyping && (
              <div className="text-warm/90">
                {currentTyping}
                <span className="terminal-cursor" />
              </div>
            )}

            {/* Final blinking cursor */}
            {done && (
              <div className="text-warm/90 mt-1">
                <span className="text-primary/60">$</span>{' '}
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8"
        >
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('#projects')}
            className="group"
          >
            View My Work
            <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={18} />
          </MagneticButton>

          <MagneticButton
            variant="default"
            size="lg"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="mr-2" size={18} />
            Download Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-warm/30 cursor-pointer hover:text-warm/60 transition-colors"
          onClick={() => scrollToSection('#about')}
        >
          <ArrowDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  )
}
