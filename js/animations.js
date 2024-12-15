// Animation Controller
class AnimationController {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.progressBar = document.querySelector('.progress');
        this.counter = document.querySelector('.counter');
        this.heroText = document.querySelector('.hero-text');
        this.sections = document.querySelectorAll('section');
        
        // Split text for animations
        this.splitText();
        this.init();
    }

    splitText() {
        // Split hero text for character animation
        const title = this.heroText.querySelector('h1');
        const subtitle = this.heroText.querySelector('.subtitle');
        
        // Split text into characters
        title.innerHTML = title.textContent.split('').map(char => 
            `<span class="char">${char}</span>`
        ).join('');
        
        subtitle.innerHTML = subtitle.textContent.split('').map(char => 
            `<span class="char">${char}</span>`
        ).join('');
    }

    init() {
        this.setupLoadingAnimation();
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupSectionAnimations();
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
            snap: { textContent: 1 }
        }, 0)
        .to(this.loadingScreen, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.loadingScreen.style.display = 'none';
                this.revealContent();
            }
        });
    }

    setupHeroAnimations() {
        const chars = this.heroText.querySelectorAll('.char');
        const highlight = this.heroText.querySelector('.highlight');
        
        // Initial state
        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(highlight, { width: 0 });

        // Hero text animation
        const tl = gsap.timeline({ delay: 1 });
        
        tl.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'back.out(1.7)'
        })
        .to(highlight, {
            width: '100%',
            duration: 0.8,
            ease: 'power4.out'
        }, '-=0.4');

        // Parallax effect on scroll
        gsap.to(this.heroText, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 200,
            opacity: 0
        });
    }

    setupSectionAnimations() {
        this.sections.forEach(section => {
            // Fade in sections
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1
                },
                opacity: 0,
                y: 100,
                duration: 1
            });

            // Parallax backgrounds
            const bg = section.querySelector('.parallax-bg');
            if (bg) {
                gsap.to(bg, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    },
                    y: '20%',
                    ease: 'none'
                });
            }
        });

        // Animate work items
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                },
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 1
            });
        });

        // Animate stats
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 }
            });
        });
    }

    setupScrollAnimations() {
        // Smooth scroll
        gsap.to(window, {
            duration: 0.1,
            scrollTo: {
                y: '#home',
                autoKill: false
            },
            ease: 'power2.inOut'
        });

        // Navigation highlight
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    revealContent() {
        gsap.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
