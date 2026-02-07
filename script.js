:root {
    /* Enterprise AI/ML Color Palette */
    --primary-color: #0066cc;
    --primary-dark: #0052a3;
    --primary-light: #e6f0ff;
    --secondary-color: #6c757d;
    --dark-color: #0f172a;
    --dark-light: #1a202c;
    --light-bg: #f8fafc;
    --slate-200: #e2e8f0;
    --slate-400: #94a3b8;
    --slate-600: #475569;
    --slate-700: #334155;
    --slate-900: #0f172a;
    --accent-cyan: #06b6d4;
    --success: #22c55e;
    --warning: #f59e0b;
    --danger: #ef4444;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--dark-color);
    background-color: #fff;
    line-height: 1.6;
    overflow-x: hidden;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--dark-color);
}

p {
    color: var(--slate-700);
    line-height: 1.7;
}

.text-muted {
    color: var(--slate-600) !important;
}

.lh-lg {
    line-height: 1.8;
}

/* Spacing Utilities */
.py-6 {
    padding-top: 5rem;
    padding-bottom: 5rem;
}

@media (max-width: 768px) {
    .py-6 {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
}

/* Navigation */
#mainNav {
    padding: 1rem 0;
    background: linear-gradient(135deg, var(--dark-color) 0%, var(--dark-light) 100%);
    box-shadow: 0 2px 20px rgba(15, 23, 42, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

#mainNav.scrolled {
    padding: 0.7rem 0;
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.15);
}

.navbar-brand {
    font-size: 1.4rem;
    letter-spacing: 2px;
    font-weight: 800;
    color: white !important;
    transition: transform 0.3s ease;
}

.navbar-brand:hover {
    transform: scale(1.05);
}

.brand-icon {
    display: inline-block;
    font-size: 1.6rem;
    margin-right: 0.5rem;
    color: var(--accent-cyan);
    font-weight: bold;
}

.nav-link {
    font-weight: 500;
    font-size: 0.95rem;
    margin: 0 0.75rem;
    color: rgba(255, 255, 255, 0.9) !important;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-cyan);
    transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-link:hover,
.nav-link.active {
    color: white !important;
}

/* Hero Section */
.hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(135deg, var(--dark-color) 0%, var(--dark-light) 100%);
    color: white;
    padding-top: 76px;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 50%, rgba(0, 102, 204, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%);
    animation: backgroundShift 20s ease-in-out infinite alternate;
}

@keyframes backgroundShift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(40px, -40px) scale(1.05); }
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-tag {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--accent-cyan);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1rem;
}

.hero-title {
    font-size: clamp(2.8rem, 8vw, 4.2rem);
    line-height: 1.1;
    margin: 1rem 0;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.9) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.85);
    margin: 1.5rem 0 2rem;
    max-width: 700px;
    line-height: 1.6;
    font-weight: 400;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-top: 2.5rem;
}

.hero-actions .btn {
    padding: 0.85rem 2.2rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 1.05rem;
}

.btn-primary {
    background: var(--primary-color);
    border: none;
    box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 102, 204, 0.4);
}

.btn-outline-light {
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.8);
    background: transparent;
}

.btn-outline-light:hover {
    background: white;
    color: var(--primary-color);
    border-color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

/* Hero Stats */
.hero-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 2.5rem;
    max-width: 550px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 2.5rem;
    margin-top: 3rem;
}

.stat-card {
    text-align: center;
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-number {
    font-size: 2.8rem;
    font-weight: 800;
    color: var(--accent-cyan);
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 10px rgba(6, 182, 212, 0.3);
}

.stat-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.75);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 500;
}

/* Section Headers */
.section-header {
    margin-bottom: 4rem;
}

.section-title {
    font-size: clamp(1.9rem, 5vw, 2.8rem);
    margin-bottom: 1.5rem;
    color: var(--dark-color);
    position: relative;
    display: inline-block;
}

.title-underline {
    width: 70px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-cyan));
    margin-left: auto;
    margin-right: auto;
    border-radius: 2px;
}

/* About Section */
.bg-body {
    background-color: #fff;
}

.about-info {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    margin-top: 2.5rem;
}

.info-row {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--slate-200);
}

.info-row:last-child {
    border-bottom: none;
}

.info-row i {
    color: var(--primary-color);
    flex-shrink: 0;
    margin-top: 0.25rem;
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
}

.info-row span {
    color: var(--slate-700);
    font-weight: 500;
    font-size: 1rem;
}

/* Expertise Grid */
.expertise-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.8rem;
}

