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
│   ├── simple/             # "/simple/" — документная копия на английском
│   ├── (lang-simple)/      # "/ru/simple/", "/lv/simple/" … — то же на 11 языках
│   ├── not-found.tsx       # 404 (дизайн подключает сам, вне root layout)
│   └── sitemap.ts, robots.ts
├── components/             # React-компоненты
│   ├── Home.tsx            # Общая разметка страницы для всех языков
│   ├── SimpleHome.tsx      # Та же страница в виде документа (для /simple/)
│   ├── SimpleShell.tsx     # <html>/<body> документа + app/simple.css
│   ├── LanguageProvider.tsx# i18n-контекст + переключение языка
│   ├── LocaleHandler.tsx   # <html lang>, title, meta, URL, popstate
│   └── SmoothScroll.tsx    # Lenis-провайдер + useLenis()/useScrollTo()
├── lib/
│   ├── languages.ts        # Список языков, пути, og:locale
│   ├── dictionaries.ts     # Серверные словари
│   ├── content.ts          # Общий контент: сервисы, проекты, соцссылки, YouTube
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

## Документная версия

`/simple/` и `/{lang}/simple/` — тот же контент в виде статьи Википедии: белый лист
на всю ширину окна, заголовки без засечек над шрифтом с засечками, синие ссылки,
боковая панель с оглавлением, а цифры из раздела «Обо мне» — в инфобоксе справа.
Обычный CSS (`app/simple.css`, ~11 КБ) без Tailwind, веб-шрифтов, стекла, анимаций и
клиентского JS; блок `@media print` делает страницу пригодной для печати и
«Сохранить как PDF». Тексты и списки берутся из тех же словарей и
`lib/content.ts`, что и у основного сайта, интерактив заменён нативным HTML
(ссылки-якоря, `<details>`), а переключатель языков — списком ссылок под
заголовком, текущий язык выделен полужирным.

Лист идёт на всю ширину, а текстовая колонка держит меру `--measure` (60.5rem =
оглавление 13rem + отступ 3.5rem + текст 44rem) и центрируется — на широком мониторе
по краям остаётся поле, как в статье Википедии. Прокрутка к якорям плавная
(`html { scroll-behavior: smooth }`, отключается в `prefers-reduced-motion`), а
плавающая кнопка «↑» в правом нижнем углу ведёт на `#top` — на самый верх страницы,
а не к первому разделу; её появление привязано к позиции скролла
(`animation-timeline: scroll(root block)`), в браузере без поддержки кнопка просто
видна всегда.

На телефоне (`@media (max-width: 60rem)`) лист остаётся во всю ширину, две колонки
складываются в одну: оглавление и инфобокс становятся обычными блоками, инфобокс
перестаёт быть плавающим, шрифт крупнее (16px), длинные техстроки и URL переносятся,
кнопка «↑» уменьшается и отодвигается от safe-area. Отдельной мобильной версии нет —
та же страница адаптируется. Заголовок боковой панели берётся из ключа
`toc.title`, добавленного во все 12 словарей. Последняя строка `about.txt`
(`terminal.line9`) не выводится: на основном сайте это печатаемая строка приветствия,
а заголовок «Обо мне» и так идёт следующим разделом.

Маршруты: `/simple/` (английский) и `/ru/simple/`, `/lv/simple/`, `/uk/simple/`,
`/zh/simple/`, `/es/simple/`, `/hi/simple/`, `/pt/simple/`, `/fr/simple/`,
`/de/simple/`, `/ja/simple/`, `/ko/simple/`. Это отдельное дерево маршрутов
(`app/(lang-simple)/`), поэтому у него свой root layout — как и `app/simple/`, он
рендерится через `SimpleShell` и не касается `RootShell`. Страницы закрыты от
индексации (`noindex`, canonical на основной URL) и в sitemap не входят.

## 404

`app/not-found.tsx` — единственная страница, которую не оборачивает ни один root
layout, поэтому дизайн она подключает сама: `import "@/app/globals.css"` плюс
шрифты на обёртке. Без этого `404.html` выходил без единого стиля.

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
