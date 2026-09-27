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
│   ├── SimpleHome.tsx      # Та же страница в виде статьи Википедии (для /simple/)
│   ├── SimpleShell.tsx     # <html>/<body> документа + app/simple.css + скрипт настроек
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
панели справа (оглавление + Appearance) и инфобокс с цифрами в правом верхнем углу
статьи. Обычный CSS (`app/simple.css`, ~14 КБ) без Tailwind, веб-шрифтов, стекла и
анимаций; блок `@media print` делает страницу пригодной для печати и «Сохранить как
PDF». Тексты и списки берутся из тех же словарей и `lib/content.ts`, что и у
основного сайта, интерактив заменён нативным HTML (ссылки-якоря, `<details>`,
радио-кнопки), а переключатель языков — списком ссылок под заголовком, текущий язык
выделен полужирным. Ссылка при нажатии не меняет цвет: системная подсветка
(`-webkit-tap-highlight-color`) отключена, на `:active` появляется только
подчёркивание, а отдельного цвета для `:visited` нет вообще — в тёмной палитре он
читался как розовый, и переключатель языка после посещения страницы менял оттенок.

**Раскладка.** Лист идёт на всю ширину, статья и сайдбар центрируются по мере
`--measure` (13rem панели + 4rem отступ + 40.5rem текста), панели липкие
(`position: sticky`), поэтому при прокрутке они идут за текстом, а не оставляют пустую
колонку. Инфобокс — настоящая таблица с `<caption>`, как в Википедии: плавает справа
в начале статьи, а `section { display: flow-root }` держит его внутри своего раздела
(раньше он наезжал на заголовок «Услуги»). Прокрутка к якорям плавная
(`html { scroll-behavior: smooth }`, отключается в `prefers-reduced-motion`), плавающая
кнопка «↑» ведёт на `#top` — на самый верх страницы, а не к первому разделу; её
появление привязано к позиции скролла (`animation-timeline: scroll(root block)`), в
браузере без поддержки кнопка просто видна всегда.

**Внешний вид (Appearance).** Панель в сайдбаре — как в Википедии: Color
(Automatic/Light/Dark) и Text (Small/Standard/Large), радио-кнопки в стиле
`cdx-radio`. Переключение сделано на CSS: `html:has(#theme-dark:checked)` и
`data-theme`/`data-size` на `<html>` задают палитру и корневой размер шрифта (14/16/18px
— вся вёрстка в `rem`, поэтому масштабируется и мера текста). ~1 КБ инлайн-скрипта в
`SimpleShell` только запоминает выбор в `localStorage` и ставит эти атрибуты до первой
отрисовки; без скрипта переключатели всё равно работают в рамках страницы. Тёмная
палитра — тёмно-серый `#101418`/`#1b1f23`, текст `#f8f9fa`, ссылки `#88a3e8`.

**Печать.** `@media print` всегда печатает светлую тему (что бы ни было на экране),
скрывает панель Appearance и кнопку «↑», печатает адреса ссылок и не разрывает
разделы и таблицы.

На телефоне (`@media (max-width: 60rem)`) лист остаётся во всю ширину, две колонки
складываются в одну: панели уходят вниз под статью и перестают быть липкими, инфобокс
перестаёт плавать, длинные техстроки и URL переносятся, кнопка «↑» уменьшается и
отодвигается от safe-area. Отдельной мобильной версии нет — та же страница
адаптируется. Заголовки панелей и подписи Appearance берутся из ключей `toc.title` и
`appearance.*`, добавленных во все 12 словарей. Последняя строка `about.txt`
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
