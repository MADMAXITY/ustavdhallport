"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PROJECTS } from '@/lib/constants'

const BENTO_CLASSES = [
  'lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3', // large: 2×2
  'lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2', // small
  'lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3', // small
  'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4', // small
  'lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4', // small
  'lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4', // small
]

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
}

function ProjectCard({ project, index, isFeatured }: { project: Project; index: number; isFeatured: boolean }) {
  return (
    <div
      className="relative group h-full overflow-hidden rounded-xl border border-dark-border hover:border-primary/30 transition-all duration-400"
      style={{
        background: 'rgba(255,255,255,0.025)',
        minHeight: isFeatured ? '280px' : '140px',
      }}
    >
      {/* Index number watermark */}
      <span
        className="absolute top-3 right-4 font-mono font-black text-5xl sm:text-6xl leading-none select-none pointer-events-none"
        style={{ color: 'rgba(255,87,34,0.06)' }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Default state: title + tags */}
      <div className="p-5 sm:p-6 h-full flex flex-col">
        <h3 className={`font-bold text-warm leading-tight mb-3 ${isFeatured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
          {project.title}
        </h3>

        {/* Description — visible in featured, revealed on hover for others */}
        <p
          className={`text-warm/55 text-sm leading-relaxed mb-4 flex-1 transition-all duration-300 ${
            isFeatured
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden'
          }`}
        >
          {project.description}
        </p>

        <div className={`flex flex-wrap gap-2 mt-auto ${!isFeatured ? 'group-hover:mt-2' : ''}`}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-dark-border text-warm/50 group-hover:border-primary/30 group-hover:text-primary/80 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(255,87,34,0.06), transparent 60%)' }}
      />
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
              03
            </span>
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
              Selected <span className="text-primary">Work</span>
            </h2>
            <p className="text-warm/40 text-sm font-mono mt-3 tracking-wide">hover to explore</p>
          </div>

          {/* Bento grid — mobile: single col, tablet: 2 cols, desktop: 3 cols bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-4">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                className={BENTO_CLASSES[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isFeatured={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
