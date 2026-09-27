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
│   ├── SimpleHome.tsx      # The same page as a Wikipedia-style article (for /simple/)
│   ├── SimpleShell.tsx     # <html>/<body> of the document + app/simple.css + prefs script
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

`/simple/` and `/{lang}/simple/` are the same content formatted as a Wikipedia
article: a full-width white sheet, sans-serif headings over serif body text, blue
links, the panels on the right (table of contents + Appearance) and a summary table
with the counters in the About section. Plain CSS (`app/simple.css`,
~14 kB) with no Tailwind, web fonts, glass or animations, and a `@media print`
block that makes the page print and "save as PDF" the way it looks on screen.
Texts and lists come from the same dictionaries and `lib/content.ts` as the main
site, interactivity is replaced by native HTML (anchor links, `<details>`,
radio buttons), and the language switcher is a list of links under the title with
the current language in bold. A pressed link never changes colour: the system
press highlight (`-webkit-tap-highlight-color`) is off, `:active` only adds the
underline, and there is no separate `:visited` colour at all — in the dark palette
it read as pink, so the language switcher changed shade once you had visited a page.

**Layout.** The sheet spans the whole window while article and sidebar are centred
on the measure `--measure` (13rem panels + 4rem gutter + 40.5rem text). The panels
are `position: sticky`, so they follow the text instead of leaving a dead column.
The numbers table is a real `<table>` with a `<caption>` and three columns (label,
value, description), the way Wikipedia builds a wikitable; it spans the whole column
at the top of the About section and overlaps nothing. It used to float right next to
the lead text, where it stole ~300px of the column and the socials row ran into it, so
it does not float any more, and on a narrow screen the description of a row moves
under its label. Sections no longer carry a small label above the heading either:
"Contact" followed by "Let's create something together" read as two headings in a
row, so each section now has a single heading and its name lives in the contents
panel. Anchor
scrolling is smooth (`html { scroll-behavior: smooth }`, switched off under
`prefers-reduced-motion`), and the floating "↑" button points at `#top` — the very
top of the page, not the first section. Its fade-in is tied to the scroll position
(`animation-timeline: scroll(root block)`), and in a browser without support it is
simply always visible.

**Appearance.** The sidebar panel is Wikipedia's: Color (Automatic/Light/Dark) and
Text (Small/Standard/Large), as `cdx-radio` style radio buttons. The switching is
CSS: `html:has(#theme-dark:checked)` plus `data-theme`/`data-size` on `<html>` set
the palette and the root font size (14/16/18px — the whole layout is in `rem`, so
the text measure scales with it). A ~1 kB inline script in `SimpleShell` only
remembers the choice in `localStorage` and sets those attributes before the first
paint; without it the switches still work for the current page. The dark palette is
`#101418`/`#1b1f23` surfaces, `#f8f9fa` text, `#88a3e8` links.

**Print.** `@media print` always prints the light theme (whatever is on screen),
hides the Appearance panel and the "↑" button, prints link addresses and avoids
breaking sections and the numbers table across pages.

On a phone (`@media (max-width: 60rem)`) the sheet stays full width and the two
columns collapse into one: the panels move below the article and stop being sticky,
long tech lists and URLs wrap, and the "↑" button
shrinks and moves in from the safe area. There is no separate mobile version — the
same page adapts. The panel headings and the Appearance labels come from `toc.title`
and the `appearance.*` keys added to all 12 dictionaries. The last line of
`about.txt` (`terminal.line9`) is not printed: on the main site it is a typed
greeting line, and the About heading follows this block anyway.

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
