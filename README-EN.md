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
│   ├── not-found.tsx       # 404
│   └── sitemap.ts, robots.ts
├── components/             # React components
│   ├── Home.tsx            # Shared page markup for every language
│   ├── LanguageProvider.tsx# i18n context + language switching
│   ├── LocaleHandler.tsx   # <html lang>, title, meta, URL, popstate
│   └── SmoothScroll.tsx    # Lenis provider + useLenis()/useScrollTo()
├── lib/
│   ├── languages.ts        # Language list, paths, og:locale
│   ├── dictionaries.ts     # Server-side dictionaries
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
