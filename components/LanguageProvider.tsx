"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "ru";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.code": "Code",
    "nav.contacts": "Contacts",
    "hero.greeting": "Hi, I'm",
    "hero.name": "KusokMedi",
    "hero.title": "Developer / Programmer",
    "hero.description": "I create websites, bots, automation and digital solutions. Specialization: Python, React, Node.js, Linux.",
    "hero.cta": "View Projects",
    "about.title": "About Me",
    "about.subtitle": "Who I am",
    "about.heading": "I create digital products that matter",
    "about.text1": "I am a developer who doesn't limit myself to one stack. Websites, Telegram bots, APIs, server infrastructure - I understand and do it all. I quickly get into context and start working.",
    "about.text2": "I specialize in Python, React, Node.js and Linux. I take a project from concept to production, working with the full stack. My approach: understand the problem, choose the right tools and build something that works reliably.",
    "services.title": "Services",
    "services.subtitle": "What I do",
    "services.heading": "What I can do for you",
    "services.description": "Full development cycle - from concept to deployment. I work with the entire stack to create a ready-made solution.",
    "projects.title": "Projects",
    "projects.subtitle": "My work",
    "projects.heading": "Featured works",
    "projects.description": "Real projects created from scratch - each solves specific problems using the right technologies.",
    "contact.title": "Contact",
    "contact.subtitle": "Get in touch",
    "contact.heading": "Let's create something together",
    "contact.text": "Have a project or just want to chat? Write to me on Telegram - I'm always ready to discuss and implement your project at a great price.",
    "contact.button": "Write to Telegram",
    "github.title": "Code",
    "github.subtitle": "GitHub repos",
    "footer.rights": "All rights reserved.",
    "notFound.title": "Page not found",
    "notFound.text": "This page does not exist. It may have been moved or deleted.",
    "notFound.button": "Go home",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.services": "Услуги",
    "nav.projects": "Проекты",
    "nav.code": "Код",
    "nav.contacts": "Контакты",
    "hero.greeting": "Привет, я",
    "hero.name": "KusokMedi",
    "hero.title": "Разработчик / Программист",
    "hero.description": "Создаю сайты, ботов, автоматизацию и цифровые решения. Специализация: Python, React, Node.js, Linux.",
    "hero.cta": "Смотреть проекты",
    "about.title": "Обо мне",
    "about.subtitle": "Кто я",
    "about.heading": "Создаю цифровые продукты, которые имеют значение",
    "about.text1": "Я разработчик, который не ограничивается одним стеком. Сайты, Telegram-боты, API, серверная инфраструктура - я разбираюсь и делаю. Быстро вхожу в контекст и приступаю к работе.",
    "about.text2": "Специализируюсь на Python, React, Node.js и Linux. Беру проект от концепции до продакшена, работаю с полным стеком. Мой подход: понять проблему, выбрать правильные инструменты и построить то, что надежно работает.",
    "services.title": "Услуги",
    "services.subtitle": "Чем занимаюсь",
    "services.heading": "Что я могу для вас сделать",
    "services.description": "Полный цикл разработки - от концепции до деплоя. Работаю со всем стеком, чтобы создать готовое решение.",
    "projects.title": "Проекты",
    "projects.subtitle": "Мои работы",
    "projects.heading": "Избранные работы",
    "projects.description": "Реальные проекты, созданные с нуля - каждый решает конкретные задачи с помощью правильных технологий.",
    "contact.title": "Контакты",
    "contact.subtitle": "Связаться",
    "contact.heading": "Давайте создадим что-то вместе",
    "contact.text": "Есть проект или просто хотите пообщаться? Напишите мне в Телеграм - я всегда готов обсудить и реализовать именно ваш проект по отличной цене.",
    "contact.button": "Написать в Телеграм",
    "github.title": "Код",
    "github.subtitle": "GitHub репозитории",
    "footer.rights": "Все права защищены.",
    "notFound.title": "Страница не найдена",
    "notFound.text": "Такой страницы не существует. Возможно, она была перемещена или удалена.",
    "notFound.button": "На главную",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved && (saved === "en" || saved === "ru")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
