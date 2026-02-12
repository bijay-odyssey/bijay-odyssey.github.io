(function() {
    'use strict';
    
    const config = {
        scrollRevealOffset: 100,
        statsAnimationDuration: 2000,
        particleCount: 50,
        backToTopThreshold: 300
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle utility
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }


    
    function initPageLoad() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    // Remove from DOM after transition
                    setTimeout(() => {
                        if (loadingScreen.parentNode) {
                            loadingScreen.parentNode.removeChild(loadingScreen);
                        }
                    }, 500);
                }
                
                // Trigger initial scroll reveal check
                checkScrollReveal();
            }, 300);
        });

        // Set current year
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }


    function initNavbar() {
        const navbar = document.getElementById('mainNav');
        if (!navbar) return;

        const handleScroll = throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    
    function initSmoothScroll() {
        // Only apply if not using reduced motion
        if (prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
            return;
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || !href) return;
                
                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                
                const navbar = document.getElementById('mainNav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }

                // Close mobile menu
                closeMobileMenu();
            });
        });
    }

    function closeMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler) {
                toggler.click();
            }
        }
    }

    
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        const navbar = document.getElementById('mainNav');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        const updateActiveLink = throttle(function() {
            const scrollPosition = window.pageYOffset + navbarHeight + 100;
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }, 100);

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    
    function initScrollReveal() {
        if (prefersReducedMotion) return;

        const revealElements = document.querySelectorAll('.scroll-reveal');
        if (revealElements.length === 0) return;

        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for older browsers
            window.addEventListener('scroll', debounce(checkScrollReveal, 50), { passive: true });
        }
    }

    function checkScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - config.scrollRevealOffset) {
                element.classList.add('revealed');
            }
        });
    }

    
    function initStatsAnimation() {
        if (prefersReducedMotion) {
            // Just set final values immediately
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.dataset.target);
                if (!isNaN(target)) {
                    stat.textContent = formatStatNumber(target);
                }
            });
            return;
        }

        const statsContainer = document.querySelector('.hero-stats');
        if (!statsContainer) return;

        // Use Intersection Observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        animateStats(entry.target);
                        entry.target.classList.add('counted');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsContainer);
        } else {
            // Fallback
            window.addEventListener('scroll', function checkStats() {
                const rect = statsContainer.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75 && !statsContainer.classList.contains('counted')) {
                    animateStats(statsContainer);
                    statsContainer.classList.add('counted');
                    window.removeEventListener('scroll', checkStats);
                }
            }, { passive: true });
        }
    }

    function animateStats(container) {
        const statNumbers = container.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            if (isNaN(target)) return;

            const duration = config.statsAnimationDuration;
            const steps = 60;
            const stepDuration = duration / steps;
            const increment = target / steps;
            
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current += increment;
                
                if (step >= steps) {
                    stat.textContent = formatStatNumber(target);
                    clearInterval(timer);
                } else {
                    stat.textContent = formatStatNumber(Math.floor(current));
                }
            }, stepDuration);
        });
    }

    function formatStatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        } else {
            return num + '+';
        }

    
    function initParticles() {
        if (prefersReducedMotion) return;

        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const particleCount = Math.min(config.particleCount, Math.floor(canvas.width / 20));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        // Initialize
        resizeCanvas();
        createParticles();
        drawParticles();

        // Handle resize
        window.addEventListener('resize', debounce(() => {
            resizeCanvas();
            createParticles();
        }, 250));

        // Pause when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            } else {
                drawParticles();
            }
        });
    }

    
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        const handleScroll = throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > config.backToTopThreshold) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    }

    
    function initCardEffects() {
        const cards = document.querySelectorAll('.project-card, .experience-card, .skills-card, .contact-card');
        
        cards.forEach(card => {
            // Add 3D tilt effect on mouse move (desktop only)
            if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            }

            // Touch support for mobile
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });

            card.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }

    
    function initMobileMenu() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const navbar = document.getElementById('mainNav');
            const toggler = document.querySelector('.navbar-toggler');
            const navCollapse = document.querySelector('.navbar-collapse');
            
            if (navbar && navCollapse && navCollapse.classList.contains('show')) {
                if (!navbar.contains(event.target)) {
                    if (toggler) {
                        toggler.click();
                    }
                }
            }
        });
    }

    
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            const activeElement = document.activeElement;
            const isInput = activeElement && 
                (activeElement.tagName === 'INPUT' || 
                 activeElement.tagName === 'TEXTAREA' || 
                 activeElement.isContentEditable);

            // Don't interfere with form inputs
            if (isInput) return;

            // Escape key - close mobile menu
            if (e.key === 'Escape') {
                closeMobileMenu();
            }

            // H key - go to home
            if (e.key === 'h' || e.key === 'H') {
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    window.scrollTo({ 
                        top: 0, 
                        behavior: prefersReducedMotion ? 'auto' : 'smooth' 
                    });
                }
            }
        });
    }

    
    function initPerformance() {
        // Lazy load images (if any future images use data-src)
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

        // Prefetch links on hover
        if ('IntersectionObserver' in window) {
            const linkObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const link = entry.target;
                        link.addEventListener('mouseenter', function() {
                            const href = this.getAttribute('href');
                            if (href && href.startsWith('http')) {
                                const linkPrefetch = document.createElement('link');
                                linkPrefetch.rel = 'prefetch';
                                linkPrefetch.href = href;
                                document.head.appendChild(linkPrefetch);
                            }
                        }, { once: true });
                        linkObserver.unobserve(link);
                    }
                });
            });

            document.querySelectorAll('a[href^="http"]').forEach(link => {
                linkObserver.observe(link);
            });
        }
    }


    
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
                console.warn('Failed to load resource:', e.target.src || e.target.href);
            }
        }, true);
    }
    
    function initConsoleBranding() {
        const styles = [
            'font-size: 20px',
            'color: #0066cc',
            'font-weight: bold',
            'font-family: Outfit, sans-serif',
            'text-shadow: 2px 2px 4px rgba(0,0,0,0.2)'
        ].join(';');

        const infoStyles = [
            'font-size: 14px',
            'color: #475569',
            'font-family: Outfit, sans-serif'
        ].join(';');

        console.log('%c🚀 Data Scientist Portfolio', styles);
        console.log('%cBuilt with modern web standards and cross-browser compatibility', infoStyles);
        console.log('%cGitHub: https://github.com/bijay-odyssey', infoStyles);
    }

    
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runInit);
        } else {
            runInit();
        }
    }

    function runInit() {
        try {
            initPageLoad();
            initNavbar();
            initSmoothScroll();
            initActiveNavigation();
            initScrollReveal();
            initStatsAnimation();
            initParticles();
            initBackToTop();
            initCardEffects();
            initMobileMenu();
            initKeyboardNav();
            initPerformance();
            initErrorHandling();
            initConsoleBranding();

            console.log('Portfolio initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    // Start initialization
    init();

})();
