// ==========================================
// Main Application Scripts
// ==========================================

$(document).ready(function () {

    // Initialize all components
    gsap.registerPlugin(ScrollTrigger);

    initGridAnimation();
    initHeaderAnimations();
    initMobileMenuAnimations();
    initHeroSlider();
    initProjectSlider();
    initAboutAnimations();
    initScheduleAnimation();
    initVideoModal();
    initFooterAnimations();
    initCounters();
    initNewSections();
    // Initialize specific pages
    initContactPage();
    initAboutPage();
    initProjectPages();
    initProjectDetailsPage();

    // ------------------------------------------
    // 0. Grid Animations
    // ------------------------------------------
    function initGridAnimation() {
        gsap.from(".page-grid-line", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 2,
            stagger: 0.3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    // ------------------------------------------
    // 1. Header Animations
    // ------------------------------------------
    function initHeaderAnimations() {
        const header = document.querySelector('.main-header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        gsap.from(".navbar-brand", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
        gsap.from(".nav-item", {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
        });
    }

    // ------------------------------------------
    // 2. Mobile Menu
    // ------------------------------------------
    function initMobileMenuAnimations() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        if (!toggleBtn) return;

        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu) return;

        mobileMenu.addEventListener('show.bs.offcanvas', function () {
            // Reset styles before animating
            gsap.set(".mobile-item", { x: 50, opacity: 0 });
            gsap.set(".mobile-menu-footer", { y: 30, opacity: 0 });

            // Animate links sliding in
            gsap.to(".mobile-item", {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.2
            });

            // Animate footer section fading up
            gsap.to(".mobile-menu-footer", {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.5
            });
        });
    }

    // ------------------------------------------
    // 3. Hero Slider Initialization
    // ------------------------------------------
    function initHeroSlider() {
        const swiperContainer = document.querySelector('.heroSwiper');
        if (!swiperContainer) return;

        // Function to animate slide content
        function animateSlide(activeSlide) {
            // Reset all slides
            gsap.set(".swiper-slide .slide-title", { y: 50, opacity: 0 });
            gsap.set(".swiper-slide .slide-text", { y: 30, opacity: 0 });
            gsap.set(".swiper-slide .slide-btn", { scale: 0.9, opacity: 0 });

            // Animate the active slide
            const title = activeSlide.querySelector('.slide-title');
            const text = activeSlide.querySelector('.slide-text');
            const btn = activeSlide.querySelector('.slide-btn');

            const tl = gsap.timeline();
            if (title) tl.to(title, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
            if (text) tl.to(text, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
            if (btn) tl.to(btn, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.4");
        }

        // Initialize Swiper
        var heroSwiper = new Swiper(".heroSwiper", {
            direction: "horizontal",
            loop: true,
            effect: "fade", // smooth fade transition between background images
            speed: 1000,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                init: function () {
                    setTimeout(() => {
                        animateSlide(this.slides[this.activeIndex]);
                    }, 500);
                },
                slideChangeTransitionStart: function () {
                    animateSlide(this.slides[this.activeIndex]);
                }
            }
        });
    }

    // ------------------------------------------
    // 3.5 Projects Slider
    // ------------------------------------------
    function initProjectSlider() {
        const sliderConfig = {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        };

        new Swiper('.ongoing-swiper', {
            ...sliderConfig,
            navigation: { nextEl: '.ongoing-next', prevEl: '.ongoing-prev' }
        });

        new Swiper('.upcoming-swiper', {
            ...sliderConfig,
            navigation: { nextEl: '.upcoming-next', prevEl: '.upcoming-prev' }
        });

        new Swiper('.completed-swiper', {
            ...sliderConfig,
            navigation: { nextEl: '.completed-next', prevEl: '.completed-prev' }
        });

        // Beautiful GSAP reveal for each project section independently
        const projectSections = ['#projects', '#upcoming-projects', '#completed-projects'];

        projectSections.forEach(selector => {
            const section = document.querySelector(selector);
            if (!section) return;

            // Animate the section header (titles and arrows)
            gsap.from(section.querySelectorAll(".container > div"), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Animate the swiper slide contents within this specific section
            gsap.from(section.querySelectorAll(".swiper-slide > a"), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            });
        });
    }

    // ------------------------------------------
    // 4. About Section Animations
    // ------------------------------------------
    function initAboutAnimations() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Left Content animation
        tl.from(".about-text-col > *", {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, 0);

        // Right Image animation
        tl.from(".about-img-col", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, 0.3);

        // Play button pop animation
        tl.from(".play-btn-wrapper", {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, 0.8);

        // Interactive Parallax Hover Effect
        const videoWrapper = document.querySelector('.about-video-wrapper');
        const videoImg = videoWrapper.querySelector('img');
        const playBtnWrapper = videoWrapper.querySelector('.play-btn-wrapper');

        if (videoWrapper && videoImg && playBtnWrapper) {
            videoWrapper.addEventListener("mousemove", function (e) {
                const rect = videoWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Slight pan/scale for image
                gsap.to(videoImg, {
                    x: x * 0.05,
                    y: y * 0.05,
                    scale: 1.08,
                    duration: 0.8,
                    ease: "power2.out"
                });

                // Icon directly follows the mouse
                gsap.to(playBtnWrapper, {
                    x: x,
                    y: y,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            videoWrapper.addEventListener("mouseleave", function () {
                // Reset image
                gsap.to(videoImg, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out"
                });

                // Reset button with elastic bounce
                gsap.to(playBtnWrapper, {
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.4)"
                });
            });
        }
    }

    // ------------------------------------------
    // 4. Schedule Section Animations
    // ------------------------------------------
    function initScheduleAnimation() {
        const scheduleCard = document.querySelector('.schedule-card');
        if (!scheduleCard) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#schedule",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".schedule-img-col", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, 0)
            .from(".schedule-form-col", {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, 0);
    }

    // ------------------------------------------
    // 5. Video Modal Handling
    // ------------------------------------------
    function initVideoModal() {
        const videoModal = document.getElementById('videoModal');
        const iframe = document.getElementById('aboutVideo');

        if (!videoModal || !iframe) return;

        // Stop video when modal is closed
        videoModal.addEventListener('hidden.bs.modal', function () {
            // Post message to iframe to stop the video
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });

        // Play video when modal is opened (optional, if you want auto-play)
        videoModal.addEventListener('shown.bs.modal', function () {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        });
    }

    // ------------------------------------------
    // 6. Footer Animations
    // ------------------------------------------
    function initFooterAnimations() {
        const footer = document.getElementById('footer');
        if (!footer) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#footer",
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });

        // 3D Fold up stagger for the columns
        gsap.set(footer, { perspective: 1000 });

        tl.from(".footer-col", {
            y: 80,
            rotationX: -60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.2)"
        }, 0);

        // Fade in bottom row
        tl.from(".footer-bottom-row", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, 0.6);

        // Pop in the WhatsApp button if it isn't already visible
        gsap.from(".whatsapp-float", {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 1
        });

        // GSAP Background Blob Animations
        gsap.to(".blob-1", {
            x: 150,
            y: 100,
            rotation: 360,
            scale: 1.2,
            duration: 10,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(".blob-2", {
            x: -150,
            y: -100,
            rotation: -360,
            scale: 1.4,
            duration: 12,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(".blob-3", {
            x: 200,
            y: -150,
            rotation: 180,
            scale: 0.8,
            duration: 14,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }

    // ------------------------------------------
    // 7. Counter (Odometer) Animations
    // ------------------------------------------
    function initCounters() {
        const counters = document.querySelectorAll('.counter.odometer');

        if (counters.length === 0) return;

        // GSAP Fade-up animation for the boxes
        gsap.from(".counter-box", {
            scrollTrigger: {
                trigger: "#stats-counter",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Trigger Odometer when in view
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');

            ScrollTrigger.create({
                trigger: counter,
                start: "top 85%", // trigger when counter is 85% into view
                once: true,
                onEnter: () => {
                    // Update the innerHTML which Odometer will animate
                    counter.innerHTML = target;
                }
            });
        });
    }

    // ------------------------------------------
    // 8. Scroll to Top Button
    // ------------------------------------------
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------------
    // 9. New Sections Animations & Logic
    // ------------------------------------------
    function initNewSections() {

        // Amenities Reveal
        const amenitiesSection = document.getElementById('amenities');
        if (amenitiesSection) {
            gsap.from(amenitiesSection.querySelector('.amenity-header'), {
                scrollTrigger: {
                    trigger: amenitiesSection,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            gsap.from(amenitiesSection.querySelectorAll('.amenity-item'), {
                scrollTrigger: {
                    trigger: amenitiesSection,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.2)"
            });
        }

        // Testimonials Swiper
        const testimonialSwiperEl = document.querySelector('.testimonial-swiper');
        if (testimonialSwiperEl) {
            new Swiper('.testimonial-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.testimonial-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });

            gsap.from(document.querySelector('#testimonials .testimonial-header'), {
                scrollTrigger: {
                    trigger: "#testimonials",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            gsap.from(document.querySelectorAll('.testimonial-slide'), {
                scrollTrigger: {
                    trigger: "#testimonials",
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

    }

    // ------------------------------------------
    // 10. Contact Page Animations
    // ------------------------------------------
    function initContactPage() {
        const contactHero = document.querySelector('.contact-hero');
        if (contactHero) {
            // Hero Animations
            gsap.from(".contact-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
            gsap.from(".contact-subtitle", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: "power3.out"
            });

            // Form Animations
            gsap.from(".contact-form-col", {
                scrollTrigger: {
                    trigger: ".contact-form-col",
                    start: "top 80%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Info Cards & Map Animations
            gsap.from(".contact-info-card", {
                scrollTrigger: {
                    trigger: ".contact-info-col",
                    start: "top 80%",
                },
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            });

            gsap.from(".contact-map-card", {
                scrollTrigger: {
                    trigger: ".contact-map-card",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "power3.out"
            });

            // Form Submit Intercept (UI only)
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const btn = contactForm.querySelector('button[type="submit"]');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                    btn.disabled = true;
                    
                    // Simulate network request
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                        btn.classList.replace('btn-primary', 'btn-success');
                        contactForm.reset();
                        
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.classList.replace('btn-success', 'btn-primary');
                            btn.disabled = false;
                        }, 3000);
                    }, 1500);
                });
            }
        }
    }

    // ------------------------------------------
    // 11. About Page Animations
    // ------------------------------------------
    function initAboutPage() {
        const aboutHero = document.querySelector('.about-hero');
        if (aboutHero) {
            // Hero Animations
            gsap.from(".about-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
            gsap.from(".about-subtitle", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: "power3.out"
            });

            // Story Section Animations
            gsap.from(".about-story-content", {
                scrollTrigger: {
                    trigger: ".about-story-content",
                    start: "top 80%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".about-story-img", {
                scrollTrigger: {
                    trigger: ".about-story-img",
                    start: "top 80%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });



            // Team Section Animations
            gsap.from(".about-team-header", {
                scrollTrigger: {
                    trigger: ".about-team-header",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            gsap.from(".team-card", {
                scrollTrigger: {
                    trigger: ".team-card",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            });
        }
    }

});

    // Project Pages Animations
    function initProjectPages() {
        if ($(".project-hero").length) {
            gsap.from(".project-hero", {
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
            gsap.from(".project-title", {
                y: -50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.5)"
            });
            gsap.from(".project-subtitle", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power2.out"
            });
            gsap.from(".project-card-wrapper", {
                scrollTrigger: {
                    trigger: ".project-grid",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)"
            });
        }
    }

    // Project Details Page Animations
    function initProjectDetailsPage() {
        if ($(".details-hero").length) {
            gsap.from(".details-hero", {
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
            gsap.from(".details-title", {
                y: -50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.5)"
            });
            gsap.from(".details-subtitle", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power2.out"
            });
            
            // Overview Content
            gsap.from(".details-overview-content", {
                scrollTrigger: {
                    trigger: ".details-overview-content",
                    start: "top 80%"
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            
            // Amenities
            gsap.from(".details-amenities", {
                scrollTrigger: {
                    trigger: ".details-amenities",
                    start: "top 80%"
                },
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            
            // Gallery
            gsap.from(".details-gallery-header", {
                scrollTrigger: {
                    trigger: ".details-gallery-header",
                    start: "top 80%"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            
            gsap.from(".gallery-item", {
                scrollTrigger: {
                    trigger: ".details-gallery",
                    start: "top 75%"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            });
            
            // Video Section
            gsap.from(".details-video-header", {
                scrollTrigger: {
                    trigger: ".details-video-header",
                    start: "top 80%"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            
            gsap.from(".video-wrapper", {
                scrollTrigger: {
                    trigger: ".details-video",
                    start: "top 75%"
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        

}
    }


window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add a slight delay for better visual effect, or immediately hide
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            // Remove from DOM after transition
            setTimeout(() => preloader.remove(), 600);
        }, 500);
    }
});
