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
  Cloud,
  Wrench,
  Plug,
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
    value: "25+",
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
  { name: "Linux", level: 100 },
  { name: "Python", level: 97 },
  { name: "Git", level: 90 },
  { name: "Java", level: 90 },
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
  {
    icon: Cloud,
    title: "Хостинг и Деплой",
    description: "Размещение ваших сайтов, ботов и скриптов на сервере. Запуск готовых решений «под ключ».",
    details: ["Размещение готовых скриптов и ботов", "Настройка VPS / VDS и хостинга", "Привязка доменов и SSL-сертификатов", "Перенос проектов на новые сервера"],
  },
  {
    icon: Wrench,
    title: "Поддержка и Обслуживание",
    description: "Техническое сопровождение ваших проектов. Оперативное исправление багов и контроль стабильности.",
    details: ["Исправление ошибок и багов", "Обновление зависимостей и систем", "Настройка регулярных бэкапов", "Мониторинг доступности 24/7"],
  },
  {
    icon: Plug,
    title: "Интеграция API и Сервисов",
    description: "Связка ваших сайтов и программ с внешними системами для автоматизации бизнес-процессов.",
    details: ["Подключение платежных систем", "Интеграция с CRM (amoCRM, Битрикс24)", "Настройка уведомлений в мессенджеры", "Синхронизация с Google Таблицами"],
  },
];

export const projects: Project[] = [];

