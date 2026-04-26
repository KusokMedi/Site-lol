// Enhanced BG with Fallbacks - STATIC IMAGE
const bgContainer = document.getElementById('heroBg');
const bgImages = [
    '/bgs/photo_1_2026-04-26_16-16-29.jpg',
    '/bgs/photo_2_2026-04-26_16-16-29.jpg',
    '/bgs/photo_3_2026-04-26_16-16-29.jpg',
    '/bgs/photo_4_2026-04-26_16-16-29.jpg'
];

const fallbacks = [
    'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932',
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070'
];

function getRandomBg() {
    return bgImages[Math.floor(Math.random() * bgImages.length)];
}

function setBg(imagePath = null) {
    const path = imagePath || getRandomBg();
    const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    
    // Fade out
    bgContainer.style.opacity = '0';
    bgContainer.style.transition = 'opacity 0.8s ease-out';
    
    setTimeout(() => {
        const testImage = new Image();
        testImage.src = path;
        testImage.onload = () => {
            bgContainer.style.backgroundImage = `url(${path})`;
            bgContainer.style.opacity = '1';
        };
        testImage.onerror = () => {
            bgContainer.style.backgroundImage = `url(${fallback})`;
            bgContainer.style.opacity = '1';
        };
    }, 400);
}

// Orb following mouse with smooth easing
const orb = document.getElementById('orb');
let orbX = 0, orbY = 0;
let targetOrbX = 0, targetOrbY = 0;

document.addEventListener('mousemove', (e) => {
    targetOrbX = e.clientX - 300;
    targetOrbY = e.clientY - 300;
});

function animateOrb() {
    orbX += (targetOrbX - orbX) * 0.1;
    orbY += (targetOrbY - orbY) * 0.1;
    orb.style.transform = `translate(${orbX}px, ${orbY}px)`;
    requestAnimationFrame(animateOrb);
}

animateOrb();

// Logo click to scroll to top
const logoWrapper = document.querySelector('.logo-wrapper');
logoWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
        duration: 1000
    });
});
const canvas = document.getElementById("logoCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function initLogo() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    particles = [];
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
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


// Enhanced Background particles with better animation
function createBgParticles() {
    const container = document.querySelector('.bg-particles');
    if (!container) return;
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        const randomSize = Math.random() * 3 + 1;
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
        container.appendChild(particle);
    }
}

// Smooth scroll with offset for section navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        
        const offset = 90; // Header height + padding
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
            duration: 1000
        });
    });
});

// Advanced Intersection Observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            // Stagger animations
            entry.target.style.animationDelay = (index * 0.1) + 's';
        }
    });
}, observerOptions);

// Observe all animated elements
window.addEventListener('load', () => {
    document.querySelectorAll('section, .glass-card, .cta-box, footer').forEach(el => {
        observer.observe(el);
    });
});

// Initialization on page load
window.addEventListener('load', () => {
    // Set initial background with fade in
    bgContainer.style.opacity = '0';
    setBg();
    
    // Initialize logo animation
    initLogo();
    animateLogo();
    
    // Create background particles
    createBgParticles();
    
    // NOTE: BG rotation disabled - keeping static image
});

// Reinitialize logo on window resize
window.addEventListener('resize', () => {
    initLogo();
});