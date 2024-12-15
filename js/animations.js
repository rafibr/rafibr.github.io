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
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero section enhanced parallax and text effect
        const heroContent = document.querySelector('.hero-content');
        const heroText = heroContent.querySelector('h1');
        const heroSubtitle = heroContent.querySelector('.subtitle');

        // Split text animation for hero
        if (heroText) {
            const words = heroText.textContent.split(' ');
            heroText.innerHTML = words.map(word => 
                `<span class="word">${word}</span>`
            ).join(' ');

            gsap.from('.word', {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

        // Subtitle fade in
        gsap.from(heroSubtitle, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1,
            ease: "power2.out"
        });

        // Parallax effect for hero section
        gsap.to(heroContent, {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Section headers with split text animation
        gsap.utils.toArray('.section-header').forEach(header => {
            const title = header.querySelector('h2');
            const tag = header.querySelector('.section-tag');
            
            gsap.from(tag, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            if (title) {
                // Split the title into characters
                const chars = title.textContent.split('');
                title.innerHTML = chars.map(char => 
                    `<span class="char">${char}</span>`
                ).join('');

                gsap.from(title.querySelectorAll('.char'), {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });

        // About section enhanced animations
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            const elements = aboutContent.children;
            
            // Add glowing border effect to stats
            document.querySelectorAll('.stat-item').forEach(item => {
                item.classList.add('glowing-border');
            });

            gsap.from(elements, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: aboutContent,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        // Skills animation with stagger and scale
        const skillItems = document.querySelectorAll('.skill-category');
        skillItems.forEach((item, index) => {
            const tags = item.querySelectorAll('.skill-tags span');
            
            gsap.from(item, {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(tags, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Work grid items with 3D hover effect
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach((item, index) => {
            // Initial animation
            gsap.from(item, {
                opacity: 0,
                y: 100,
                rotation: 5,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Add 3D hover effect
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = (x / rect.width - 0.5) * 20;
                const yPercent = (y / rect.height - 0.5) * 20;

                gsap.to(item, {
                    rotationY: xPercent,
                    rotationX: -yPercent,
                    duration: 0.5,
                    ease: "power1.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "power1.out"
                });
            });
        });

        // Stats counter animation with better easing
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const endValue = parseInt(stat.textContent);
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: () => {
                    stat.classList.add('pulse');
                }
            });
        });

        // Fade in sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
