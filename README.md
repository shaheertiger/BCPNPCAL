# BC PNP Points Calculator

A high-performance, SEO-optimized points calculator for the British Columbia Provincial Nominee Program (BC PNP) built with **Astro** and **React Islands**.

## 🚀 Features

- ✅ **Server-Side Rendered** - Full HTML output for perfect SEO
- ✅ **React Islands** - Interactive calculator with selective hydration
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern, responsive design
- ✅ **JSON-LD Schema** - Rich snippets for search engines
- ✅ **Zero-Config** - Works out of the box

## 📊 What It Calculates

The BC PNP points calculator helps estimate your **Skills Immigration Ranking System (SIRS)** score based on:

- **Work Experience** (max 40 points)
- **Education Level** (max 40 points)
- **Language Proficiency** (max 40 points)
- **Hourly Wage** (max 55 points)
- **Regional Location** (max 25 points)

**Maximum Score**: 200 points
**Eligibility Threshold**: 80+ points

## 🛠️ Tech Stack

- **Astro 5** - Static site generator
- **React 19** - Interactive UI (islands only)
- **TypeScript 5.8** - Type safety
- **Tailwind CSS 3** - Styling
- **Vite** - Build tool (via Astro)

## 📁 Project Structure

```
/src
  /pages
    index.astro                   # Landing page
    bc-pnp-calculator.astro      # Calculator page
  /components
    Calculator.client.tsx         # React island (interactive)
    CalculatorShell.astro        # Island wrapper
  /layouts
    BaseLayout.astro             # SEO & meta tags
  /utils
    calculatePoints.ts           # Calculation logic
  /types
    index.ts                     # TypeScript types
  /styles
    global.css                   # Global styles
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

Output will be in `/dist` folder.

## 🎨 Architecture

### Astro Pages (Static HTML)
- **index.astro** - Landing page with SEO content
- **bc-pnp-calculator.astro** - Calculator page with structured data

### React Island (Interactive)
- **Calculator.client.tsx** - Multi-step form with state management
  - Uses `client:load` for immediate interactivity
  - Handles all user interactions
  - Real-time score calculation

### Logic Layer (Framework-Agnostic)
- **calculatePoints.ts** - Pure calculation logic
- **types/index.ts** - TypeScript definitions

## 📈 Performance

### Bundle Sizes
- **Landing page**: ~50 KB (static HTML)
- **Calculator island**: ~213 KB (only on calculator page)
- **React runtime**: Loaded only when needed

### Lighthouse Scores (Production)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔍 SEO Features

### Meta Tags
- Unique titles per page
- Descriptive meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Structured Data (JSON-LD)
- WebApplication schema
- FAQPage schema with 5 questions
- Google Rich Results compatible

### Server-Side Rendering
- All content visible without JavaScript
- Search engine friendly
- Fast initial page load

## 🧪 Testing

### Verify SEO
```bash
# Build the site
npm run build

# Check generated HTML
cat dist/index.html
cat dist/bc-pnp-calculator/index.html
```

All content should be in the HTML source.

### Verify Hydration
1. Open DevTools
2. Disable JavaScript
3. Visit landing page - Should be fully functional
4. Visit calculator - Content visible, form not interactive (expected)

## 📦 Deployment

### Static Hosting (Recommended)
Deploy to any static host:
- **Netlify**: `npm run build` → Deploy `/dist`
- **Vercel**: Auto-deploys from Git
- **GitHub Pages**: Deploy `/dist` folder
- **Cloudflare Pages**: Connect repository

### Configuration
Update `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://yourdomain.com', // Your production URL
  // ... rest of config
});
```

## 🎯 Use Cases

- **Prospective Immigrants** - Estimate BC PNP eligibility
- **Immigration Consultants** - Quick client assessments
- **Employers** - Help foreign workers understand requirements
- **Educational Tool** - Learn about BC PNP point system

## 🔄 Migration

This project was migrated from Vite + React to Astro + React Islands. See [MIGRATION.md](./MIGRATION.md) for detailed migration documentation.

---

**Built with ❤️ using Astro**
