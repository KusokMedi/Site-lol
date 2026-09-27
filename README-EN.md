# KusokMedi Portfolio

**English** | [Russian](/README.md)

Personal developer portfolio website.

## Stack

- **Frontend**: Next.js 15 (App Router, static export), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **PWA**: @ducanh2912/next-pwa (workbox)

## Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, ambient background, PWA meta)
│   ├── page.tsx            # "/" — English version
│   ├── [lang]/page.tsx     # "/ru/", "/lv/" … — 12 languages, statically generated
│   ├── simple/             # "/simple/" — document copy, English
│   ├── (lang-simple)/      # "/ru/simple/", "/lv/simple/" … — the same in 11 languages
│   ├── not-found.tsx       # 404 (pulls the design in itself, no root layout wraps it)
│   └── sitemap.ts, robots.ts
├── components/             # React components
│   ├── Home.tsx            # Shared page markup for every language
│   ├── SimpleHome.tsx      # The same page as a document (for /simple/)
│   ├── SimpleShell.tsx     # <html>/<body> of the document + app/simple.css
│   ├── LanguageProvider.tsx# i18n context + language switching
│   ├── LocaleHandler.tsx   # <html lang>, title, meta, URL, popstate
│   └── SmoothScroll.tsx    # Lenis provider + useLenis()/useScrollTo()
├── lib/
│   ├── languages.ts        # Language list, paths, og:locale
│   ├── dictionaries.ts     # Server-side dictionaries
│   ├── content.ts          # Shared content: services, projects, socials, YouTube
│   ├── seo.ts              # Per-language metadata (title/description/hreflang)
│   ├── env.ts              # NEXT_PUBLIC_* with fallbacks
│   └── locales/*.json      # 12 translations
└── public/                 # Static assets, PWA icons, CNAME
```

## Development

```bash
npm install
npm run dev
```

Dev server runs at [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run check      # eslint + tsc --noEmit
npm run lint
npm run typecheck
```

## Build

```bash
npm run build      # static export into ./out
npm start          # preview ./out locally
```

`next.config.ts` sets `output: "export"` and `trailingSlash: true`, so the result
is plain static output that can be hosted on GitHub Pages, Vercel or any CDN.
No server components or middleware are involved.

## Languages

- 12 languages, each with its own static route: `/`, `/ru/`, `/lv/`, `/uk/`, `/zh/`, `/es/`, `/hi/`, `/pt/`, `/fr/`, `/de/`, `/ja/`, `/ko/`.
- The active dictionary is inlined by the server; the other 11 load as separate chunks only when the visitor switches language.
- The choice is stored in `localStorage`; on `/` the browser language is used.
- Title, description, `og:locale` and `hreflang` are rendered at build time, so the static HTML is already in the right language.

## Document version

`/simple/` and `/{lang}/simple/` are the same content formatted as a document:
white sheet, black text, thin rules, underlined links. Plain CSS
(`app/simple.css`, ~2 kB) with no Tailwind, web fonts, glass, animations or
client JS, and a `@media print` block that makes the page print and "save as
PDF" the way it looks on screen. Texts and lists come from the same dictionaries
and `lib/content.ts` as the main site, interactivity is replaced by native HTML
(anchor links, `<details>`), and the language switcher becomes a list of links
in the footer.

Routes: `/simple/` (English) plus `/ru/simple/`, `/lv/simple/`, `/uk/simple/`,
`/zh/simple/`, `/es/simple/`, `/hi/simple/`, `/pt/simple/`, `/fr/simple/`,
`/de/simple/`, `/ja/simple/`, `/ko/simple/`. Those live in a separate route tree
(`app/(lang-simple)/`) so they can sit under `/{lang}/simple/` and still render
through `SimpleShell` instead of `RootShell` — which means that tree and
`app/simple/` each have their own root layout. The pages are `noindex` with a
canonical to the designed URL and are not listed in the sitemap.

## 404

`app/not-found.tsx` is the only page no root layout wraps, so it brings the
design itself: `import "@/app/globals.css"` plus the fonts on a wrapper.
Without that, `404.html` was exported with no stylesheet at all.

## Deploy

`.github/workflows/deploy.yml` builds `out/` and publishes it to GitHub Pages
(custom domain via `public/CNAME`). On Vercel just connect the repository — the
static export is deployed as-is.

[Vercel Analytics](https://vercel.com/analytics) is enabled for traffic tracking.

## Contacts

- Telegram: [@kusokmedi52](https://t.me/kusokmedi52)
- Discord: [server](https://discord.gg/sX97m22zR9)
- GitHub: [@kusokmedi](https://github.com/kusokmedi)
- YouTube: [@kusokmedi](https://youtube.com/@kusokmedi)
