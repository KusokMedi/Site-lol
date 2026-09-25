# KusokMedi Portfolio

**Russian** | [English](/README-EN.md)

Личный сайт-портфолио разработчика.

## Стек

- **Frontend**: Next.js 15 (App Router, static export), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **PWA**: @ducanh2912/next-pwa (workbox)

## Структура

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Корневой layout (шрифты, фон, PWA-мета)
│   ├── page.tsx            # "/" — английская версия
│   ├── [lang]/page.tsx     # "/ru/", "/lv/" … — 12 языков, статическая генерация
│   ├── not-found.tsx       # 404
│   └── sitemap.ts, robots.ts
├── components/             # React-компоненты
│   ├── Home.tsx            # Общая разметка страницы для всех языков
│   ├── LanguageProvider.tsx# i18n-контекст + переключение языка
│   ├── LocaleHandler.tsx   # <html lang>, title, meta, URL, popstate
│   └── SmoothScroll.tsx    # Lenis-провайдер + useLenis()/useScrollTo()
├── lib/
│   ├── languages.ts        # Список языков, пути, og:locale
│   ├── dictionaries.ts     # Серверные словари
│   ├── seo.ts              # Per-language metadata (title/description/hreflang)
│   ├── env.ts              # NEXT_PUBLIC_* с фолбэками
│   └── locales/*.json      # 12 переводов
└── public/                 # Статика, иконки PWA, CNAME
```

## Разработка

```bash
npm install
npm run dev
```

Сервер разработки запустится на [http://localhost:3000](http://localhost:3000).

## Проверки

```bash
npm run check      # eslint + tsc --noEmit
npm run lint
npm run typecheck
```

## Сборка

```bash
npm run build      # статический экспорт в ./out
npm start          # локальный просмотр ./out
```

`next.config.ts` включает `output: "export"` и `trailingSlash: true`, поэтому
результат — обычная статика, которую можно положить на GitHub Pages, Vercel
или любой CDN. Server-компоненты и middleware не используются.

## Языки

- 12 языков, у каждого свой статический маршрут: `/`, `/ru/`, `/lv/`, `/uk/`, `/zh/`, `/es/`, `/hi/`, `/pt/`, `/fr/`, `/de/`, `/ja/`, `/ko/`.
- Словарь приходит с сервера вместе со страницей, остальные 11 подгружаются отдельным чанком только при переключении языка.
- Выбор языка сохраняется в `localStorage`; на `/` подхватывается язык браузера.
- Название, описание, `og:locale` и `hreflang` проставляются на этапе сборки — в статическом HTML уже лежит нужный язык.

## Деплой

`.github/workflows/deploy.yml` собирает `out/` и выкладывает его на GitHub Pages
(кастомный домен — `public/CNAME`). На Vercel достаточно подключить репозиторий:
статический экспорт deploy'ится как есть.

[Vercel Analytics](https://vercel.com/analytics) подключен для отслеживания посещений.

## Контакты

- Telegram: [@kusokmedi52](https://t.me/kusokmedi52)
- Discord: [сервер](https://discord.gg/sX97m22zR9)
- GitHub: [@kusokmedi](https://github.com/kusokmedi)
- YouTube: [@kusokmedi](https://youtube.com/@kusokmedi)
