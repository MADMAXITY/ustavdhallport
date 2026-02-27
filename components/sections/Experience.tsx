"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar } from 'lucide-react'
import { EXPERIENCE } from '@/lib/constants'

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section heading */}
          <div className="relative text-center mb-12 sm:mb-16 lg:mb-20">
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 10rem)', color: 'rgba(255,255,255,0.025)' }}
              aria-hidden
            >
              02
            </span>
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
              Work <span className="text-primary">Experience</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 sm:left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #222 10%, #222 90%, transparent)' }}
            />

            <div className="space-y-0">
              {EXPERIENCE.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative pl-14 sm:pl-16 pb-12 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 sm:left-2 top-1 flex items-center justify-center">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-primary bg-dark flex items-center justify-center font-mono text-xs font-bold text-primary timeline-dot"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-xl border border-dark-border overflow-hidden group hover:border-primary/25 transition-all duration-400"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    {/* Card header */}
                    <div
                      className="px-5 sm:px-6 py-4 sm:py-5 border-b border-dark-border"
                      style={{ background: 'linear-gradient(to right, rgba(255,87,34,0.06), transparent)' }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-warm leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-primary font-mono text-sm font-semibold mt-1">{exp.company}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 text-xs text-warm/40 font-mono shrink-0">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-5 sm:px-6 py-4 sm:py-5">
                      <ul className="space-y-2.5 mb-5">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-warm/65 text-sm leading-relaxed">
                            <span className="text-primary mt-0.5 flex-shrink-0 font-mono">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-dark-border text-warm/50 hover:border-primary/40 hover:text-primary transition-all duration-200"
                            style={{ background: 'rgba(255,87,34,0.04)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
