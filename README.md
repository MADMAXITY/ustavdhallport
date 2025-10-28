# Utsav Dhall - Portfolio Website

A modern, professional portfolio website showcasing backend engineering expertise with animated star background, smooth scrolling sections, and integrated contact functionality.

## 🚀 Features

- **Animated Star Network Background** - Interactive particle system with connecting lines
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Framer Motion powered transitions and reveals
- **Contact Form** - Integrated with Resend API for email functionality
- **Modern Tech Stack** - Next.js 15, TypeScript, Tailwind CSS
- **SEO Optimized** - Meta tags and structured data
- **Fast Performance** - Optimized bundle size and static generation

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email Service:** Resend
- **Form Validation:** Zod

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd utsavdhallport

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Resend API credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY="your_resend_api_key"
RESEND_TO_EMAIL="your_email@example.com"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

## 📁 Project Structure

```
utsavdhallport/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── send-email/       # Email API endpoint
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── sections/             # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── ui/                   # UI components (shadcn)
│   ├── StarBackground.tsx    # Animated background
│   ├── Navigation.tsx        # Header/Nav
│   └── ContactForm.tsx       # Contact form
├── lib/                      # Utility files
│   ├── utils.ts              # Helper functions
│   ├── constants.ts          # Site data
│   └── types.ts              # TypeScript types
├── public/                   # Static assets
│   ├── resume.pdf            # Resume file
│   └── images/               # Image assets
└── package.json
```

## 🎨 Customization

### Update Personal Information

Edit `lib/constants.ts` to update:
- Name, email, phone, location
- Social media links
- Work experience
- Projects
- Skills
- Stats

### Change Color Scheme

Edit `tailwind.config.ts` to customize colors:
```typescript
colors: {
  primary: {
    DEFAULT: '#ff5722',  // Change to your brand color
    dark: '#e64a19',
    light: '#ff7043'
  }
}
```

### Modify Background Animation

Edit `components/StarBackground.tsx` to adjust:
- Number of stars (`numStars`)
- Connection distance (`maxDistance`)
- Animation speed (`vx`, `vy` values)
- Mouse interaction radius (`mouseRadius`)

## 📱 Sections

1. **Hero** - Main landing with typing animation
2. **About** - Introduction and stats
3. **Experience** - Work history timeline
4. **Projects** - Portfolio showcase
5. **Skills** - Technical skills grid
6. **Contact** - Contact form and info
7. **Footer** - Links and social

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the application:
```bash
npm run build
```

Then deploy the `.next` folder to your hosting provider.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Load JS: ~159 KB
- Static generation for fast page loads
- Optimized images with Next.js Image component

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Utsav Dhall**
- LinkedIn: [linkedin.com/in/utsav-dhall](https://linkedin.com/in/utsav-dhall)
- Email: utsdhall@gmail.com
- Location: Bengaluru, India

---

Built with ❤️ using Next.js and modern web technologies.
