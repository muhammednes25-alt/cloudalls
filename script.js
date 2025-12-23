/* script.js - Professional Polish */

// 1. PRELOADER (Hides the loading glitch)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. SCROLL REVEAL (Smoother settings)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 }); // Waits until 15% of item is visible

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. TYPEWRITER EFFECT
    const typeWriterElement = document.getElementById('typewriter-text');
    if (typeWriterElement) {
        const words = ["Multimedia Studio", "Tech Support", "Project Management", "Digital Growth"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? 40 : 90; // Slightly faster typing
            if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; speed = 2500; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
            
            setTimeout(type, speed);
        }
        type();
    }

    // 4. AUTO YEAR
    const yearSpan = document.querySelector('.current-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 5. 3D CARD TILT (Subtler movement)
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xRotate = ((y - rect.height / 2) / rect.height) * -5; // Reduced rotation for classier feel
            const yRotate = ((x - rect.width / 2) / rect.width) * 5;
            card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 6. COUNTERS
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / 60;
                let current = 0;
                const update = () => {
                    current += increment;
                    if(current < target) { counter.innerText = Math.ceil(current); requestAnimationFrame(update); }
                    else { counter.innerText = target + "+"; }
                };
                update();
                observer.unobserve(counter);
            }
        });
    });
    counters.forEach(c => counterObserver.observe(c));

    // 7. BACK TO TOP (Spinning animation)
    const backToTopBtn = document.getElementById('back-to-top');
    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        });
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});