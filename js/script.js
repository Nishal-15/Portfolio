/**
 * Single-Page scrolling logic for Dr. Krishnan Chandrasekharan Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* 1. Loader Logic */
    const loadWrapper = document.getElementById('loader-wrapper');
    const body = document.querySelector('body');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            body.classList.remove('loading');
            body.classList.add('loaded');
        }, 1200);
    });

    /* 2. AOS Animations Initialization */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 120
        });
    }

    /* 3. Sticky Navbar & Active Tracking */
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('header, section');

    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled', 'shadow-sm', 'py-1');
        } else {
            mainNav.classList.remove('scrolled', 'shadow-sm', 'py-1');
        }

        // Active Link Highlighting (Manual Intersection check)
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    /* 4. Smooth Scroll for all anchor links */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = 80; // Adjusted for sticky navbar
                    const targetPosition = targetSection.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Mobile Menu Close on Click
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        navbarToggler.click();
                    }
                }
            }
        });
    });

    /* 5. Contact Form Validation */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                formMessage.innerHTML = '<div class="alert alert-success mt-4 border-0 shadow-sm rounded-pill py-3 text-center"><i class="fas fa-check-circle me-2"></i> Message sent successfully! Dr. Krishnan will connect with you soon.</div>';
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                btn.innerHTML = 'Send Message';
                btn.disabled = false;
            }, 1800);
        });
    }
});
