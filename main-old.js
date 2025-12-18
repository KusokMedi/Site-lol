document.addEventListener("DOMContentLoaded", () => {
  console.log("%cДобро пожаловать на сайт Матвея!", "color:#00b4d8;font-weight:bold;");

  // Легкий эффект анимации логотипа
  const logo = document.querySelector(".logo");
  setInterval(() => {
    logo.classList.toggle("pulse");
  }, 3000);

  // Анимация появления при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Наблюдаем за элементами с классом fade
  document.querySelectorAll('.fade').forEach(el => {
    observer.observe(el);
  });

  // Переключатель языков
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
      email: "Email",
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
      email: "Email",
      youtube: "YouTube"
    }
  };

  function setLanguage(lang) {
    document.querySelector('h1').textContent = translations[lang].title;
    document.querySelector('.subtitle').textContent = translations[lang].subtitle;
    document.querySelector('#hero h2').textContent = translations[lang].heroTitle;
    document.querySelector('#hero p:nth-child(2)').textContent = translations[lang].heroText1;
    document.querySelector('#hero p:nth-child(3)').textContent = translations[lang].heroText2;
    document.querySelector('#portfolio h2').textContent = translations[lang].portfolioTitle;
    document.querySelectorAll('.project h3')[0].textContent = translations[lang].project1Title;
    document.querySelectorAll('.project p')[0].textContent = translations[lang].project1Desc;
    document.querySelectorAll('.project h3')[1].textContent = translations[lang].project2Title;
    document.querySelectorAll('.project p')[1].textContent = translations[lang].project2Desc;
    document.querySelectorAll('.project h3')[2].textContent = translations[lang].project3Title;
    document.querySelectorAll('.project p')[2].textContent = translations[lang].project3Desc;
    document.querySelector('#contacts h2').textContent = translations[lang].contactsTitle;
    document.querySelector('#contacts p').textContent = translations[lang].contactsText;
    document.querySelectorAll('.contact-link span')[0].textContent = translations[lang].telegram;
    document.querySelectorAll('.contact-link span')[1].textContent = translations[lang].github;
    document.querySelectorAll('.contact-link span')[2].textContent = translations[lang].discord;
    document.querySelectorAll('.contact-link span')[3].textContent = translations[lang].email;
    document.querySelectorAll('.contact-link span')[4].textContent = translations[lang].youtube;

    // Обновляем активную кнопку
    langRu.classList.toggle('active', lang === 'ru');
    langEn.classList.toggle('active', lang === 'en');
  }

  langRu.addEventListener('click', () => setLanguage('ru'));
  langEn.addEventListener('click', () => setLanguage('en'));

  // Устанавливаем русский по умолчанию
  setLanguage('ru');

  // ------------------ Routing: поддержка /ru/... и /en/... ------------------
  (function handlePathRouting() {
    try {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        const lang = parts[0];
        if (lang === 'ru' || lang === 'en') {
          setLanguage(lang);
          // если есть следующий сегмент — попробуем прокрутить к секции
          if (parts.length > 1) {
            const targetId = parts[1];
            const target = document.getElementById(targetId);
            if (target) {
              // отложим скролл до завершения рендеринга
              setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
            }
          }
          return;
        }
      }
      // если путь не содержит /ru или /en — ничего не делаем
    } catch (e) {
      console.error('Path routing failed', e);
    }
  })();

  // ============= ENHANCED CANVAS-BASED SNOW WITH INTERACTIVITY =============
  (function initAdvancedSnow() {
    try {
      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        filter: blur(1.2px);
      `;
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d', { alpha: true });
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      // Snowflake particle class
      class Snowflake {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.radius = Math.random() * 5.5 + 2; // 2-7.5px (значительно крупнее)
          this.opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0
          this.baseOpacity = this.opacity;
          
          // Different fall speeds based on size (parallax effect)
          this.speed = (this.radius / 2) + Math.random() * 1; // Smaller = slower
          
          // Sway/drift effect
          this.swayAmount = Math.random() * 40 + 20; // 20-60px oscillation
          this.swaySpeed = Math.random() * 0.01 + 0.003; // Speed of sway
          this.swayOffset = Math.random() * Math.PI * 2; // Random start phase
          this.time = 0;
        }

        update() {
          this.time += 1;
          
          // Vertical fall
          this.y += this.speed;
          
          // Horizontal sway (smooth oscillation)
          this.x += Math.sin(this.time * this.swaySpeed + this.swayOffset) * 0.15;
          
          // Wrap around screen
          if (this.y > height) {
            this.y = -10;
            this.x = Math.random() * width;
          }
          if (this.x > width + 10) this.x = -10;
          if (this.x < -10) this.x = width + 10;
        }

        draw(ctx) {
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Interactive effect: push away from mouse
        pushAwayFromMouse(mouseX, mouseY, distance = 80) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.hypot(dx, dy);
          
          if (dist < distance) {
            const force = (1 - dist / distance) * 2;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
            
            // Slightly increase opacity on interaction
            this.opacity = Math.min(this.baseOpacity + 0.3, 1);
          } else {
            // Fade back to normal opacity
            this.opacity = this.baseOpacity + (this.opacity - this.baseOpacity) * 0.95;
          }
        }
      }

      // Initialize snowflakes
      const particleCount = Math.min(150, Math.floor(width / 8));
      const snowflakes = [];
      for (let i = 0; i < particleCount; i++) {
        snowflakes.push(new Snowflake());
      }

      // Mouse tracking for interactivity
      let mouseX = width / 2;
      let mouseY = height / 2;
      let isMouseActive = false;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseActive = true;
      });

      document.addEventListener('mouseleave', () => {
        isMouseActive = false;
      });

      // Animation loop
      function animate() {
        // Clear canvas with semi-transparent background for motion blur effect
        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = 1;

        snowflakes.forEach(flake => {
          flake.update();
          
          // Apply mouse interaction
          if (isMouseActive) {
            flake.pushAwayFromMouse(mouseX, mouseY);
          }
          
          flake.draw(ctx);
        });

        requestAnimationFrame(animate);
      }

      // Handle window resize
      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      animate();
    } catch (e) {
      console.error('Advanced snow creation failed', e);
    }
  })();
});
