// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});


// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    notification.style.transform = 'translateX(100%)';
    
    // Set colors based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            notification.style.color = 'white';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #60a5fa, #3b82f6)';
            notification.style.color = 'white';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const parallaxSpeed = scrolled * 0.5;
        heroVisual.style.transform = `translateY(${parallaxSpeed}px)`;
    }
});

// Stats Animation
const statCards = document.querySelectorAll('.stat-card');

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                animateStat(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statObserver.observe(card);
});

function animateStat(statElement) {
    const finalValue = parseInt(statElement.textContent.replace(/[^0-9]/g, ''));
    const isCurrency = statElement.textContent.includes('£');
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50);
    const duration = 2000;
    const startTime = Date.now();
    
    statElement.dataset.animated = true;
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        currentValue = Math.floor(progress * finalValue);
        
        if (isCurrency) {
            statElement.textContent = `£${currentValue.toLocaleString()}`;
        } else {
            statElement.textContent = currentValue.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Dark Mode Toggle (Enhanced Theme Switcher)
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.style.position = 'fixed';
darkModeToggle.style.bottom = '20px';
darkModeToggle.style.right = '20px';
darkModeToggle.style.width = '50px';
darkModeToggle.style.height = '50px';
darkModeToggle.style.borderRadius = '50%';
darkModeToggle.style.border = 'none';
darkModeToggle.style.background = 'var(--primary-color)';
darkModeToggle.style.color = 'white';
darkModeToggle.style.fontSize = '1.2rem';
darkModeToggle.style.cursor = 'pointer';
darkModeToggle.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
darkModeToggle.style.zIndex = '1000';
darkModeToggle.style.transition = 'all 0.3s ease';
darkModeToggle.style.backdropFilter = 'blur(10px)';
darkModeToggle.style.webkitBackdropFilter = 'blur(10px)';

// Enhanced dark mode styles for complete theme switching
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    /* Dark Mode Variables */
    :root[data-theme="dark"] {
        --primary-color: #7f53ff;
        --secondary-color: #e62594;
        --accent-color: #ff6b6b;
        --text-color: #e9ecef;
        --light-text: #121212;
        --bg-color: #0f0f13;
        --card-bg: #1a1a1f;
        --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        --border-color: #2d2d3a;
    }
    
    /* Light Mode Variables */
    :root[data-theme="light"] {
        --primary-color: #667eea;
        --secondary-color: #764ba2;
        --accent-color: #f093fb;
        --text-color: #333;
        --light-text: #f8f9fa;
        --bg-color: #f8f9fa;
        --card-bg: #ffffff;
        --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        --border-color: #e9ecef;
    }
    
    /* Apply theme styles */
    [data-theme="dark"] {
        background: var(--bg-color);
        color: var(--text-color);
        background-image: radial-gradient(circle at 25% 25%, rgba(127, 83, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(230, 37, 148, 0.15) 0%, transparent 50%);
    }
    
    [data-theme="dark"] .navbar {
        background: linear-gradient(180deg, rgba(26, 26, 31, 0.95), rgba(26, 26, 31, 0.85));
        border-bottom-color: var(--border-color);
        box-shadow: 0 8px 32px rgba(127, 83, 255, 0.2), 0 2px 10px rgba(230, 37, 148, 0.15);
    }
    
    [data-theme="dark"] .navbar::before {
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    }
    
    [data-theme="dark"] .nav-menu a {
        color: #cbd5e0;
        text-shadow: none;
    }
    
    [data-theme="dark"] .nav-menu a:hover {
        color: var(--primary-color);
    }
    
    [data-theme="dark"] .hero {
        background: linear-gradient(135deg, #1a1a1f 0%, #0f0f13 100%);
    }
    
    [data-theme="dark"] .stat-card {
        background: var(--card-bg);
        border-color: var(--border-color);
        box-shadow: var(--box-shadow);
    }
    
    [data-theme="dark"] .about, [data-theme="dark"] .categories, [data-theme="dark"] .submit, [data-theme="dark"] .leaderboard, [data-theme="dark"] .faq {
        background: linear-gradient(180deg, rgba(26, 26, 31, 0.5), transparent);
    }
    
    [data-theme="dark"] .about-card, [data-theme="dark"] .category-card, [data-theme="dark"] .info-form, [data-theme="dark"] .info-box, [data-theme="dark"] .faq-item {
        background: var(--card-bg);
        border-color: var(--border-color);
        box-shadow: var(--box-shadow);
    }
    
    [data-theme="dark"] .form-group input,
    [data-theme="dark"] .form-group textarea {
        background: #23232a;
        border-color: var(--border-color);
        color: var(--text-color);
    }
    
    [data-theme="dark"] .form-group input:focus,
    [data-theme="dark"] .form-group textarea:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(127, 83, 255, 0.3);
    }
    
    [data-theme="dark"] .custom-select select {
        background: #23232a;
        border-color: #2d2d3a;
        color: #e9ecef;
    }
    
    [data-theme="dark"] .custom-select select:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(127, 83, 255, 0.3);
    }
    
    [data-theme="dark"] .leaderboard-container {
        background: var(--card-bg);
        border-color: rgba(127, 83, 255, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="dark"] .leaderboard-header {
        background: linear-gradient(135deg, rgba(127, 83, 255, 0.15), rgba(230, 37, 148, 0.15));
        border-color: rgba(127, 83, 255, 0.4);
    }
    
    [data-theme="dark"] .leaderboard-row {
        background: #23232a;
        border-color: var(--border-color);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="dark"] .leaderboard-row:nth-child(odd) {
        background: linear-gradient(180deg, rgba(35, 35, 42, 0.8), rgba(26, 26, 31, 1));
    }
    
    [data-theme="dark"] .leaderboard-row.top-row {
        background: linear-gradient(135deg, #2a2040, #1f1630);
        border-color: #6b46c1;
        box-shadow: 0 15px 40px rgba(107, 70, 193, 0.3);
    }
    
    [data-theme="dark"] .name {
        color: #e9ecef !important;
    }
    
    [data-theme="dark"] .contributions {
        color: #e9ecef !important;
        background: rgba(127, 83, 255, 0.2) !important;
        border-color: rgba(127, 83, 255, 0.5) !important;
    }
    
    [data-theme="dark"] .footer {
        background: #121217;
    }
    
    [data-theme="dark"] .social-icons a {
        background: #2d2d3a;
    }
    
    [data-theme="dark"] .social-icons a:hover {
        background: var(--primary-color);
    }
    
    /* Smooth transitions for theme switching */
    :root {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    [data-theme="dark"] *,
    [data-theme="light"] * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
`;

document.head.appendChild(darkModeStyles);

// Add dark mode toggle to body
document.body.appendChild(darkModeToggle);

// Theme switching logic
darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button appearance
    if (newTheme === 'dark') {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        darkModeToggle.style.boxShadow = '0 4px 15px rgba(127, 83, 255, 0.4)';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        darkModeToggle.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    }
});

// Initialize theme (default to dark)
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || 'dark';
document.documentElement.setAttribute('data-theme', initialTheme);

// Update toggle button appearance based on initial theme
if (initialTheme === 'dark') {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    darkModeToggle.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    darkModeToggle.style.boxShadow = '0 4px 15px rgba(127, 83, 255, 0.4)';
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    darkModeToggle.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
}

// Initialize tooltips for reward badges
const rewardBadges = document.querySelectorAll('.reward-badge');
rewardBadges.forEach(badge => {
    badge.title = 'Estimated earnings for this type of information';
});

// Add hover effects to category cards
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add confetti effect on successful submission (optional)
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4ade80', '#f59e0b'];
    const container = document.body;
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `fall ${animationDuration}s linear forwards`;
        
        container.appendChild(confetti);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, animationDuration * 1000);
    }
}

// Enhance the success notification to include confetti
const originalShowNotification = showNotification;
window.showNotification = function(message, type) {
    if (type === 'success') {
        createConfetti();
    }
    return originalShowNotification.call(this, message, type);
};

// Add loading states to navigation links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add loading state if navigating to external content
        if (!link.getAttribute('href').startsWith('#')) {
            link.style.opacity = '0.5';
            link.style.pointerEvents = 'none';
        }
    });
});

console.log('Billericay School Info Hub loaded successfully! 🎉');