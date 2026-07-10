import {
  Globe,
  Bot,
  Server,
  Terminal,
  Code2,
  Search,
  Briefcase,
  Layers,
  GitCommit,
} from "lucide-react";
import type { Highlight, Service, Project, Skill } from "./types";

export const highlights: Highlight[] = [
  {
    icon: Briefcase,
    label: "Опыт",
    value: "3+ года",
    desc: "Коммерческой разработки и работы над проектами разного масштаба - от стартапов до крупных систем",
  },
  {
    icon: Layers,
    label: "Проекты",
    value: "10+",
    desc: "Завершённых проектов в самых разных сферах: от Telegram-ботов до серверной инфраструктуры",
  },
  {
    icon: Code2,
    label: "Технологии",
    value: "20+",
    desc: "Языков программирования, фреймворков и инструментов, которыми я владею на профессиональном уровне",
  },
  {
    icon: GitCommit,
    label: "Коммиты",
    value: "200+",
    desc: "Коммитов на GitHub за всё время активной разработки open-source и личных проектов",
  },
];

export const mainSkills: Skill[] = [
  { name: "Python Telebot SQLite", level: 100 },
  { name: "Python", level: 97 },
  { name: "Paper Java Linux", level: 90 },
  { name: "Git", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "React", level: 85 },
  { name: "HTML", level: 90 },
  { name: "JavaScript", level: 80 },
  { name: "Docker", level: 85 },
  { name: "TypeScript", level: 80 },
];

export const services: Service[] = [
  {
    icon: Globe,
    title: "Веб-разработка",
    description: "Сайты, веб-приложения и админ-панели.",
    details: ["Адаптивные сайты", "Веб-приложения", "Админ-панели", "Лендинги"],
  },
  {
    icon: Bot,
    title: "Разработка ботов",
    description: "Telegram-боты, Discord-боты и автоматизация.",
    details: ["Telegram-боты", "Discord-боты", "Автоматизация чатов", "Интеграция AI"],
  },
  {
    icon: Server,
    title: "Backend",
    description: "API, базы данных и серверная логика.",
    details: ["REST и GraphQL API", "Проектирование БД", "Аутентификация", "Микросервисы"],
  },
  {
    icon: Terminal,
    title: "Linux / Серверы",
    description: "Настройка, оптимизация и автоматизация серверов.",
    details: ["Конфигурация серверов", "Деплой через Docker", "CI/CD пайплайны", "Мониторинг"],
  },
  {
    icon: Code2,
    title: "Программы",
    description: "Утилиты, скрипты и программы для любых задач.",
    details: ["CLI-инструменты", "Скрипты автоматизации", "Десктоп-утилиты", "Обработка данных"],
  },
  {
    icon: Search,
    title: "Аудит и Консалтинг",
    description: "Рефакторинг, оптимизация и архитектурные решения.",
    details: ["Аудит кода и проектов", "Оптимизация производительности", "Архитектура систем", "Техническая документация"],
  },
];

export const projects: Project[] = [
  {
    title: "AnonSpeak",
    description:
      "Бот для анонимных сообщений прямо в Telegram. Создай свою ссылку - любой, кто перейдёт по ней, сможет написать тебе анонимное сообщение.",
    image: "/resources/AnonSpeak-logo.jpg",
    gradient: "from-white/20 to-stone-300/20",
    tech: ["Python Telebot SQLite"],
    features: [
      "Создание своей анонимной ссылки",
      "Ответ на анонимные сообщения",
      "Блокировка нежелательных пользователей",
      "Статистика сообщений",
    ],
    href: "https://t.me/AnonSpeakKM_bot",
    hrefLabel: "Открыть бота",
    github: "https://github.com/kusokmedi",
  },
  {
    title: "BestDev Support Bot",
    description:
      "Бот поддержки для Minecraft-студии BestDev. Закажи плагин, сборку, консультацию или готовое решение под ключ.",
    image: "/resources/BestDev-logo.jpg",
    gradient: "from-yellow-400/20 to-amber-500/20",
    tech: ["Python Telebot SQLite"],
    features: [
      "Заказ плагинов и сборок под ключ",
      "Консультации по проектам",
      "Заявки в команду разработки",
      "Готовые товары и решения",
    ],
    href: "https://t.me/bestdevsbot",
    hrefLabel: "Открыть бота",
    github: null,
  },
  {
    title: "GridMC",
    description:
      "Ванильный Minecraft-сервер 1.21.11 с экономикой. /sell, аукцион, TPA и никаких лишних дополнений - всё максимально как в ванилле.",
    image: "/resources/mc-1-21-11-logo.jpeg",
    gradient: "from-sky-400/20 to-blue-500/20",
    tech: ["Paper Java Linux"],
    features: [
      "Экономика с /sell и /ah (аукцион)",
      "Без /spawn и лишнего мусора",
      "Один мир без правил",
      "Максимально ванильный геймплей",
      "Написал несколько плагинов специально под сервер",
    ],
    href: "https://discord.kusokmedi.lat",
    hrefLabel: "Зайти в Discord",
    github: null,
  },
];