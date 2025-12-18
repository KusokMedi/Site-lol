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
      heroText1: "Я — Python-разработчик, специализирующийся на создании Telegram-ботов, различных скриптов и автоматизаций. Также могу разрабатывать сайты (фронтенд и бэкенд).",
      heroText2: "Работаю над любыми задачами — от простых инструментов до сложных решений. Если нужно, обсудим индивидуальные проекты не только на Python.",
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
      youtube: "YouTube"
    },
    en: {
      title: "Matvey",
      subtitle: "Python Developer • Creating bots, scripts and websites",
      heroTitle: "Hello! I'm Matvey",
      heroText1: "I'm a Python developer specializing in creating Telegram bots, various scripts and automations. I can also develop websites (frontend and backend).",
      heroText2: "I work on any tasks — from simple tools to complex solutions. If needed, we can discuss individual projects not only in Python.",
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
      youtube: "YouTube"
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent-gradient);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
  `;
  document.body.appendChild(scrollToTopButton);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

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
    z-index: 9999;
    overflow: hidden;
  `;
  document.body.appendChild(snowContainer);

  // Create snowflakes
  function createSnowflakes() {
    const snowflakeCount = 150;
    
    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.innerHTML = '❄';
      snowflake.style.cssText = `
        position: absolute;
        top: -20px;
        color: #fff;
        font-size: ${Math.random() * 10 + 5}px;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: fall ${Math.random() * 10 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        left: ${Math.random() * 100}%;
        text-shadow: 0 0 5px #fff;
      `;
      snowContainer.appendChild(snowflake);
    }
  }

  // Add CSS for snow animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(105vh) rotate(${Math.random() * 360}deg);
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize snow effect
  createSnowflakes();
});
