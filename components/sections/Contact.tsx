"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ContactForm'
import { SITE_CONFIG } from '@/lib/constants'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="relative py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s <span className="text-primary">Connect</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you have a project in mind, want to collaborate, or simply chat about tech... I&apos;d love to connect.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant="default"
              size="default"
              onClick={() => window.open(`mailto:${SITE_CONFIG.email}`)}
            >
              <Mail size={18} className="mr-2" />
              Email
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => window.open(SITE_CONFIG.linkedin, '_blank')}
            >
              <Linkedin size={18} className="mr-2" />
              LinkedIn
            </Button>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Mail className="text-primary" size={24} />
              <p className="text-sm text-gray-400">Email</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-primary transition-colors">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="text-primary" size={24} />
              <p className="text-sm text-gray-400">Phone</p>
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-white hover:text-primary transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="text-primary" size={24} />
              <p className="text-sm text-gray-400">Location</p>
              <p className="text-white">{SITE_CONFIG.location}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
