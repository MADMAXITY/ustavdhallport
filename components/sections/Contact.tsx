"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ContactForm'
import { SITE_CONFIG } from '@/lib/constants'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section heading */}
          <div className="relative text-center mb-10 sm:mb-12 lg:mb-16">
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 10rem)', color: 'rgba(255,255,255,0.025)' }}
              aria-hidden
            >
              05
            </span>
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Let&apos;s <span className="text-primary">Connect</span>
            </h2>
            <p className="text-base sm:text-lg text-warm/50 max-w-2xl mx-auto px-4">
              Whether you have a project in mind, want to collaborate, or simply chat about tech—I&apos;d love to connect.
            </p>
          </div>

          {/* Quick contact buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Button
              variant="default"
              size="default"
              onClick={() => window.open(`mailto:${SITE_CONFIG.email}`)}
              className="font-mono text-xs tracking-widest"
            >
              <Mail size={16} className="mr-2" />
              EMAIL ME
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => window.open(SITE_CONFIG.linkedin, '_blank')}
              className="font-mono text-xs tracking-widest"
            >
              <Linkedin size={16} className="mr-2" />
              LINKEDIN
            </Button>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Contact info grid */}
          <div className="mt-10 sm:mt-12 lg:mt-16 grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: SITE_CONFIG.email,
                href: `mailto:${SITE_CONFIG.email}`,
              },
              {
                icon: Phone,
                label: 'Phone',
                value: SITE_CONFIG.phone,
                href: `tel:${SITE_CONFIG.phone}`,
              },
              {
                icon: MapPin,
                label: 'Location',
                value: SITE_CONFIG.location,
                href: null,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex flex-col items-center gap-2 group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-dark-border group-hover:border-primary/30 transition-colors duration-300"
                  style={{ background: 'rgba(255,87,34,0.06)' }}
                >
                  <Icon className="text-primary" size={18} />
                </div>
                <p className="text-xs font-mono text-warm/40 tracking-widest uppercase">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-warm/70 hover:text-primary transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-warm/70">{value}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
