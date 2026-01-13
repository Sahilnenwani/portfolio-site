# Sahil Nenwani - Developer Portfolio

A stunning, terminal-inspired dark theme portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## Features

- **Terminal/Hacker Aesthetic** - Dark theme with neon green accents, typing animations, and matrix rain effects
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Live Content Integration** - Automatically fetches latest articles from Medium and posts from Twitter/X
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Performance** - Static generation where possible, optimized images and fonts

## Sections

1. **Hero** - Terminal-style intro with typing animation
2. **About** - Bio, stats, education, and certifications
3. **Skills** - Categorized tech stack with hover effects
4. **Experience** - Interactive timeline with expandable achievements
5. **Projects** - Featured GitHub repositories
6. **Blog** - MDX-powered articles with syntax highlighting
7. **Contact** - Terminal-style contact form

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blog**: MDX with gray-matter
- **Fonts**: JetBrains Mono, Space Grotesk, Inter

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sahilnenwani/my-portfolio.git

# Navigate to the project
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Home page with all sections
│   ├── globals.css         # Global styles
│   └── blog/
│       ├── page.tsx        # Blog listing
│       └── [slug]/page.tsx # Individual blog post
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills section
│   ├── Experience.tsx      # Work experience
│   ├── Projects.tsx        # Featured projects
│   ├── Blog.tsx            # Blog preview
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Footer
│   ├── TerminalText.tsx    # Typing animation
│   └── MatrixRain.tsx      # Matrix background effect
├── content/
│   └── blog/               # MDX blog posts
├── lib/
│   ├── data.ts             # Portfolio data
│   └── mdx.ts              # MDX utilities
└── public/
    └── resume.pdf          # Downloadable resume
```

## Customization

### Update Personal Information

Edit `lib/data.ts` to update:

- Personal info (name, email, social links)
- Work experience
- Skills and technologies
- Featured projects
- Blog posts metadata

### Blog & Social Media Integration

The portfolio automatically displays your latest articles and posts:

- **Medium Articles**: Fetched from your Medium RSS feed (`https://medium.com/feed/@yourusername`)
- **Twitter/X Posts**: Fetched via Twitter API v2 (requires Bearer Token in `.env.local`)

To configure:

1. Update your Medium username in `lib/data.ts` (`personalInfo.medium`)
2. (Optional) Add `TWITTER_BEARER_TOKEN` to `.env.local` for Twitter posts
3. The Blog section will automatically display your latest content

### Theme Customization

Colors and animations are configured in:

- `tailwind.config.ts` - Color palette, fonts, animations
- `app/globals.css` - CSS variables and utility classes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build the static export:

```bash
npm run build
```

The output in `.next/` can be deployed to any static hosting provider.

## License

MIT License - feel free to use this as a template for your own portfolio!

## Author

**Sahil Nenwani**

- GitHub: [@Sahilnenwani](https://github.com/Sahilnenwani)
- LinkedIn: [sahilnenwani](https://www.linkedin.com/in/sahilnenwani/)
- Email: sahilnenwani03@gmail.com
