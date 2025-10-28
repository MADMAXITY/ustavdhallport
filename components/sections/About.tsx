"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { STATS } from '@/lib/constants'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 lg:mb-16 text-center">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-10 sm:mb-12 lg:mb-16">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I&apos;m a <span className="text-white font-semibold">Backend Engineer</span> specializing in building scalable microservices and cloud-native applications. With 2.5 years of experience at companies like{' '}
                <span className="text-primary font-semibold">NetApp</span> and{' '}
                <span className="text-primary font-semibold">Great Learning</span>, I focus on creating robust, high-performance systems that handle real-world challenges.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                My expertise lies in <span className="text-white font-semibold">Golang</span>,{' '}
                <span className="text-white font-semibold">Node.js</span>, and cloud technologies. I&apos;ve designed systems serving 10,000+ concurrent users, optimized APIs reducing response times by 45%, and containerized services using Docker and Kubernetes.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source, or diving deep into system design patterns.
              </p>
            </div>

            {/* Right Content - Profile Image */}
            <div className="flex justify-center">
              <Card className="p-0 overflow-hidden max-w-md w-full">
                <div className="relative aspect-square">
                  <Image
                    src="/images/profile.jpg"
                    alt="Utsav Dhall"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/90 to-transparent p-6">
                    <p className="text-xl font-semibold text-white">Hey, it&apos;s me! 👋</p>
                    <p className="text-sm text-gray-300 mt-1">Software Engineer 2 @ NetApp</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-4 sm:p-6 text-center hover:scale-105 transition-transform">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
