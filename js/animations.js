// Animation Controller
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
        this.setupProjectFilters();
        this.setupLazyLoading();
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
                this.revealContent();
            }
        });
    }

    revealContent() {
        // Reveal animations for main content
        gsap.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Animate stats counting
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                }
            });
        });
    }

    setupScrollAnimations() {
        // Header scroll effect
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            header.classList.toggle('visible', currentScrollY < lastScrollY || currentScrollY < 100);
            header.style.background = currentScrollY > 50 ? 
                'rgba(0, 0, 0, 0.95)' : 
                'rgba(0, 0, 0, 0.8)';
            
            lastScrollY = currentScrollY;
        });

        // Scroll reveal animations
        gsap.utils.toArray('.fade-up').forEach(elem => {
            gsap.from(elem, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 80%'
                }
            });
        });

        // Parallax effect
        gsap.utils.toArray('.parallax-bg').forEach(bg => {
            gsap.to(bg, {
                y: '30%',
                ease: 'none',
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }

    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                gsap.to(projects, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    stagger: 0.1,
                    onComplete: () => {
                        projects.forEach(project => {
                            project.style.display = 
                                filter === 'all' || project.dataset.category === filter 
                                    ? 'block' 
                                    : 'none';
                        });
                        
                        gsap.to(projects, {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            stagger: 0.1,
                            delay: 0.1
                        });
                    }
                });
            });
        });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('skeleton-loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
