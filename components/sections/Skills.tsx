"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code2, 
  Database, 
  Cloud, 
  Layers, 
  Wrench,
  Server
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SKILLS } from '@/lib/constants'

const categoryIcons = {
  'Languages': Code2,
  'Backend Frameworks': Server,
  'DevOps & Cloud': Cloud,
  'Databases': Database,
  'Architecture & Patterns': Layers,
  'Tools & Technologies': Wrench,
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-dark-lighter/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 lg:mb-16 text-center">
            Technical <span className="text-primary">Skills</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(SKILLS).map(([category, skills], index) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons]
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                        <Icon className="text-primary" size={20} />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-dark border border-dark-border rounded-lg text-gray-300 hover:border-primary hover:text-white transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
