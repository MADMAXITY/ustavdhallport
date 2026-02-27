"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { STATS } from '@/lib/constants'

function parseStatValue(val: string): { num: number; suffix: string; isDecimal: boolean } {
  const match = val.match(/^(\d+\.?\d*)(.*)$/)
  if (!match) return { num: 0, suffix: val, isDecimal: false }
  return {
    num: parseFloat(match[1]),
    suffix: match[2],
    isDecimal: match[1].includes('.'),
  }
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState('0')
  const { num, suffix, isDecimal } = parseStatValue(value)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * num
      setDisplay((isDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, num, suffix, isDecimal])

  return <span>{display}</span>
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section heading with number label */}
          <div className="relative text-center mb-10 sm:mb-12 lg:mb-16">
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 10rem)', color: 'rgba(255,255,255,0.025)' }}
              aria-hidden
            >
              01
            </span>
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
              About <span className="text-primary">Me</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-10 sm:mb-12 lg:mb-16">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-warm/70 leading-relaxed">
                I&apos;m a <span className="text-warm font-semibold">Backend Engineer</span> specializing in building scalable microservices and cloud-native applications. With 2.5 years of experience at companies like{' '}
                <span className="text-primary font-semibold font-mono">NetApp</span> and{' '}
                <span className="text-primary font-semibold font-mono">Great Learning</span>, I focus on creating robust, high-performance systems that handle real-world challenges.
              </p>

              <p className="text-base sm:text-lg text-warm/70 leading-relaxed">
                My expertise lies in <span className="text-warm font-mono font-semibold">Golang</span>,{' '}
                <span className="text-warm font-mono font-semibold">Node.js</span>, and cloud technologies. I&apos;ve designed systems serving 10,000+ concurrent users, optimized APIs reducing response times by 45%, and containerized services using Docker and Kubernetes.
              </p>

              <p className="text-base sm:text-lg text-warm/70 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source, or diving deep into system design patterns.
              </p>
            </div>

            {/* Right Content - Profile Image */}
            <div className="flex justify-center">
              <div className="relative max-w-md w-full rounded-xl overflow-hidden border border-dark-border group">
                <div className="relative aspect-square">
                  <Image
                    src="/images/profile.jpg"
                    alt="Utsav Dhall"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-lg font-semibold text-warm">Hey, it&apos;s me! 👋</p>
                    <p className="text-sm text-warm/60 mt-1 font-mono">Software Engineer 2 @ NetApp</p>
                  </div>
                </div>
                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255,87,34,0.3)' }}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid — with count-up */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <div
                  className="p-4 sm:p-6 text-center rounded-xl border border-dark-border group hover:border-primary/30 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <CountUp value={stat.value} inView={inView} />
                  </div>
                  <div className="text-xs sm:text-sm text-warm/50 font-mono">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
