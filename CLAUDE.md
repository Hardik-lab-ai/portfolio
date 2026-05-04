# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run dev:open     # Start dev server and auto-open in browser
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

No test suite is configured.

## Architecture

**Next.js 16 App Router** single-page portfolio. The single route (`app/page.tsx`) renders all 10 sections in order: Navbar → Hero → Stats → About → Experience → Skills → Education → Company → Contact → Footer.

All components live in `components/` and are client components (`"use client"`). Scroll-triggered animations use the browser's `IntersectionObserver` API; complex animations use **Framer Motion**.

### Styling

**Tailwind CSS v4** is configured via PostCSS (`postcss.config.mjs`). Custom design tokens (navy/amber/teal palette) and animations (fadeUp, slideLeft, shimmer, float, pulseGlow, etc.) are defined in `app/globals.css` under `@theme`. Reusable utility classes like `.glass-card`, `.hover-lift`, `.text-shimmer`, and `.reveal` are also defined there — prefer extending these over writing one-off styles.

### Path Aliases

`@/*` maps to the project root (e.g., `import Foo from "@/components/Foo"`).

### CORS

`next.config.ts` sets permissive CORS headers (`Access-Control-Allow-Origin: *`) on all routes.