.expertise-card {
    padding: 2rem;
    background: var(--light-bg);
    border-radius: 12px;
    border-left: 4px solid var(--primary-color);
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.expertise-card:hover {
    box-shadow: 0 8px 24px rgba(0, 102, 204, 0.1);
    transform: translateY(-5px);
}

.expertise-card h5 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--primary-color);
    margin-bottom: 1.2rem;
    font-weight: 700;
}

.quick-links {
    display: grid;
    gap: 0.9rem;
}

.quick-link-btn {
    padding: 0.8rem 1.2rem;
    background: var(--primary-light);
    color: var(--primary-dark);
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid transparent;
}

.quick-link-btn:hover {
    background: var(--primary-color);
    color: white;
    transform: translateX(5px);
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
}

/* Experience Section */
.bg-light {
    background-color: var(--light-bg) !important;
}

.experience-card {
    padding: 2.2rem;
    background: white;
    border: 1px solid var(--slate-200);
    border-radius: 12px;
    transition: all 0.3s ease;
    margin-bottom: 1.8rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.experience-card:hover {
    box-shadow: 0 12px 32px rgba(0, 102, 204, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-5px);
}

.exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.exp-header h4 {
    color: var(--dark-color);
    font-size: 1.3rem;
    margin-bottom: 0.25rem;
}

.exp-badge {
    display: inline-block;
    padding: 0.45rem 1rem;
    background: var(--primary-light);
    color: var(--primary-dark);
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
}

.exp-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
}

.exp-list li {
    padding: 0.6rem 0;
    padding-left: 1.8rem;
    position: relative;
    color: var(--slate-700);
    font-size: 0.98rem;
    line-height: 1.6;
}

.exp-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-size: 1.3rem;
    font-weight: bold;
}

.exp-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--slate-200);
}

.exp-badges .badge {
    padding: 0.5rem 0.9rem;
    background: var(--light-bg);
    color: var(--slate-700);
    border: 1px solid var(--slate-300);
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s ease;
}

.exp-badges .badge:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

/* Projects Section */
.project-card {
    padding: 2.2rem;
    background: white;
    border: 1px solid var(--slate-200);
    border-radius: 12px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.project-card:hover {
    box-shadow: 0 16px 40px rgba(0, 102, 204, 0.12);
    border-color: var(--primary-color);
    transform: translateY(-8px);
}

.project-featured {
    border-left: 5px solid var(--primary-color);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.02), rgba(118, 75, 162, 0.02));
}

.ribbon {
    position: absolute;
    top: 18px;
    right: -6px;
    background: var(--primary-color);
    color: white;
    padding: 0.35rem 1.2rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.ribbon::before {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 0;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid var(--primary-dark);
    border-bottom: 6px solid transparent;
}

.project-icon {
    flex-shrink: 0;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-color), #0066cc);
    color: white;
    border-radius: 12px;
    font-size: 1.6rem;
    transition: all 0.3s ease;
}

.project-card:hover .project-icon {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 20px rgba(0, 102, 204, 0.3);
}

.project-description {
    color: var(--slate-600);
    font-size: 0.98rem;
    flex-grow: 1;
    margin: 1rem 0;
}

.project-link {
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--slate-200);
}

.project-link:hover {
    color: var(--primary-dark);
    gap: 1rem;
}

/* Skills Section */
.skills-card {
    padding: 2rem;
    background: white;
    border: 1px solid var(--slate-200);
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.skills-card:hover {
    box-shadow: 0 10px 28px rgba(0, 102, 204, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-4px);
}

.skills-card h5 {
    color: var(--dark-color);
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.85rem;
}

.skill-badge {
    display: inline-block;
    padding: 0.6rem 1rem;
    background: var(--light-bg);
    color: var(--slate-700);
    border: 1px solid var(--slate-200);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s ease;
    cursor: default;
}

.skill-badge:hover {
    background: var(--primary-light);
    border-color: var(--primary-color);
    color: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 102, 204, 0.15);
}

/* Research Section */
.research-card {
    padding: 2.8rem;
    background: white;
    border: 1px solid var(--slate-200);
    border-radius: 12px;
    display: flex;
    gap: 2.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.research-card:hover {
    box-shadow: 0 12px 32px rgba(0, 102, 204, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-4px);
}

.research-icon {
    flex-shrink: 0;
    font-size: 2.8rem;
    color: var(--primary-color);
    opacity: 0.9;
    margin-top: 0.5rem;
}

.research-content {
    flex: 1;
}

.research-content h4 {
    color: var(--dark-color);
    font-size: 1.25rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
}

.research-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.5rem;
}

.research-tag {
    display: inline-block;
    padding: 0.45rem 0.9rem;
    background: var(--light-bg);
    color: var(--primary-color);
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
}

