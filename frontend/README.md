# Israel Paul — Portfolio

Personal portfolio site for Israel Paul, Full Stack Web Developer & Software Engineer, Chennai, India.

**Stack:** React 19 · Vite 7 · Tailwind CSS v4 · Framer Motion · GSAP + SplitText

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview

# 5. Lint
npm run lint
```

## Project structure

```
frontend/
├── public/
│   └── resume.pdf          ← linked by the "View Resume" button
├── src/
│   ├── app/                ← App.jsx, main.jsx, routes.jsx
│   ├── components/
│   │   ├── layout/         ← Navbar, Footer, PageTransition
│   │   ├── motion/         ← Reveal, Stagger, FadeIn, Parallax, TextSmooth
│   │   └── ui/             ← Button, Card, Badge, Heading, Grid, Cursor, …
│   ├── data/               ← personal.js, projects.js, skills.js
│   ├── hooks/              ← useScrollProgress, useIntersection, useMousePosition
│   ├── sections/           ← Hero, Experience, Work, About, Skills, Contact
│   ├── styles/
│   │   └── tailwind.css    ← Tailwind v4 entry + CSS custom properties
│   └── utils/
│       └── cn.js
├── index.html
├── vite.config.js
└── jsconfig.json
```

## Content updates

All real data lives in `src/data/`. To update:

- **Personal info / social links / bio** → `src/data/personal.js`
- **Work experience & education** → `src/data/personal.js` (`experience`, `education`, `achievements`)
- **Projects** → `src/data/projects.js` — swap `placeholder: true` for `image: "/projects/yourfile.jpg"` once screenshots are ready
- **Skills** → `src/data/skills.js`
- **Resume** → replace `public/resume.pdf` in place (URL stays `/resume.pdf`)

## TODO (review)

- Replace canonical URL and OG image URL in `index.html` with real domain
- Create `public/favicon.svg` (or `.ico`) — currently references `/favicon.svg` placeholder
- Swap project placeholder SVGs for real screenshots once available (one-line change per project in `src/data/projects.js`)
