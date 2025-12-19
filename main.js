document.addEventListener("DOMContentLoaded", () => {
  console.log("%cДобро пожаловать на сайт Матвея! 🚀", "color:#38bdf8;font-weight:bold;font-size:14px;");

  // ============= INTERSECTION OBSERVER FOR ANIMATIONS =============
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(el => {
    observer.observe(el);
  });

  // ============= LANGUAGE SWITCHER =============
  const langRu = document.getElementById('lang-ru');
  const langEn = document.getElementById('lang-en');

  const translations = {
    ru: {
      title: "Матвей",
      subtitle: "Python-разработчик • Создаю ботов, скрипты и сайты",
      heroTitle: "Привет! Я Матвей",
      heroText1: "Я - Python-разработчик, специализирующийся на создании Telegram-ботов, различных скриптов и автоматизаций. Также могу разрабатывать сайты (фронтенд и бэкенд).",
      heroText2: "Работаю над любыми задачами - от простых инструментов до сложных решений. Если нужно, обсудим индивидуальные проекты не только на Python.",
      portfolioTitle: "Портфолио",
      project1Title: "Telegram-боты",
      project1Desc: "Разработка автоматизированных ботов для различных задач: уведомления, управление контентом, интеграции с API.",
      project2Title: "Скрипты и автоматизации",
      project2Desc: "Создание скриптов для обработки данных, веб-скрапинга, автоматизации рутинных процессов.",
      project3Title: "Веб-разработка",
      project3Desc: "Фронтенд и бэкенд решения, от лендингов до сложных веб-приложений.",
      contactsTitle: "Контакты",
      contactsText: "Свяжитесь со мной для обсуждения проектов",
      telegram: "Telegram",
      github: "GitHub",
      discord: "Discord",
      email: "Gmail",
      youtube: "YouTube",
      navigation: "Навигация",
      about: "О себе",
      copyright: "© 2025 KusokMedi. Все права защищены.",
      developer: "Python-разработчик"
    },
    en: {
      title: "Matvey",
      subtitle: "Python Developer • Creating bots, scripts and websites",
      heroTitle: "Hello! I'm Matvey",
      heroText1: "I'm a Python developer specializing in creating Telegram bots, various scripts and automations. I can also develop websites (frontend and backend).",
      heroText2: "I work on any tasks - from simple tools to complex solutions. If needed, we can discuss individual projects not only in Python.",
      portfolioTitle: "Portfolio",
      project1Title: "Telegram Bots",
      project1Desc: "Development of automated bots for various tasks: notifications, content management, API integrations.",
      project2Title: "Scripts and Automations",
      project2Desc: "Creating scripts for data processing, web scraping, automating routine processes.",
      project3Title: "Web Development",
      project3Desc: "Frontend and backend solutions, from landing pages to complex web applications.",
      contactsTitle: "Contacts",
      contactsText: "Contact me to discuss projects",
      telegram: "Telegram",
      github: "GitHub",
      discord: "Discord",
      email: "Gmail",
      youtube: "YouTube",
      navigation: "Navigation",
      about: "About",
      copyright: "© 2025 KusokMedi. All rights reserved.",
      developer: "Python-developer"
    }
  };

  function setLanguage(lang) {
    document.querySelector('header h1').textContent = translations[lang].title;
    document.querySelector('.subtitle').textContent = translations[lang].subtitle;
    document.querySelector('#hero h2').textContent = translations[lang].heroTitle;
    
    const heroParagraphs = document.querySelectorAll('#hero p');
    heroParagraphs[0].textContent = translations[lang].heroText1;
    heroParagraphs[1].textContent = translations[lang].heroText2;
    
    document.querySelector('#portfolio h2').textContent = translations[lang].portfolioTitle;
    
    const projectCards = document.querySelectorAll('.project');
    projectCards[0].querySelector('h3').textContent = translations[lang].project1Title;
    projectCards[0].querySelector('p').textContent = translations[lang].project1Desc;
    projectCards[1].querySelector('h3').textContent = translations[lang].project2Title;
    projectCards[1].querySelector('p').textContent = translations[lang].project2Desc;
    projectCards[2].querySelector('h3').textContent = translations[lang].project3Title;
    projectCards[2].querySelector('p').textContent = translations[lang].project3Desc;
    
    document.querySelector('#contacts h2').textContent = translations[lang].contactsTitle;
    document.querySelector('#contacts > p').textContent = translations[lang].contactsText;
    
    document.querySelectorAll('.contact-link span')[0].textContent = translations[lang].telegram;
    document.querySelectorAll('.contact-link span')[1].textContent = translations[lang].github;
    document.querySelectorAll('.contact-link span')[2].textContent = translations[lang].discord;
    document.querySelectorAll('.contact-link span')[3].textContent = translations[lang].email;
    document.querySelectorAll('.contact-link span')[4].textContent = translations[lang].youtube;
    
    // Обновление футера
    document.querySelector('.quick-links h4').textContent = translations[lang].navigation;
    document.querySelectorAll('.quick-links a')[0].textContent = translations[lang].portfolioTitle;
    document.querySelectorAll('.quick-links a')[1].textContent = translations[lang].contactsTitle;
    document.querySelectorAll('.quick-links a')[2].textContent = translations[lang].about;
    document.querySelector('.copyright').textContent = translations[lang].copyright;
    document.querySelector('.footer-info p').textContent = translations[lang].developer;

    langRu.classList.toggle('active', lang === 'ru');
    langEn.classList.toggle('active', lang === 'en');
  }

  langRu.addEventListener('click', () => setLanguage('ru'));
  langEn.addEventListener('click', () => setLanguage('en'));
  setLanguage('ru');

  // ============= ADDITIONAL INTERACTIONS =============
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Add hover effects to contact links
  const contactLinks = document.querySelectorAll('.contact-link');
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-8px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });

  // Add scroll to top button
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.innerHTML = '↑';
  scrollToTopButton.id = 'scrollToTop';
  scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(30, 41, 59, 0.7);
    color: var(--accent-primary);
    border: 1px solid rgba(56, 189, 248, 0.3);
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
  `;
  document.body.appendChild(scrollToTopButton);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.opacity = '1';
    } else {
      scrollToTopButton.style.opacity = '0';
    }
  });

  scrollToTopButton.addEventListener('click', () => {
    smoothScrollToTop();
  });
  
  // Добавляем обработчик для кнопки "Наверх" в футере
  const footerBackToTopButton = document.querySelector('.back-to-top');
  if (footerBackToTopButton) {
    footerBackToTopButton.addEventListener('click', () => {
      smoothScrollToTop();
    });
  }

  // ============= SMOOTH SCROLLING =============
  
  // Custom smooth scroll to top
  function smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Override anchor link scrolling with smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 50; // Смещение на 50 пикселей вверх
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Скрываем основную кнопку прокрутки при приближении к футеру
  const footerElement = document.querySelector('footer');
  if (footerElement) {
    window.addEventListener('scroll', () => {
      const footerPosition = footerElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Если футер появляется в окне просмотра, скрываем кнопку
      if (footerPosition < windowHeight * 0.8) {
        scrollToTopButton.style.opacity = '0';
      } else if (window.pageYOffset > 300) {
        // Возвращаем кнопку, если мы не внизу страницы
        scrollToTopButton.style.opacity = '1';
      }
    });
  }

  // ============= SNOW EFFECT =============
  // Create snow container
  const snowContainer = document.createElement('div');
  snowContainer.id = 'snow';
  snowContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2;
    overflow: hidden;
  `;
  document.body.appendChild(snowContainer);

  // Create snowflakes with pre-warming
  function createSnowflakes() {
    // Clear existing snowflakes
    snowContainer.innerHTML = '';
    
    const snowflakeCount = 150;
    
    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.innerHTML = '❄';
      
      // Randomize properties
      const size = Math.random() * 25 + 15;
      const opacity = 0.2 + Math.random() * 0.6; // От 20% до 80%
      const fallDuration = Math.random() * 20 + 15;
      // Start falling immediately with minimal delay
      const fallDelay = Math.random() * 2;
      
      // Pre-warm: distribute snowflakes vertically throughout the viewport
      const verticalPos = Math.random() * window.innerHeight;
      
      snowflake.style.cssText = `
        position: fixed;
        top: ${verticalPos}px;
        color: rgba(255, 255, 255, 0.8);
        font-size: ${size}px;
        opacity: ${opacity};
        animation: fall ${fallDuration}s linear infinite;
        animation-delay: -${fallDelay}s;
        left: ${Math.random() * 100}%;
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        will-change: transform;
        z-index: -1;
      `;
      
      snowContainer.appendChild(snowflake);
    }
  }

  // Add CSS for snow animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
    
    #snow {
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -2;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // Handle window resize
  window.addEventListener('resize', () => {
    createSnowflakes();
  });

  // Initialize snow effect
  createSnowflakes();
  
  // Recreate snowflakes periodically to ensure they keep falling
  setInterval(createSnowflakes, 30000);
  
  // Функция для автоматического решения проблем с footer
  function fixFooterIssues() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    // Убедимся, что footer всегда внизу
    const body = document.body;
    const html = document.documentElement;
    const windowHeight = window.innerHeight;
    const bodyHeight = Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
    
    // Если контент меньше высоты окна, добавляем отступ для прижатия footer к низу
    if (bodyHeight < windowHeight) {
      const footerHeight = footer.offsetHeight;
      const extraPadding = windowHeight - bodyHeight;
      document.querySelector('main').style.paddingBottom = extraPadding + 'px';
    }
    
    // Проверяем и исправляем позиционирование footer
    const main = document.querySelector('main');
    if (main) {
      main.style.flex = '1';
    }
    
    // Убедимся, что body использует flexbox
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.minHeight = '100vh';
  }
  
  // Вызываем функцию при загрузке и изменении размера окна
  window.addEventListener('load', fixFooterIssues);
  window.addEventListener('resize', fixFooterIssues);
  
  // Наблюдаем за изменениями DOM для автоматического исправления
  const observerConfig = { childList: true, subtree: true };
  const bodyObserver = new MutationObserver(fixFooterIssues);
  bodyObserver.observe(document.body, observerConfig);
});
