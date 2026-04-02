document.addEventListener("DOMContentLoaded", () => {
    // Настраиваем Intersection Observer для анимаций при скролле
    const observerOptions = {
        root: null, // отслеживаем по viewport
        rootMargin: "0px",
        threshold: 0.15 // Элемент начнет появляться, когда 15% его будет видно
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс, который запускает CSS-транзицию
                entry.target.classList.add('show');
                // Прекращаем наблюдение, чтобы анимация проигралась только один раз
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Находим все элементы с классом hidden
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => {
        observer.observe(el);
    });

    // Плавный скролл для якорных ссылок (на случай если браузер не поддерживает CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});