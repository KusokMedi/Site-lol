// Random background image
const bgImages = [
    'bgs/photo_1_2026-04-26_16-16-29.jpg',
    'bgs/photo_2_2026-04-26_16-16-29.jpg',
    'bgs/photo_3_2026-04-26_16-16-29.jpg',
    'bgs/photo_4_2026-04-26_16-16-29.jpg'
];

let currentBgIndex = -1;

function getRandomBgIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * bgImages.length);
    } while (newIndex === currentBgIndex);
    return newIndex;
}

function setRandomBg() {
    currentBgIndex = getRandomBgIndex();
    const randomImage = bgImages[currentBgIndex];
    const hero = document.querySelector('.hero');
    
    // Создаем overlay для плавной смены
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${randomImage}')`;
    overlay.style.backgroundPosition = 'center';
    overlay.style.backgroundSize = window.innerWidth <= 768 ? 'cover' : '125%';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 1.5s ease-in-out';
    overlay.style.zIndex = '0';
    
    hero.appendChild(overlay);
    
    // Запускаем fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
    
    // После завершения анимации меняем основной фон и удаляем overlay
    setTimeout(() => {
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${randomImage}')`;
        hero.style.backgroundPosition = 'center';
        hero.style.backgroundSize = window.innerWidth <= 768 ? 'cover' : '125%';
        overlay.remove();
    }, 1500);
}

function startBgRotation() {
    setInterval(() => {
        setRandomBg();
    }, Math.random() * 5000 + 5000); // 5-10 секунд
}

// Logo click to scroll to top
const logoWrapper = document.querySelector('.logo-wrapper');
logoWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Logo canvas animation
const canvas = document.getElementById("logoCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function initLogo() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    particles = [];
    for (let i = 0; i < 15; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.2,
            life: Math.random() * 100 + 50
        });
    }
}

function animateLogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.life = Math.random() * 100 + 50;
        }
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(animateLogo);
}


// Smooth scroll with offset for section navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        
        const offset = 90;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Scroll to top on page load/reload
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Initialization on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    
    // Hide loader after 1 second
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1000);
    
    setRandomBg();
    startBgRotation();
    initLogo();
    animateLogo();
});

// Dynamic header on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Burger menu toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close menu when clicking on link
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Reinitialize logo on window resize
window.addEventListener('resize', () => {
    initLogo();
});