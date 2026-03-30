/**
 * Global Storytelling Platform Logic - Dr. Krishnan Chandrasekharan Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* 1. AOS Animations Initialization */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 150,
            delay: 100
        });
    }

    /* 2. Sticky Navbar & Style Evolution on Scroll */
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        // Sticky Header / Background Blur Change
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled', 'shadow-sm');
            mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            mainNav.style.padding = '10px 0';
        } else {
            mainNav.classList.remove('scrolled', 'shadow-sm');
            mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            mainNav.style.padding = '20px 0';
        }

        // 3. Problem Section - Text Highlighting on Scroll (Awareness Journey)
        const problemLines = document.querySelectorAll('.problem-line');
        problemLines.forEach(line => {
            const rect = line.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Activate when in central view
            if (rect.top < viewHeight * 0.75 && rect.bottom > viewHeight * 0.25) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
    });

    /* 4. Smooth Anchor Scrolling with Precise Offset */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Mobile Menu Close on Click
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    /* 5. Direct WhatsApp Form Submission (Action Transformation) */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capture Data
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessageText').value;

            // Premium Visual Feedback (Button State)
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> PREPARING MESSAGE...';
            btn.disabled = true;

            // Construct WhatsApp Enquiry
            const whatsappNumber = "916374316870";
            const text = `*New Transformation Enquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Enquiry:* ${message}`;
            const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;

            // Direct Interaction (Same Window Protocol Trigger)
            setTimeout(() => {
                window.location.href = waLink;
                
                // Reset State
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1000);
            }, 800);
        });
    }

});
