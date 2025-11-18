// Enhanced Portfolio JavaScript with all interactive features

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Enhanced Portfolio Loaded!");

    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initModal();
    initSkillAnimations();
    initCounterAnimation();
    initServiceCards();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Enhanced Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navLinksAll = document.querySelectorAll('.nav-link');

    // Hamburger toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu on link click
    navLinksAll.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scrolling with active section highlighting
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

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

    // Active section highlighting
    function highlightActiveSection() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .contact-item, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for skill items
                if (entry.target.classList.contains('skill-item')) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const skillLevel = entry.target.getAttribute('data-skill');
                    if (skillProgress && skillLevel) {
                        setTimeout(() => {
                            skillProgress.style.width = `${skillLevel}%`;
                        }, 300);
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

// Enhanced Contact Form with Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message');

        // Clear previous error
        clearFieldError(field);

        // Check required fields
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.style.borderColor = 'var(--error-color)';
    }

    function clearFieldError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.classList.remove('show');
        field.style.borderColor = '#e0e0e0';
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('cta-modal');
    const ctaBtn = document.getElementById('cta-btn');
    const contactBtn = document.getElementById('contact-btn');
    const modalContactBtn = document.getElementById('modal-contact-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const closeModal = document.querySelector('.close-modal');

    // Open modal on CTA button click
    ctaBtn.addEventListener('click', function() {
        modal.classList.add('show');
    });

    // Open modal on contact button click
    contactBtn.addEventListener('click', function() {
        modal.classList.add('show');
    });

    // Close modal functions
    function closeModalFunc() {
        modal.classList.remove('show');
    }

    closeModal.addEventListener('click', closeModalFunc);
    modalCloseBtn.addEventListener('click', closeModalFunc);

    // Contact button in modal
    modalContactBtn.addEventListener('click', function() {
        closeModalFunc();
        // Scroll to contact section
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

// Skill Progress Animations
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const skillLevel = entry.target.getAttribute('data-skill');
                
                if (skillProgress && skillLevel) {
                    setTimeout(() => {
                        skillProgress.style.width = `${skillLevel}%`;
                    }, 300);
                }
                
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 16);

                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Service Cards Hover Effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize parallax
initParallax();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('cta-modal');
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu if open on resize to desktop
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initSmoothScrolling,
        initContactForm,
        initModal,
        initSkillAnimations
    };
}