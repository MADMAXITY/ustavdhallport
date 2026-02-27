"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { Button } from './ui/button'
import Logo from './Logo'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#'

function ScrambleLink({
  name,
  href,
  onClick,
  className,
}: {
  name: string
  href: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}) {
  const [display, setDisplay] = useState(name)
  const rafRef = useRef(0)

  const scramble = useCallback(() => {
    let frame = 0
    const totalFrames = name.length * 4

    const tick = () => {
      setDisplay(
        name
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (frame > i * 3) return char
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      )
      frame++
      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(tick) as unknown as number
      } else {
        setDisplay(name)
      }
    }

    cancelAnimationFrame(rafRef.current)
    requestAnimationFrame(tick)
  }, [name, rafRef])

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={scramble}
      className={`font-mono text-xs tracking-widest uppercase ${className}`}
    >
      {display}
    </a>
  )
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark/90 backdrop-blur-md border-b border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a
            href="#home"
            className="hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
          >
            <Logo className="h-10 sm:h-12 md:h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <ScrambleLink
                key={item.name}
                name={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="px-4 py-2 text-warm/60 hover:text-warm transition-colors rounded-lg hover:bg-white/5"
              />
            ))}
            <Button
              variant="primary"
              size="sm"
              className="ml-4 font-mono text-xs tracking-widest"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              RESUME
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-warm p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-t border-dark-border">
          <div className="px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="block px-4 py-3 font-mono text-xs tracking-widest uppercase text-warm/60 hover:text-warm hover:bg-white/5 rounded-lg transition-all"
              >
                {item.name}
              </a>
            ))}
            <Button
              variant="primary"
              size="sm"
              className="w-full mt-4 font-mono text-xs tracking-widest"
              onClick={() => {
                window.open('/resume.pdf', '_blank')
                setIsMobileMenuOpen(false)
              }}
            >
              RESUME
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
