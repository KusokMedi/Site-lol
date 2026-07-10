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
  { name: "Python", level: 99 },
  { name: "Linux", level: 99 },
  { name: "Backend", level: 90 },
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
    title: "Тестовый проект #01",
    description:
      "Этот тестовый проект помогает делать разные крутые штуки для демонстрации и отладки функционала.",
    image: "M",
    gradient: "from-amber-600/20 to-orange-600/20",
    tech: ["Test", "Demo", "Sample", "Debug"],
    result: "Тестовая заглушка — скоро обновлю",
    github: "https://github.com/kusokmedi",
    demo: null,
  },
  {
    title: "Тестовый проект #02",
    description:
      "Этот тестовый проект помогает проверять API, базы данных и автоматизацию в демо-режиме.",
    image: "B",
    gradient: "from-blue-600/20 to-cyan-600/20",
    tech: ["Test", "API", "Demo", "Debug"],
    result: "Тестовая заглушка — скоро обновлю",
    github: "https://github.com/kusokmedi",
    demo: null,
  },
  {
    title: "Тестовый проект #03",
    description:
      "Этот тестовый проект нужен для проверки деплоя, CI/CD и серверной автоматизации.",
    image: "L",
    gradient: "from-green-600/20 to-emerald-600/20",
    tech: ["Test", "Docker", "Demo", "CI/CD"],
    result: "Тестовая заглушка — скоро обновлю",
    github: "https://github.com/kusokmedi",
    demo: null,
  },
];