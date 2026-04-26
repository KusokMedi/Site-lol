// Random BG with Fallbacks
const bgContainer = document.getElementById('heroBg');
const fallbacks = [
    'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932',
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070'
];

function setBg() {
    const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    const testImage = new Image();
    const customPath = `/bgs/photo_${Math.floor(Math.random() * 4) + 1}_2026-04-26_16-16-29.jpg`;
    testImage.src = customPath;
    testImage.onload = () => { bgContainer.style.backgroundImage = `url(${customPath})`; };
    testImage.onerror = () => { bgContainer.style.backgroundImage = `url(${randomFallback})`; };
}

// Orb following mouse
const orb = document.getElementById('orb');
document.addEventListener('mousemove', (e) => {
    orb.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
});

// Logo Particles
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
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 1.5 + 1
        });
    }
}

function animateLogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00d4ff";
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateLogo);
}

// Background particles
function createBgParticles() {
    const container = document.querySelector('.bg-particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Header height
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Fade in animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe elements for fade in
document.querySelectorAll('.glass-card, section, .cta-box, footer').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

window.onload = () => { 
    setBg(); 
    initLogo(); 
    animateLogo(); 
    createBgParticles();
};
window.onresize = initLogo;