/* Contact Section */
.contact-card {
    padding: 2.2rem;
    background: white;
    border: 1px solid var(--slate-200);
    border-radius: 12px;
    transition: all 0.3s ease;
    text-align: center;
    cursor: default;
    height: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.contact-card:hover {
    box-shadow: 0 10px 28px rgba(0, 102, 204, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-5px);
}

.contact-card a {
    color: inherit;
    text-decoration: none;
    display: block;
    height: 100%;
}

.contact-card i {
    color: var(--primary-color);
    margin-bottom: 1.2rem;
    display: block;
    transition: transform 0.3s ease;
    font-size: 2.2rem;
}

.contact-card:hover i {
    transform: scale(1.1);
}

.contact-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.contact-card h6 {
    color: var(--dark-color);
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

/* Social Links */
.social-links {
    display: flex;
    justify-content: center;
    gap: 1.8rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: var(--light-bg);
    color: var(--primary-color);
    font-size: 1.4rem;
    transition: all 0.3s ease;
    text-decoration: none;
    border: 1px solid transparent;
}

.social-link:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-6px) scale(1.1);
    box-shadow: 0 10px 22px rgba(0, 102, 204, 0.25);
    border-color: var(--primary-color);
}

/* Footer */
footer {
    background: var(--dark-color);
    color: white;
    padding: 2rem 0;
}

footer p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0;
}

/* Utility Classes */
.fw-500 {
    font-weight: 500;
}

.text-primary {
    color: var(--primary-color) !important;
}

/* Accessibility & Motion Preferences */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .hero-background {
        animation: none;
    }
    
    .hero-stats,
    .project-card,
    .experience-card,
    .skills-card,
    .contact-card {
        transform: none !important;
    }
}

/* Responsive Design */
@media (max-width: 1200px) {
    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
}

@media (max-width: 992px) {
    .hero-subtitle {
        font-size: 1.2rem;
    }
    
    .hero-stats {
        gap: 2rem;
    }
    
    .research-card {
        flex-direction: column;
        gap: 1.8rem;
        padding: 2.2rem;
    }
    
    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
    
    .project-icon {
        width: 50px;
        height: 50px;
        font-size: 1.4rem;
    }
}

@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.2rem;
    }
    
    .nav-link {
        margin: 0.5rem 0;
        text-align: center;
    }
    
    .hero-section {
        padding-top: 70px;
        min-height: 90vh;
    }
    
    .hero-title {
        font-size: 2.4rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .hero-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .hero-actions .btn {
        width: 100%;
        text-align: center;
        justify-content: center;
    }
    
    .hero-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    
    .stat-number {
        font-size: 2.2rem;
    }
    
    .exp-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
    
    .contact-card {
        padding: 1.8rem;
    }
    
    .expertise-grid {
        margin-top: 2rem;
    }
    
    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 0.7rem;
    }
    
    .skill-badge {
        padding: 0.5rem 0.8rem;
        font-size: 0.85rem;
    }
    
    .social-link {
        width: 52px;
        height: 52px;
        font-size: 1.3rem;
    }
}

@media (max-width: 576px) {
    .hero-title {
        font-size: 2.1rem;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .stat-card {
        padding: 0.5rem;
    }
    
    .stat-number {
        font-size: 2rem;
    }
    
    .experience-card,
    .project-card,
    .skills-card,
    .research-card {
        padding: 1.5rem;
    }
    
    .research-card {
        flex-direction: column;
    }
    
    .research-icon {
        font-size: 2.2rem;
    }
    
    .social-links {
        gap: 1.2rem;
    }
    
    .social-link {
        width: 48px;
        height: 48px;
        font-size: 1.2rem;
    }
    
    .ribbon {
        padding: 0.3rem 1rem;
        font-size: 0.7rem;
    }
    
    .py-6 {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
    }
}

/* Print Styles */
@media print {
    .navbar,
    footer .text-muted,
    .hero-actions,
    .social-links,
    .btn {
        display: none !important;
    }
    
    .hero-section {
        background: white !important;
        color: black !important;
        min-height: auto;
        padding: 2rem 0 !important;
    }
    
    .hero-title {
        background: none !important;
        -webkit-text-fill-color: black !important;
        color: black !important;
    }
    
    .hero-subtitle {
        color: var(--slate-700) !important;
    }
    
    section {
        page-break-inside: avoid;
    }
    
    a {
        color: var(--primary-color) !important;
        text-decoration: none !important;
    }
    
    .project-card,
    .experience-card,
    .skills-card {
        break-inside: avoid;
        box-shadow: none !important;
        border: 1px solid #ddd !important;
    }
}
