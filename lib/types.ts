export interface NavItem {
  name: string
  href: string
}

export interface ExperienceItem {
  id: number
  role: string
  company: string
  location: string
  period: string
  description: string[]
  tags: string[]
}

export interface ProjectItem {
  id: number
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
}

export interface StatItem {
  label: string
  value: string
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}
