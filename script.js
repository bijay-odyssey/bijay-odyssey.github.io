// Initialize AOS (Animate On Scroll) with proper loading detection
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    } else {
        console.warn('AOS library not loaded');
    }
    
    // Initialize all other functionality
    initNavbarScroll();
    initSmoothScroll();
    initActiveNavLink();
    initEmailCopy();
    initStatsAnimation();
    initCardHoverEffects();
    initMobileMenuClose();
    initPerformanceOptimizations();
    
    // Console welcome message
    console.log(
        '%c🎯 Data Scientist Portfolio',
        'font-size: 18px; color: #0066cc; font-weight: bold; font-family: Inter, sans-serif;'
    );
    console.log(
        '%cBuilt with modern web standards • Check out the code: https://github.com/bijay-odyssey',
        'font-size: 14px; color: #475569; font-family: Inter, sans-serif;'
    );
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('#mainNav');
    if (!navbar) return;
    
    const navbarHeight = navbar.offsetHeight;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for section links
            if (href.startsWith('#') && href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const navbar = document.querySelector('#mainNav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const offsetTop = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, href);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Close mobile menu function
function closeMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
    }
}

// Active navigation link highlight
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('#mainNav');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + navbarHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial update
    updateActiveNavLink();
    
    // Update on scroll (debounced for performance)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 50);
    }, { passive: true });
}

// Email copy functionality
function initEmailCopy() {
    const emailElements = document.querySelectorAll('a[href^="mailto:"]');
    
    emailElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Only copy on Ctrl+Click or Cmd+Click
            if (!e.ctrlKey && !e.metaKey) return;
            
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Try to copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                showCopyFeedback(this, '✓ Copied!');
            }).catch(err => {
                console.error('Clipboard copy failed:', err);
                // Fallback: Let browser handle mailto normally
                window.location.href = `mailto:${email}`;
            });
        });
    });
    
    function showCopyFeedback(element, message) {
        const originalText = element.innerHTML;
        const feedback = document.createElement('span');
        feedback.textContent = message;
        feedback.style.cssText = `
            color: var(--success);
            font-weight: 600;
            margin-left: 0.5rem;
            font-size: 0.9rem;
        `;
        
        element.appendChild(feedback);
        setTimeout(() => {
            if (feedback.parentNode === element) {
                element.removeChild(feedback);
            }
        }, 2000);
    }
}

// Animate stat numbers on scroll
function initStatsAnimation() {
    const statsContainer = document.querySelector('.hero-stats');
    if (!statsContainer) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    const hasPlus = finalValue.includes('+');
                    const hasMPlus = finalValue.includes('M');
                    const number = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (isNaN(number)) return;
                    
                    let current = 0;
                    const increment = Math.ceil(number / 40);
                    const duration = 1500; // ms
                    const steps = duration / 30;
                    const stepIncrement = number / steps;
                    
                    const timer = setInterval(() => {
                        current += stepIncrement;
                        if (current >= number) {
                            stat.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            const display = hasMPlus ? 
                                (current / 1000000).toFixed(1) + 'M' + (hasPlus ? '+' : '') :
                                Math.floor(current) + (hasPlus ? '+' : '');
                            stat.textContent = display;
                        }
                    }, 30);
                });
                
                entry.target.classList.add('animated');
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(animateStats, observerOptions);
    statsObserver.observe(statsContainer);
}

// Card hover effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .experience-card, .skills-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Add touch support for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Mobile menu close on link click
function initMobileMenuClose() {
    document.querySelectorAll('.navbar-collapse a.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
    
    // Lazy load images if any are added in future
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update any layout-dependent calculations here
        }, 250);
    });
    
    // Page visibility change handler
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Page became visible again
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    });
}

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home (when not in input)
    if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        const isInput = activeElement && 
            (activeElement.tagName === 'INPUT' || 
             activeElement.tagName === 'TEXTAREA' || 
             activeElement.isContentEditable);
        
        if (!isInput) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Press 'E' to focus on email
    if ((e.key === 'e' || e.key === 'E') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink) {
            e.preventDefault();
            emailLink.focus();
        }
    }
});

// External link tracking (optional analytics placeholder)
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        // Example: console.log('External link clicked:', this.href);
    });
});

// Handle page load transitions
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Remove initial loading class if present
    document.body.classList.remove('loading');
});

// Error handling for failed resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        console.warn('Failed to load resource:', e.target.src || e.target.href);
    }
}, true);
