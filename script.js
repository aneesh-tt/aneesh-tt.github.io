// Function to initialize service card actions
function initServiceCardActions() {
    // Handle service card clicks for form navigation
    document.querySelectorAll('.service-action').forEach(button => {
        // Remove any existing click handlers to prevent duplicates
        button.removeEventListener('click', handleServiceCardClick);
        button.addEventListener('click', handleServiceCardClick);
    });
}

// Handle service card click
function handleServiceCardClick(e) {
    e.preventDefault(); // Prevent default anchor behavior
    const tabId = this.getAttribute('data-tab');
    if (tabId) {
        // Store the selected tab in session storage
        sessionStorage.setItem('selectedTab', tabId);
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Small delay to ensure scrolling is complete before switching tabs
            setTimeout(() => {
                const tabButton = document.querySelector(`.form-selector-btn[data-form="${tabId}"]`);
                if (tabButton && !tabButton.classList.contains('active')) {
                    tabButton.click();
                }
            }, 300);
        }
    }
}

// Navbar scroll effect
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Handle dropdown service selection
function handleServiceSelection(e) {
    const tabId = this.getAttribute('data-tab');
    if (tabId) {
        // Store the selected tab in session storage
        sessionStorage.setItem('selectedTab', tabId);
        
        // Find the target form and activate it
        const tabButton = document.querySelector(`.form-selector-btn[data-form="${tabId}"]`);
        if (tabButton && !tabButton.classList.contains('active')) {
            tabButton.click();
        }
    }
}

// Mobile menu state
let isMobileMenuOpen = false;

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    
    if (navLinks && menuIcon) {
        isMobileMenuOpen = !isMobileMenuOpen;
        navLinks.classList.toggle('active');
        menuIcon.className = isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu when scrolling
function handleScrollForMenu() {
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Smooth scroll to section and handle contact form tabs
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    // Calculate position with header offset
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    // Smooth scroll to the element
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    // If scrolling to contact section, handle tab switching
    if (target === '#contact') {
        const selectedTab = sessionStorage.getItem('selectedTab');
        if (selectedTab) {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                const tabButton = document.querySelector(`.form-selector-btn[data-form="${selectedTab}"]`);
                if (tabButton && !tabButton.classList.contains('active')) {
                    tabButton.click();
                }
            }, 500);
        }
    }
}

