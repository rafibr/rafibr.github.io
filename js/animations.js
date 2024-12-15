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
