// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active navigation link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Email copy to clipboard functionality
const emailElements = document.querySelectorAll('.contact-icon + h6 + p');
emailElements.forEach(element => {
    const text = element.textContent.trim();
    if (text.includes('@')) {
        element.style.cursor = 'pointer';
        element.setAttribute('title', 'Click to copy email');
        
        element.addEventListener('click', () => {
            navigator.clipboard.writeText(text).then(() => {
                // Create temporary notification
                const originalText = element.innerHTML;
                element.innerHTML = '<span class="text-success">✓ Copied!</span>';
                
                setTimeout(() => {
                    element.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    }
});

// Add animation to stat numbers on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat-box h3');
            
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const hasPlus = finalValue.includes('+');
                const number = parseInt(finalValue.replace(/\D/g, ''));
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    }
                }, 30);
            });
            
            entry.target.classList.add('animated');
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, observerOptions);
const statsSection = document.querySelector('.hero-section .row.g-4');

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = '';
    });
});

// Console message for developers
console.log('%c Hello, Developer!', 'font-size: 20px; color: #0d6efd; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub:', 'font-size: 14px; color: #6c757d;');
console.log('%chttps://github.com/bijay-odyssey', 'font-size: 14px; color: #0d6efd; font-weight: bold;');

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroSection.style.transform = `translateY(${parallax}px)`;
    }
});

// Track external link clicks (for analytics)
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('External link clicked:', this.href);
    });
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add scroll-to-top button functionality (optional enhancement)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'btn btn-primary rounded-circle position-fixed';
    button.style.cssText = `
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
};

createScrollToTopButton();

// Performance optimization: Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation helper (for future contact form)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! ✨');
});