// Handle navigation link clicks
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                smoothScrollTo(href);
                
                // Close mobile menu if open
                if (isMobileMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Initialize mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        // Add menu icon
        const menuIcon = document.createElement('i');
        menuIcon.className = 'fas fa-bars';
        mobileMenuBtn.innerHTML = '';
        mobileMenuBtn.appendChild(menuIcon);
        
        // Add click event
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Add scroll event to close menu
        window.addEventListener('scroll', handleScrollForMenu, { passive: true });
    }
    
    // Initialize scroll handler
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
    
    // Initialize service card actions
    initServiceCardActions();
    
    // Add click handlers for dropdown menu items
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', handleServiceSelection);
    });
    
    // Re-initialize after a short delay to catch any dynamically loaded content
    setTimeout(initServiceCardActions, 1000);

    // Handle direct URL with hash on page load
    if (window.location.hash === '#contact') {
        const selectedTab = sessionStorage.getItem('selectedTab');
        if (selectedTab) {
            const tabButton = document.querySelector(`.form-selector-btn[data-form="${selectedTab}"]`);
            if (tabButton && !tabButton.classList.contains('active')) {
                setTimeout(() => {
                    tabButton.click();
                }, 100);
            }
            sessionStorage.removeItem('selectedTab');
        }
    }

    // Add index to service cards for staggered animation
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
        
        // Add click handler to Learn More buttons
        const learnMoreBtn = card.querySelector('.btn-outline');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceName = card.querySelector('h3').textContent;
                document.getElementById('inquiry').value = `I'm interested in ${serviceName}`;
                
                // Smooth scroll to contact form
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Highlight the field
                const inquiryField = document.getElementById('inquiry');
                inquiryField.focus();
                inquiryField.classList.add('highlight-field');
                setTimeout(() => {
                    inquiryField.classList.remove('highlight-field');
                }, 2000);
            });
        }
    });
    // Animate tech icons on hover
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconType = this.getAttribute('data-icon');
            this.style.transform = 'translateY(-10px) scale(1.1)';
            
            // Add pulse effect
            this.style.animation = 'pulse 0.5s ease';
            
            // Reset animation after it completes
            this.addEventListener('animationend', function() {
                this.style.animation = '';
            }, { once: true });
            
            // Tooltip effect
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.querySelector('i').getAttribute('title') || 
                                 this.getAttribute('data-icon').charAt(0).toUpperCase() + 
                                 this.getAttribute('data-icon').slice(1);
            this.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Animate dashboard mockup elements
    const animateDashboard = () => {
        const metricCard = document.querySelector('.metric-card');
        const chart = document.querySelector('.chart-placeholder');
        
        if (metricCard && !metricCard.dataset.animated) {
            metricCard.style.opacity = '0';
            metricCard.style.transform = 'translateY(20px)';
            metricCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                metricCard.style.opacity = '1';
                metricCard.style.transform = 'translateY(0)';
                metricCard.dataset.animated = 'true';
            }, 300);
        }
        
        if (chart && !chart.dataset.animated) {
            chart.style.opacity = '0';
            chart.style.transform = 'translateY(20px)';
            chart.style.transition = 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s';
            
            setTimeout(() => {
                chart.style.opacity = '1';
                chart.style.transform = 'translateY(0)';
                chart.dataset.animated = 'true';
                
                // Simulate chart animation
                const bars = [];
                for (let i = 0; i < 5; i++) {
                    const bar = document.createElement('div');
                    bar.className = 'chart-bar';
                    bar.style.height = Math.floor(Math.random() * 80 + 20) + '%';
                    chart.appendChild(bar);
                    bars.push(bar);
                }
                
                // Animate bars
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transform = 'scaleY(1)';
                    }, index * 100);
                });
            }, 500);
        }
    };
    
    // Check if dashboard is in viewport
    const checkDashboardInView = () => {
        const dashboard = document.querySelector('.dashboard-mockup');
        if (dashboard) {
            const rect = dashboard.getBoundingClientRect();
            const isInView = (
                rect.top <= (window.innerHeight * 0.8) &&
                rect.bottom >= (window.innerHeight * 0.2)
            );
            
            if (isInView) {
                animateDashboard();
                window.removeEventListener('scroll', checkDashboardInView);
            }
        }
    };
    
    // Initial check and add scroll listener
    checkDashboardInView();
    window.addEventListener('scroll', checkDashboardInView);
    
        // Initialize Testimonials Carousel
    const carousel = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Set initial active states
    function updateCarousel() {
        // Update track position
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update active slides
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, index) => {
            const slideIndex = Math.floor(index / 1); // 1 card per slide
            card.classList.toggle('active', slideIndex === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // Auto-advance slides
        let slideInterval = setInterval(nextSlide, 7000);
        
        // Pause on hover
        const carouselContainer = document.querySelector('.testimonial-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 7000);
            });
        }
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Create shooting stars
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random position
        const startY = Math.random() * window.innerHeight * 0.5;
        const startX = -100;
        
        // Random size and speed
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 10;
        
        // Set styles
        star.style.top = `${startY}px`;
        star.style.left = `${startX}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animation = `shootingStar ${duration}s linear ${delay}s infinite`;
        
        // Add to body
        document.body.appendChild(star);
        
        // Remove after animation completes
        setTimeout(() => {
            star.remove();
        }, (duration + delay) * 1000);
    }

    // Create multiple shooting stars
    function initStars() {
        // Clear existing stars
        document.querySelectorAll('.shooting-star').forEach(star => star.remove());
        
        // Create initial stars
        for (let i = 0; i < 3; i++) {
            setTimeout(createShootingStar, i * 2000);
        }
        
        // Continue creating stars at intervals
        setInterval(createShootingStar, 3000);
    }

    // Start stars when page loads
    window.addEventListener('load', initStars);
    
    // Add animation to floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape) => {
        // Randomize initial position and animation
        const randomX = (Math.random() * 40) - 20;
        const randomY = (Math.random() * 40) - 20;
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + (Math.random() * 10);
        
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        shape.style.animationDuration = `${randomDuration}s`;
        shape.style.animationDelay = `${randomDelay}s`;
    });
    
    // Mobile menu initialization is now handled in the DOMContentLoaded event
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Initialize navbar state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.service-card, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.style.display = 'none';
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run once on page load
});
