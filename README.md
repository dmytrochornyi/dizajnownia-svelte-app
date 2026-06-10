# Dizajnownia — SvelteKit Website

Website for **Dizajnownia**, a graphic design and printing studio. Built with SvelteKit, Tailwind CSS v4, and mdsvex for blog posts.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) + Svelte 5
- [Tailwind CSS v4](https://tailwindcss.com/)
- [mdsvex](https://mdsvex.pngwing.com/) — Markdown blog posts with Svelte components
- [GSAP](https://gsap.com/) — animations
- Static adapter (pre-rendered, no server required)

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, offer grid, opinions, clients |
| `/blog` | Blog listing + individual posts (`/blog/[slug]`) |
| `/wizytowki`, `/ulotki`, `/banery`, … | Individual service pages |
| `/logo`, `/strony-internetowe`, `/3d` | Design & web service pages |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build → build/
npm run preview      # preview the production build
npm run check        # Svelte type check
npm run lint         # Prettier + ESLint
npm run format       # auto-format
npm run optimize:images  # compress images with Sharp
npm run optimize:video   # optimize video assets
```

## Project Structure

```
src/
  lib/
    components/   # Svelte components (Navigation, HeroSection, etc.)
    utils/        # SEO helpers, blog loader, navigation
    stores/       # Svelte stores (SEO, email)
    data.js       # Site-wide content data
  routes/         # SvelteKit file-based routing
    blog/         # Blog + .md post files
    [service]/    # One folder per service page
static/
  img/            # Images, SVGs, video background
  favicon/        # Favicon set
  sitemap.xml     # + image & video sitemaps
```

## Build & Deploy

The project uses `@sveltejs/adapter-static` — `npm run build` outputs a fully static site to `build/`. Deploy the `build/` folder to any static host (Netlify, Vercel static, Apache/Nginx, etc.).

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.
