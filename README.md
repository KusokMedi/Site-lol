# KusokMedi Portfolio

**Russian** | [English](/README-EN.md)

Личный сайт-портфолио разработчика.

## Стек

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Структура

```
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Корневой layout
│   └── page.tsx          # Главная страница
├── components/           # React-компоненты
├── lib/                  # Утилиты, типы, данные
├── public/               # Статические файлы
└── resources/           # Изображения
```

## Разработка

```bash
npm install
npm run dev
```

Сервер разработки запустится на [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

## Линтинг

```bash
npm run lint
```

## Деплой

Деплой на Vercel настроен через GitHub Actions. Пушишь в main — сайт автоматически обновляется.

[Vercel Analytics](https://vercel.com/analytics) подключен для отслеживания посещений.

## Контакты

- Telegram: [@kusokmedi52](https://t.me/kusokmedi52)
- GitHub: [@kusokmedi](https://github.com/kusokmedi)
- YouTube: [@kusokmedi](https://youtube.com/@kusokmedi)
