// Slider functionality
const slider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.slide'),
    prevButton: document.querySelector('.slider-nav.prev'),
    nextButton: document.querySelector('.slider-nav.next'),

    init() {
        if (this.slides.length === 0) return;

        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // Auto slide every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    },

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    slider.init();
});

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements when they appear in viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-section h2, .about-content, .details-box, .rooms h2, .room-card, .gallery-section h2, .gallery-grid img, .contact-section h2');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
                
                if (element.classList.contains('room-card')) {
                    element.classList.add('slide-up');
                }
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Add event listener for scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for navigation links
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

    // Form submission handling - Quick booking form
    const quickBookingForm = document.querySelector('.quick-booking-form');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the data to a server
            console.log('Quick booking form submitted:', formObject);
            
            // Prepare WhatsApp message
            const name = formObject.name || '';
            const email = formObject.email || '';
            const phone = formObject.phone || '';
            const dateIn = formObject['date-in'] || '';
            const dateOut = formObject['date-out'] || '';
            
            const message = `שלום וברכה, אני ${name} מעוניין/ת להצטרף לחווית אירוח בצימר אתנחתא.
שם: ${name}
טלפון: ${phone}
אימייל: ${email}
תאריך כניסה: ${dateIn}
תאריך יציאה: ${dateOut}`;
            
            // Redirect to WhatsApp
            window.open(`https://wa.me/972528109471?text=${encodeURIComponent(message)}`, '_blank');
            
            // Reset form
            this.reset();
        });
    }

    // Form submission handling - Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the data to a server
            console.log('Contact form submitted:', formObject);
            
            // Show success message
            alert('תודה על פנייתך! נחזור אליך בהקדם.');
            this.reset();
        });
    }

    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('.header');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileBtn.setAttribute('aria-label', 'תפריט');
                header.querySelector('.header-inner').appendChild(mobileBtn);

                // Add click event to toggle menu
                mobileBtn.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    mobileBtn.innerHTML = navLinks.classList.contains('active') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
        }
    };

    // Initialize mobile navigation
    createMobileNav();

    // Update mobile navigation on window resize
    window.addEventListener('resize', createMobileNav);

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            // Create lightbox content
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            // Create close button
            const closeButton = document.createElement('span');
            closeButton.className = 'lightbox-close';
            closeButton.innerHTML = '&times;';
            closeButton.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
            
            // Create image
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            
            // Append elements
            lightboxContent.appendChild(closeButton);
            lightboxContent.appendChild(lightboxImg);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Close on click outside
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
});

// Add Google Map
function initMap() {
    const mapElement = document.querySelector('.map');
    if (!mapElement) return;
    
    // בת עין ב' גוש עציון coordinates (replace with actual coordinates)
    const location = { lat: 31.6566, lng: 35.1033 };
    
    const mapOptions = {
        zoom: 15,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    const map = new google.maps.Map(mapElement, mapOptions);
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'צימר אתנחתא'
    });
}

// Load Google Maps API (uncomment and add your API key when ready)
// const script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
// script.async = true;
// script.defer = true;
// document.head.appendChild(script);

// Accessibility Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    
    if (!accessibilityBtn || !accessibilityMenu) return;
    
    // Toggle accessibility menu
    accessibilityBtn.addEventListener('click', () => {
        accessibilityMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!accessibilityBtn.contains(e.target) && !accessibilityMenu.contains(e.target)) {
            accessibilityMenu.classList.remove('active');
        }
    });
    
    // Load saved accessibility settings
    loadAccessibilitySettings();
    
    // High Contrast Option
    const highContrastOption = document.getElementById('highContrastOption');
    if (highContrastOption) {
        highContrastOption.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            saveAccessibilitySetting('high-contrast', document.body.classList.contains('high-contrast'));
            highContrastOption.classList.toggle('active');
        });
    }
    
    // Large Text Option
    const largeTextOption = document.getElementById('largeTextOption');
    if (largeTextOption) {
        largeTextOption.addEventListener('click', () => {
            document.body.classList.toggle('large-text');
            saveAccessibilitySetting('large-text', document.body.classList.contains('large-text'));
            largeTextOption.classList.toggle('active');
        });
    }
    
    // Text Spacing Option
    const textSpacingOption = document.getElementById('textSpacingOption');
    if (textSpacingOption) {
        textSpacingOption.addEventListener('click', () => {
            document.body.classList.toggle('text-spacing');
            saveAccessibilitySetting('text-spacing', document.body.classList.contains('text-spacing'));
            textSpacingOption.classList.toggle('active');
        });
    }
    
    // Reading Guide Option
    const readingGuideOption = document.getElementById('readingGuideOption');
    if (readingGuideOption) {
        readingGuideOption.addEventListener('click', () => {
            const isActive = !document.body.classList.contains('reading-guide');
            document.body.classList.toggle('reading-guide');
            saveAccessibilitySetting('reading-guide', isActive);
            readingGuideOption.classList.toggle('active');
            
            if (isActive) {
                activateReadingGuide();
            } else {
                deactivateReadingGuide();
            }
        });
    }
    
    // Reset Accessibility Option
    const resetAccessibilityOption = document.getElementById('resetAccessibilityOption');
    if (resetAccessibilityOption) {
        resetAccessibilityOption.addEventListener('click', () => {
            resetAccessibilitySettings();
        });
    }
    
    // Reading Guide Functionality
    let readingGuideActive = false;
    
    function activateReadingGuide() {
        readingGuideActive = true;
        document.addEventListener('mousemove', updateReadingGuidePosition);
    }
    
    function deactivateReadingGuide() {
        readingGuideActive = false;
        document.removeEventListener('mousemove', updateReadingGuidePosition);
    }
    
    function updateReadingGuidePosition(e) {
        if (!readingGuideActive) return;
        
        const mouseY = e.clientY;
        const guideHeight = 40; // Same as in CSS
        const guideTop = mouseY - (guideHeight / 2);
        
        document.documentElement.style.setProperty('--reading-guide-top', `${guideTop}px`);
    }
    
    // Save accessibility settings to localStorage
    function saveAccessibilitySetting(setting, value) {
        const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
        settings[setting] = value;
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    }
    
    // Load accessibility settings from localStorage
    function loadAccessibilitySettings() {
        const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
        
        // Apply saved settings
        if (settings['high-contrast']) {
            document.body.classList.add('high-contrast');
            document.getElementById('highContrastOption')?.classList.add('active');
        }
        
        if (settings['large-text']) {
            document.body.classList.add('large-text');
            document.getElementById('largeTextOption')?.classList.add('active');
        }
        
        if (settings['text-spacing']) {
            document.body.classList.add('text-spacing');
            document.getElementById('textSpacingOption')?.classList.add('active');
        }
        
        if (settings['reading-guide']) {
            document.body.classList.add('reading-guide');
            document.getElementById('readingGuideOption')?.classList.add('active');
            activateReadingGuide();
        }
    }
    
    // Reset all accessibility settings
    function resetAccessibilitySettings() {
        document.body.classList.remove('high-contrast', 'large-text', 'text-spacing', 'reading-guide');
        
        document.getElementById('highContrastOption')?.classList.remove('active');
        document.getElementById('largeTextOption')?.classList.remove('active');
        document.getElementById('textSpacingOption')?.classList.remove('active');
        document.getElementById('readingGuideOption')?.classList.remove('active');
        
        deactivateReadingGuide();
        
        // Clear saved settings
        localStorage.removeItem('accessibilitySettings');
    }
}); 