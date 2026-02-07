document.addEventListener('DOMContentLoaded', () => {
    /* AOS */
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    /* Body fade-in */
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    /* Navbar shrink on scroll */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.style.padding = window.scrollY > 50 ? '0.5rem 0' : '1rem 0';
    });

    /* Smooth anchor scroll */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            const offset = navbar?.offsetHeight || 0;

            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });

            document
                .querySelector('.navbar-collapse')
                ?.classList.remove('show');
        });
    });

    /* Active nav link */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 150) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    });

    /* Stat counter */
    const statsSection = document.querySelector('.hero-section');
    if (statsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target
                    .querySelectorAll('.stat-box h3')
                    .forEach(stat => {
                        const value = stat.textContent;
                        const number = parseInt(value.replace(/\D/g, ''), 10);
                        const suffix = value.replace(/\d/g, '');
                        let current = 0;

                        const step = Math.ceil(number / 50);
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= number) {
                                stat.textContent = value;
                                clearInterval(timer);
                            } else {
                                stat.textContent = current + suffix;
                            }
                        }, 25);
                    });

                observer.disconnect();
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    /* Email copy */
    document.querySelectorAll('.contact-email').forEach(el => {
        el.style.cursor = 'pointer';
        el.title = 'Click to copy';

        el.addEventListener('click', () => {
            navigator.clipboard.writeText(el.textContent.trim()).then(() => {
                const original = el.textContent;
                el.textContent = '✓ Copied!';
                el.classList.add('text-success');

                setTimeout(() => {
                    el.textContent = original;
                    el.classList.remove('text-success');
                }, 2000);
            });
        });
    });

    /* Keyboard shortcut */
    document.addEventListener('keydown', e => {
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    /* Dev console */
    console.log('%c👋 Hello, Developer!', 'font-size:20px;color:#0d6efd;font-weight:bold');
    console.log('%cPortfolio loaded successfully ✨', 'color:#6c757d');
});
