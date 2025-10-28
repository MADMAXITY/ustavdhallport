export const SITE_CONFIG = {
  name: "Utsav Dhall",
  title: "Utsav Dhall - Backend Engineer",
  description: "Backend Engineer specializing in scalable microservices and cloud-native applications",
  email: "utsdhall@gmail.com",
  phone: "+91 6387421691",
  location: "Bengaluru, India",
  linkedin: "https://linkedin.com/in/utsav-dhall",
}

export const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export const EXPERIENCE = [
  {
    id: 1,
    role: "Software Engineer 2",
    company: "NetApp",
    location: "Bangalore",
    period: "Apr 2025 - Present",
    description: [
      "Designed REST APIs for certificate lifecycle management (Self-signed, CA signed) and used Traefik reverse proxy for persistent certificate storage",
      "Leveraged Kubernetes Config to manage service (M2M) tokens to communicate with other microservices",
      "Upgraded Libraries in microservices to fix critical security vulnerabilities as reported by BlackDuck scans to stay compliant with best security practices",
      "Designed and implemented a Golang microservice for multi-cloud credential management and used MySQL paired with encryption to store credentials securely",
      "Used Docker named volumes to share data between different containers",
      "Integrated backend with cloud provider metadata services (AWS, Azure, GCP) to fetch instance-specific identity data",
      "Facilitated logging using Elasticsearch and Kibana, configuring Kibana Index for real-time log streaming and searchable logs to help with debugging",
      "Supported CRUD operations for client credentials with validation and encryption"
    ],
    tags: ["Golang", "Kubernetes", "Docker", "AWS", "Azure", "GCP", "MySQL", "ELK Stack"]
  },
  {
    id: 2,
    role: "Software Development Engineer",
    company: "Great Learning",
    location: "Bangalore",
    period: "Aug 2024 - Apr 2025",
    description: [
      "Developed scalable visa processing system using Node.js, reducing API response times by 45% through optimized ORM queries and caching strategies",
      "Integrated Amazon SQS to asynchronously notify users of document approval/rejection and alert experts for review, improving processing efficiency and reducing notification delays",
      "Containerized services using Docker and orchestrated with Kubernetes",
      "Used Chain of Responsibility pattern for multi-step document validation, improving validation accuracy and reducing processing time by 20%",
      "Developed automated document compression pipeline using Lambda and S3 triggers, processing 15K+ files/month",
      "Optimized PostgreSQL database schema for high-throughput document processing"
    ],
    tags: ["Node.js", "PostgreSQL", "AWS SQS", "Lambda", "S3", "Docker", "Kubernetes"]
  },
  {
    id: 3,
    role: "Software Development Engineer",
    company: "MountBlue Technologies",
    location: "Bangalore (onsite at Great Learning)",
    period: "Jul 2023 - Jul 2024",
    description: [
      "Built high-performance quiz engine using Java Spring Boot, handling 10,000+ concurrent users",
      "Integrated malware scanning for file uploads using AWS Lambda-triggered antivirus scans, quarantining infected files before backend processing, blocking 120+ malicious files monthly",
      "Implemented Singleton pattern for AWS S3 client initialization, reducing connection overhead by 40% and improving API response times for file uploads by 25%",
      "Designed database sharding strategy for user progress tracking, improving query performance by 55%"
    ],
    tags: ["Java", "Spring Boot", "AWS Lambda", "S3", "PostgreSQL"]
  },
  {
    id: 4,
    role: "Software Engineer Intern",
    company: "MountBlue Technologies",
    location: "Bangalore",
    period: "Apr 2023 - Jul 2023",
    description: [
      "Developed inventory management microservices using Spring Boot and JPA/Hibernate",
      "Containerized legacy applications using Docker, reducing server costs by 40%",
      "Implemented JWT-based authentication system for enterprise APIs"
    ],
    tags: ["Spring Boot", "JPA", "Hibernate", "Docker", "JWT"]
  }
]

export const PROJECTS = [
  {
    id: 1,
    title: "Certificate Management System",
    description: "REST API for SSL/TLS certificate lifecycle management with persistent storage using Traefik reverse proxy",
    tags: ["Golang", "Kubernetes", "Traefik", "REST API"],
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "Multi-Cloud Credential Manager",
    description: "Secure credential storage system across AWS, Azure, and GCP with encryption and metadata service integration",
    tags: ["Golang", "MySQL", "Docker", "AWS", "Azure", "GCP"],
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "Visa Processing Platform",
    description: "Scalable document processing system with async notifications, reducing API response time by 45%",
    tags: ["Node.js", "PostgreSQL", "AWS SQS", "Lambda", "S3"],
    github: "#",
    demo: "#"
  },
  {
    id: 4,
    title: "High-Performance Quiz Engine",
    description: "Real-time quiz platform handling 10,000+ concurrent users with malware scanning and optimized file uploads",
    tags: ["Java", "Spring Boot", "PostgreSQL", "AWS Lambda"],
    github: "#",
    demo: "#"
  },
  {
    id: 5,
    title: "Automated Document Pipeline",
    description: "S3-triggered compression and validation system processing 15K+ files monthly",
    tags: ["AWS Lambda", "S3", "Python", "PostgreSQL"],
    github: "#",
    demo: "#"
  },
  {
    id: 6,
    title: "Inventory Management System",
    description: "Microservices-based inventory management with JWT authentication and Docker containerization",
    tags: ["Spring Boot", "JPA", "Hibernate", "Docker", "JWT"],
    github: "#",
    demo: "#"
  }
]

export const SKILLS = {
  Languages: ["Golang", "JavaScript", "TypeScript", "Java"],
  "Backend Frameworks": ["Node.js", "Gin", "Spring Boot", "Express.js"],
  "DevOps & Cloud": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git"],
  Databases: ["PostgreSQL", "MySQL", "Redis", "S3"],
  "Architecture & Patterns": ["Microservices", "REST APIs", "Design Patterns", "System Design"],
  "Tools & Technologies": ["ELK Stack", "Traefik", "JWT", "JPA/Hibernate", "Amazon SQS", "Lambda"]
}

export const STATS = [
  { label: "Years Experience", value: "2.5+" },
  { label: "Concurrent Users Served", value: "10K+" },
  { label: "Cost Reduction", value: "40%" },
  { label: "API Performance Boost", value: "45%" },
]
