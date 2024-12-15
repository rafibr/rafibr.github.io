class AnimationController {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.progressBar = document.querySelector('.progress');
        this.counter = document.querySelector('.counter');
        this.init();
    }

    init() {
        this.setupLoadingAnimation();
        this.setupScrollAnimations();
    }

    setupLoadingAnimation() {
        const tl = gsap.timeline();
        
        tl.to(this.progressBar, {
            width: '100%',
            duration: 0.8,
            ease: 'power2.inOut'
        })
        .to(this.counter, {
            textContent: '100',
            duration: 0.8,
            ease: 'power2.inOut',
            snap: { textContent: 1 },
        }, 0)
        .to(this.loadingScreen, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.loadingScreen.style.display = 'none';
                this.completeLoading();
            }
        });
    }

    completeLoading() {
        // Reveal animations for main content
        gsap.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }

    setupScrollAnimations() {
        // Navigation elements
        const header = document.querySelector('.header');
        const navLinks = document.querySelectorAll('.nav-link');
        let lastScrollY = window.scrollY;
        let scrollTimeout;

        // Show header after initial load
        setTimeout(() => {
            header.classList.add('visible');
        }, 1000);

        // Handle scroll events
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show/hide header based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.remove('visible');
            } else {
                header.classList.add('visible');
            }
            
            // Update header background
            header.style.background = currentScrollY > 50 ? 
                'rgba(0, 0, 0, 0.95)' : 
                'rgba(0, 0, 0, 0.8)';
            
            lastScrollY = currentScrollY;

            // Update active section
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (currentScrollY > sectionTop && currentScrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        // Throttle scroll events
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 10);
            }
        });

        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = header.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    link.classList.add('active');
                    
                    // Scroll to section
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Parallax background effect
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            gsap.to(bg, {
                y: '30%',
                ease: 'none',
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        });

        // Parallax background animations
        document.querySelectorAll('.parallax-bg .layer').forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const movement = -(layer.offsetHeight * speed);
            
            gsap.to(layer, {
                y: movement,
                ease: "none",
                scrollTrigger: {
                    trigger: layer.closest('section'),
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });

        // Animate moon rotation
        gsap.to('.moon', {
            rotation: 360,
            duration: 100,
            repeat: -1,
            ease: "none"
        });

        // Animate clouds
        gsap.to('.clouds', {
            x: '100%',
            duration: 100,
            repeat: -1,
            ease: "none"
        });

        // Animate stars twinkling
        const stars = document.querySelector('.stars');
        if (stars) {
            gsap.to(stars, {
                opacity: 0.5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        // Animate fog movement
        const fog = document.querySelector('.fog');
        if (fog) {
            gsap.to(fog, {
                x: '50%',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }

        // Hero parallax effect
        gsap.to('.hero-content', {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Parallax background effect for sections
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.to(header, {
                backgroundPositionY: "50%",
                ease: "none",
                scrollTrigger: {
                    trigger: header,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Parallax for work items
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach((item, index) => {
            // Stagger the parallax effect
            const direction = index % 2 === 0 ? 1 : -1;
            
            gsap.from(item, {
                y: 100 * direction,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1
                }
            });

            // Parallax effect for project images
            const img = item.querySelector('img');
            if (img) {
                gsap.to(img, {
                    y: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });

        // Parallax effect for about section
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            const elements = aboutContent.children;
            
            Array.from(elements).forEach((el, index) => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1
                    }
                });
            });
        }

        // Parallax for skill tags
        const skillTags = document.querySelectorAll('.skill-tags span');
        skillTags.forEach((tag, index) => {
            gsap.from(tag, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: tag,
                    start: "top 85%",
                    end: "top 65%",
                    scrub: 1
                }
            });
        });

        // Contact section parallax
        const contactElements = document.querySelectorAll('.contact-content > *');
        contactElements.forEach((el, index) => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1
                }
            });
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 70
                        },
                        ease: "power2.inOut"
                    });
                }
            });
        });

        // Floating animation for stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((stat, index) => {
            gsap.to(stat, {
                y: -20,
                duration: 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 0.2
            });
        });

        // Background parallax for sections
        gsap.utils.toArray('section').forEach(section => {
            const bg = section.querySelector('.section-bg');
            if (bg) {
                gsap.to(bg, {
                    backgroundPosition: `50% ${-50}%`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
