// new script file

// Falcon Heart - Complete Frontend Application
document.addEventListener('DOMContentLoaded', function() {

// ========================================
// MOBILE NAVIGATION
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ========================================
// SMOOTH SCROLLING
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECTS
// ========================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar?.classList.add('hidden');
    } else {
        navbar?.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Staggered animations for service cards
            if (entry.target.classList.contains('services-grid')) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150);
                });
            }

            // Staggered animations for about cards
            if (entry.target.classList.contains('about-visual')) {
                const cards = entry.target.querySelectorAll('.about-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 200);
                });
            }

            // Staggered animations for contact cards
            if (entry.target.classList.contains('contact-info')) {
                const cards = entry.target.querySelectorAll('.contact-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

const animatedElements = [
    '.section-header',
    '.services-grid',
    '.about-text',
    '.about-visual',
    '.contact-info',
    '.contact-form-container',
    '.hero-content',
    '.stats-grid'
];

animatedElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.classList.add('fade-in-up');
        fadeInObserver.observe(element);
    });
});

// ========================================
// PARALLAX EFFECTS
// ========================================
const floatingShapes = document.querySelectorAll('.floating-shapes .shape');
const parallaxElements = document.querySelectorAll('.parallax-element');

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Floating shapes parallax
    floatingShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        const yPos = -(scrolled * speed);
        const rotation = scrolled * 0.1;
        shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
    });

    // General parallax elements
    parallaxElements.forEach((element, index) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ========================================
// HERO SECTION EFFECTS
// ========================================
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroButtons = document.querySelectorAll('.hero-btn');

// Typewriter effect for hero title
function typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize hero animations
setTimeout(() => {
    if (heroTitle) {
        heroTitle.classList.add('animate-in');
    }
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('animate-in');
        }, 500);
    }
    heroButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.classList.add('animate-in');
        }, 1000 + (index * 200));
    });
}, 300);

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.querySelector('#contactForm');
const formSubmitBtn = contactForm?.querySelector('.submit-btn');
const formMessage = contactForm?.querySelector('.form-message');

contactForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!formSubmitBtn || !formMessage) return;
    
    const formData = new FormData(contactForm);
    
    // Show loading state
    formSubmitBtn.disabled = true;
    formSubmitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    try {
        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent.';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed.');
        }
    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Sorry, there was an error. Please try again.';
    } finally {
        // Reset button state
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
});

// ========================================
// NEWSLETTER SUBSCRIPTION
// ========================================
const newsletterForm = document.querySelector('#newsletterForm');

newsletterForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const submitBtn = this.querySelector('button[type="submit"]');
    const messageEl = this.querySelector('.newsletter-message');
    
    if (!emailInput || !submitBtn) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage(messageEl, 'Please enter your email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>';
    
    try {
        const response = await apiRequest('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
        
        showMessage(messageEl, response.message || 'Successfully subscribed!', 'success');
        emailInput.value = '';
        
    } catch (error) {
        showMessage(messageEl, error.message || 'Subscription failed. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Subscribe';
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `newsletter-message ${type}`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce resize events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================
const modalTriggers = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    });
});

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }
});

// ========================================
// LOADING STATES
// ========================================

// Remove loading class when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});

// ========================================
// ERROR HANDLING
// ========================================

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Prevent the default behavior (logging to console)
    event.preventDefault();
});

// ========================================
// INITIALIZATION
// ========================================

console.log('Falcon Heart Frontend initialized successfully');

// Trigger initial animations
document.body.classList.add('ready');

}); 
