"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Database, Cloud, Layers, Wrench, Server } from 'lucide-react'
import { SKILLS } from '@/lib/constants'

const CATEGORY_ICONS = {
  'Languages': Code2,
  'Backend Frameworks': Server,
  'DevOps & Cloud': Cloud,
  'Databases': Database,
  'Architecture & Patterns': Layers,
  'Tools & Technologies': Wrench,
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-7xl mx-auto">
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
              04
            </span>
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
              Technical <span className="text-primary">Skills</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Object.entries(SKILLS).map(([category, skills], catIndex) => {
              const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <div
                    className="h-full rounded-xl border border-dark-border p-5 sm:p-6 group hover:border-primary/25 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-dark-border group-hover:border-primary/30 transition-colors duration-300"
                        style={{ background: 'rgba(255,87,34,0.07)' }}
                      >
                        <Icon className="text-primary" size={16} />
                      </div>
                      <h3 className="text-sm font-mono font-semibold text-warm/80 tracking-wide uppercase">
                        {category}
                      </h3>
                    </div>

                    {/* Skills — staggered reveal */}
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: catIndex * 0.1 + skillIndex * 0.05,
                          }}
                          className="px-2.5 py-1 text-xs font-mono rounded-md border border-dark-border text-warm/50 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
