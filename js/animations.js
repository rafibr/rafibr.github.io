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

        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Lazy Loading Images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('skeleton-loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));

        // Page Transitions
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Custom Cursor
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
        document.addEventListener('mouseup', () => cursor.classList.remove('clicked'));
    }
}

class ParallaxController {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.parallax-bg');
        this.currentPositions = new Map();
        this.targetPositions = new Map();
        
        // Initialize positions
        this.parallaxElements.forEach(element => {
            this.currentPositions.set(element, 0);
            this.targetPositions.set(element, 0);
        });
        
        this.lerp = 0.1; // Adjust this value to control smoothness (0.1 = smooth, 1 = instant)
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.animate();
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView) {
                const speed = element.dataset.speed || -0.3;
                const target = scrolled * speed;
                this.targetPositions.set(element, target);
                
                if (!this.isRunning) {
                    this.isRunning = true;
                    this.animate();
                }
            }
        });
    }
    
    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    
    animate() {
        let isMoving = false;
        
        this.parallaxElements.forEach(element => {
            const current = this.currentPositions.get(element);
            const target = this.targetPositions.get(element);
            
            if (Math.abs(target - current) > 0.1) {
                isMoving = true;
                const newPosition = this.lerp(current, target, this.lerp);
                this.currentPositions.set(element, newPosition);
                
                // Apply transform with hardware acceleration
                element.style.transform = `translate3d(0, ${newPosition}px, 0)`;
            }
        });
        
        if (isMoving) {
            requestAnimationFrame(this.animate.bind(this));
        } else {
            this.isRunning = false;
        }
    }
}

class StarryNightController {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.shootingStars = [];
        this.lastShootingStar = 0;
        this.meteorShowerActive = false;
        this.meteorShowerIntensity = 0;
        this.maxMeteors = 10;
        
        this.init();
    }
    
    init() {
        // Setup canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);
        
        // Resize handling
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create initial stars
        this.createStars();
        
        // Start meteor shower cycle
        this.updateMeteorShower();
        
        // Start animation
        this.animate();
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Recreate stars on resize
        this.createStars();
    }
    
    createStars() {
        this.stars = [];
        const numStars = Math.floor((this.width * this.height) / 3000);
        
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2,
                twinkleSpeed: 0.03 + Math.random() * 0.05,
                brightness: Math.random(),
                twinkleDirection: 1
            });
        }
    }
    
    updateMeteorShower() {
        setInterval(() => {
            // Randomly activate/deactivate meteor shower
            this.meteorShowerActive = Math.random() < 0.3; // 30% chance of meteor shower
            
            if (this.meteorShowerActive) {
                // Random intensity for each shower
                this.meteorShowerIntensity = 0.3 + Math.random() * 0.7;
                
                // Random duration for the shower (5-15 seconds)
                setTimeout(() => {
                    this.meteorShowerActive = false;
                    this.meteorShowerIntensity = 0;
                }, 5000 + Math.random() * 10000);
            }
        }, 15000); // Check every 15 seconds
    }
    
    createShootingStar() {
        const now = Date.now();
        const baseInterval = this.meteorShowerActive ? 100 : 2000;
        const randomInterval = this.meteorShowerActive ? 
            Math.random() * 200 : // More frequent during shower
            Math.random() * 3000; // Less frequent normally
        
        if (now - this.lastShootingStar > baseInterval + randomInterval && 
            this.shootingStars.length < (this.meteorShowerActive ? this.maxMeteors * this.meteorShowerIntensity : 2)) {
            
            this.lastShootingStar = now;
            
            // Create multiple meteors during shower
            const meteorsToCreate = this.meteorShowerActive ? 
                Math.floor(1 + Math.random() * 3) : 1;
            
            for (let i = 0; i < meteorsToCreate; i++) {
                const star = {
                    x: Math.random() * this.width * 1.5 - this.width * 0.25,
                    y: -50 - Math.random() * 100,
                    length: 100 + Math.random() * 150,
                    speed: 15 + Math.random() * 20,
                    angle: Math.PI / 4 + (Math.random() * Math.PI / 4),
                    opacity: 0.8 + Math.random() * 0.2,
                    color: this.meteorShowerActive ? 
                        this.getRandomMeteorColor() : 
                        'rgba(255, 255, 255, 1)',
                    size: this.meteorShowerActive ? 
                        1 + Math.random() * 2 : 
                        1
                };
                
                this.shootingStars.push(star);
            }
        }
    }
    
    getRandomMeteorColor() {
        const colors = [
            'rgba(255, 255, 255, 1)', // White
            'rgba(255, 200, 100, 1)', // Golden
            'rgba(100, 200, 255, 1)', // Blue
            'rgba(255, 150, 150, 1)'  // Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateStars() {
        this.stars.forEach(star => {
            star.brightness += star.twinkleSpeed * star.twinkleDirection;
            
            if (star.brightness > 1) {
                star.brightness = 1;
                star.twinkleDirection = -1;
            } else if (star.brightness < 0.3) {
                star.brightness = 0.3;
                star.twinkleDirection = 1;
            }
        });
    }
    
    updateShootingStars() {
        this.shootingStars = this.shootingStars.filter(star => {
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.01;
            
            return star.opacity > 0 && 
                   star.x < this.width * 1.2 && 
                   star.y < this.height * 1.2;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw stars
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            this.ctx.fill();
        });
        
        // Draw shooting stars
        this.shootingStars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            const tailX = star.x - Math.cos(star.angle) * star.length;
            const tailY = star.y - Math.sin(star.angle) * star.length;
            
            const gradient = this.ctx.createLinearGradient(star.x, star.y, tailX, tailY);
            gradient.addColorStop(0, star.color.replace('1)', `${star.opacity})`));
            gradient.addColorStop(1, star.color.replace('1)', '0)'));
            
            this.ctx.lineTo(tailX, tailY);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = star.size;
            this.ctx.stroke();
            
            // Optional: Add glowing effect during meteor shower
            if (this.meteorShowerActive) {
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = star.color.replace('1)', `${star.opacity * 0.5})`);
                this.ctx.fill();
            }
        });
    }
    
    animate() {
        this.updateStars();
        this.createShootingStar();
        this.updateShootingStars();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize ParallaxController
const parallaxController = new ParallaxController();

// Add data-speed attribute to parallax elements
document.querySelectorAll('.parallax-bg').forEach(element => {
    if (!element.hasAttribute('data-speed')) {
        element.setAttribute('data-speed', '-0.3');
    }
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new StarryNightController();
});
