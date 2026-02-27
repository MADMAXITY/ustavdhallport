"use client"

import { Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'
import Logo from '@/components/Logo'

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="relative border-t border-dark-border" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo className="h-12 sm:h-14 md:h-16 w-auto" />
            </div>
            <p className="text-warm/40 text-sm leading-relaxed font-mono">
              Backend Engineer crafting scalable microservices and cloud-native solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-warm/30 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className="font-mono text-xs tracking-wider text-warm/40 hover:text-primary transition-colors"
                  >
                    {item.name.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-warm/30 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm/40 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-warm/40 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-xs text-warm/30 text-center md:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-warm/30 flex items-center gap-1.5">
            Built with
            <span className="text-primary animate-pulse">♥</span>
            using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
