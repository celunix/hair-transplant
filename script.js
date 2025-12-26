// ============================================
// DOM Elements
// ============================================

const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTop = document.getElementById('scrollToTop');
const appointmentForm = document.getElementById('appointmentForm');
const contactForm = document.getElementById('contactForm');

// ============================================
// Sticky Navbar on Scroll
// ============================================

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (scrollToTop) {
        if (currentScroll > 500) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Dropdown Menu Functionality
// ============================================

const dropdowns = document.querySelectorAll('.nav-dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (link && menu) {
        // For mobile, toggle on click
        if (window.innerWidth <= 968) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or external links
        if (href === '#' || href === '#!' || href.includes('http')) {
            return;
        }

        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================

if (scrollToTop) {
    scrollToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Scroll Animations (Fade In)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .feature-box, .news-card, .about-image-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// Appointment Form Validation
// ============================================

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous errors
        const formGroups = appointmentForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });

        let isValid = true;

        // Validate Name
        const nameInput = document.getElementById('appointment-name');
        if (nameInput) {
            const nameValue = nameInput.value.trim();
            if (nameValue.length < 2) {
                showFormError(nameInput, 'Name must be at least 2 characters long');
                isValid = false;
            }
        }

        // Validate Phone
        const phoneInput = document.getElementById('appointment-phone');
        if (phoneInput) {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneValue) || phoneValue.replace(/\D/g, '').length < 10) {
                showFormError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        // Validate Department
        const departmentSelect = document.getElementById('department');
        if (departmentSelect && !departmentSelect.value) {
            showFormError(departmentSelect, 'Please select a department');
            isValid = false;
        }

        // Validate Doctor
        const doctorSelect = document.getElementById('doctor');
        if (doctorSelect && !doctorSelect.value) {
            showFormError(doctorSelect, 'Please select a doctor');
            isValid = false;
        }

        // Validate Date
        const dateInput = document.getElementById('appointment-date');
        if (dateInput && !dateInput.value) {
            showFormError(dateInput, 'Please select a date');
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            showSuccessMessage(appointmentForm);
            appointmentForm.reset();
        }
    });
}

function showFormError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('error');
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
}

function showSuccessMessage(form) {
    // Remove existing success message
    const existingMsg = form.querySelector('.form-success');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.style.cssText = `
        background-color: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        text-align: center;
        font-weight: 500;
        animation: fadeInUp 0.5s ease;
    `;
    successMsg.textContent = 'Thank you! Your appointment request has been submitted successfully. We will contact you soon.';
    
    form.insertBefore(successMsg, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Real-time validation for appointment form
if (appointmentForm) {
    const formInputs = appointmentForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateAppointmentField(input);
        });

        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                const value = input.value.trim();
                if (value.length > 0 || (input.tagName === 'SELECT' && input.value)) {
                    formGroup.classList.remove('error');
                    const errorMsg = formGroup.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            }
        });
    });
}

function validateAppointmentField(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    
    if (input.hasAttribute('required') && (value.length === 0 || (input.tagName === 'SELECT' && !input.value))) {
        showFormError(input, 'This field is required');
        return false;
    }

    if (input.type === 'tel' && value.length > 0) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            showFormError(input, 'Please enter a valid phone number');
            return false;
        }
    }

    if (input.id === 'appointment-name' && value.length > 0 && value.length < 2) {
        showFormError(input, 'Name must be at least 2 characters long');
        return false;
    }

    if (formGroup) {
        formGroup.classList.remove('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    return true;
}

// ============================================
// Active Nav Link on Current Page
// ============================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Window Resize Handler
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 968) {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }, 250);
});

// ============================================
// Contact Form Validation
// ============================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous errors
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = '';
            }
        });

        let isValid = true;

        // Validate Name
        const nameInput = document.getElementById('name');
        if (nameInput) {
            const nameValue = nameInput.value.trim();
            if (nameValue.length < 2) {
                showFormError(nameInput, 'Name must be at least 2 characters long');
                isValid = false;
            }
        }

        // Validate Phone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneValue) || phoneValue.replace(/\D/g, '').length < 10) {
                showFormError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        // Validate Email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                showFormError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // If form is valid, show success message
        if (isValid) {
            showSuccessMessage(contactForm);
            contactForm.reset();
        }
    });

    // Real-time validation for contact form
    const contactInputs = contactForm.querySelectorAll('input, textarea');
    contactInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateContactField(input);
        });

        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                const value = input.value.trim();
                if (value.length > 0) {
                    formGroup.classList.remove('error');
                    const errorMsg = formGroup.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.textContent = '';
                    }
                }
            }
        });
    });
}

function validateContactField(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    
    if (input.hasAttribute('required') && value.length === 0) {
        showFormError(input, 'This field is required');
        return false;
    }

    if (input.type === 'email' && value.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFormError(input, 'Please enter a valid email address');
            return false;
        }
    }

    if (input.type === 'tel' && value.length > 0) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            showFormError(input, 'Please enter a valid phone number');
            return false;
        }
    }

    if (input.id === 'name' && value.length > 0 && value.length < 2) {
        showFormError(input, 'Name must be at least 2 characters long');
        return false;
    }

    if (formGroup) {
        formGroup.classList.remove('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = '';
        }
    }
    return true;
}

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('HairRestore Clinic website loaded successfully!');
    
    // Set active nav link
    setActiveNavLink();
    
    // Initialize scroll position
    window.scrollTo(0, 0);
});
