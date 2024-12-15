class AnimationController {
    constructor() {
        this.initializeGSAP();
        this.setupLoaderAnimation();
        this.setupScrollAnimations();
    }

    initializeGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({
            nullTargetWarn: false
        });
    }

    setupLoaderAnimation() {
        const tl = gsap.timeline();
        
        // Simulate loading progress
        let progress = 0;
        const progressBar = document.querySelector('.progress');
        const counter = document.querySelector('.counter');
        
        const interval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress > 100) progress = 100;
            
            gsap.to(progressBar, {
                width: `${progress}%`,
                duration: 0.5,
                ease: 'power1.out'
            });
            
            counter.textContent = `${Math.round(progress)}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                this.completeLoading(tl);
            }
        }, 150);
    }

    completeLoading(tl) {
        tl.to('.loading-screen', {
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
                this.playIntroAnimation();
            }
        });
    }

    playIntroAnimation() {
        const introTl = gsap.timeline();

        introTl
            .from('nav', {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.hero h1', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.subtitle', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.7')
            .from('.cta-container', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.7');
    }

    setupScrollAnimations() {
        // About section animations
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Tech stack items animation
        gsap.from('.tech-item', {
            scrollTrigger: {
                trigger: '.tech-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });

        // Experience cards animation
        gsap.from('.experience-card', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });

        // Project cards animation
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.work-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Contact section animation
        gsap.from('.contact-content', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Form elements animation
        gsap.from('.form-group', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
