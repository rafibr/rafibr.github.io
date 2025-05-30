// Parallax and Smooth Scroll Effects
class ParallaxController {
	constructor() {
		this.scrollY = 0;
		this.currentScrollY = 0;
		this.ease = 0.1;

		this.init();
	}

	init() {
		this.setupSmoothScroll();
		this.setupParallax();
		this.setupScrollProgress();
		this.setupNavigation();
		this.animate();
	}

	setupSmoothScroll() {
		// Smooth scroll for anchor links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = anchor.getAttribute('href');
				const targetElement = document.querySelector(targetId);

				if (targetElement) {
					const offsetTop = targetElement.offsetTop - 80;

					window.scrollTo({
						top: offsetTop,
						behavior: 'smooth'
					});

					// Update active navigation
					this.updateActiveNav(targetId);
				}
			});
		});
	}

	setupParallax() {
		this.parallaxElements = document.querySelectorAll('.parallax-bg');
		this.heroCanvas = document.querySelector('#hero-canvas');
	}

	setupScrollProgress() {
		// Create scroll progress indicator
		const progressBar = document.createElement('div');
		progressBar.className = 'scroll-progress';
		progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent), #64b5f6);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
		document.body.appendChild(progressBar);

		this.progressBar = progressBar;
	}

	setupNavigation() {
		// Update active navigation based on scroll position
		this.sections = document.querySelectorAll('section[id]');
		this.navLinks = document.querySelectorAll('.nav-link');
	}

	updateActiveNav(activeId) {
		this.navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === activeId) {
				link.classList.add('active');
			}
		});
	}

	updateScrollProgress() {
		const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = (this.currentScrollY / scrollHeight) * 100;
		this.progressBar.style.width = `${scrolled}%`;
	}

	updateParallax() {
		this.parallaxElements.forEach((element, index) => {
			const speed = 0.5 + (index * 0.1);
			const yPos = -(this.currentScrollY * speed);
			element.style.transform = `translate3d(0, ${yPos}px, 0)`;
		});

		// Hero canvas parallax
		if (this.heroCanvas) {
			const yPos = this.currentScrollY * 0.3;
			this.heroCanvas.style.transform = `translate3d(0, ${yPos}px, 0)`;
		}
	}

	updateActiveNavigation() {
		const scrollPos = this.currentScrollY + 100;

		this.sections.forEach(section => {
			const top = section.offsetTop;
			const bottom = top + section.offsetHeight;
			const id = section.getAttribute('id');

			if (scrollPos >= top && scrollPos <= bottom) {
				this.updateActiveNav(`#${id}`);
			}
		});
	}

	animate() {
		// Get current scroll position
		this.scrollY = window.pageYOffset;

		// Smooth interpolation
		this.currentScrollY += (this.scrollY - this.currentScrollY) * this.ease;

		// Update effects
		this.updateScrollProgress();
		this.updateParallax();
		this.updateActiveNavigation();

		// Header visibility
		const header = document.querySelector('.header');
		if (this.currentScrollY > 100) {
			header.classList.add('visible');
		} else {
			header.classList.remove('visible');
		}

		requestAnimationFrame(() => this.animate());
	}
}

// Intersection Observer for scroll animations
class ScrollAnimations {
	constructor() {
		this.init();
	}

	init() {
		this.setupIntersectionObserver();
	}

	setupIntersectionObserver() {
		const options = {
			threshold: 0.1,
			rootMargin: '0px 0px -100px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const element = entry.target;

					// Add animation classes
					if (element.classList.contains('fade-in')) {
						element.style.opacity = '1';
						element.style.transform = 'translateY(0)';
					}

					if (element.classList.contains('slide-in-left')) {
						element.style.opacity = '1';
						element.style.transform = 'translateX(0)';
					}

					if (element.classList.contains('slide-in-right')) {
						element.style.opacity = '1';
						element.style.transform = 'translateX(0)';
					}

					if (element.classList.contains('slide-in-up')) {
						element.style.opacity = '1';
						element.style.transform = 'translateY(0)';
					}

					if (element.classList.contains('scale-in')) {
						element.style.opacity = '1';
						element.style.transform = 'scale(1)';
					}

					if (element.classList.contains('rotate-in')) {
						element.style.opacity = '1';
						element.style.transform = 'rotate(0deg)';
					}

					if (element.classList.contains('bounce-in')) {
						element.style.animation = 'bounceIn 1s ease-out forwards';
					}

					// Stagger animations for children
					const children = element.querySelectorAll('.stagger-child');
					children.forEach((child, index) => {
						setTimeout(() => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
						}, index * 100);
					});
				}
			});
		}, options);

		// Observe elements
		const elementsToObserve = document.querySelectorAll(`
            .fade-in, .slide-in-left, .slide-in-right, .slide-in-up,
            .scale-in, .rotate-in, .bounce-in, .card-hover,
            .section-header, .about-content, .skills-container,
            .project-grid, .contact-content
        `);

		elementsToObserve.forEach(el => {
			// Set initial states
			if (el.classList.contains('fade-in')) {
				el.style.opacity = '0';
				el.style.transform = 'translateY(30px)';
				el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
			}

			if (el.classList.contains('slide-in-left')) {
				el.style.opacity = '0';
				el.style.transform = 'translateX(-50px)';
				el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
			}

			if (el.classList.contains('slide-in-right')) {
				el.style.opacity = '0';
				el.style.transform = 'translateX(50px)';
				el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
			}

			if (el.classList.contains('slide-in-up')) {
				el.style.opacity = '0';
				el.style.transform = 'translateY(50px)';
				el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
			}

			if (el.classList.contains('scale-in')) {
				el.style.opacity = '0';
				el.style.transform = 'scale(0.8)';
				el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
			}

			if (el.classList.contains('rotate-in')) {
				el.style.opacity = '0';
				el.style.transform = 'rotate(-10deg)';
				el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
			}

			observer.observe(el);
		});
	}
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new ParallaxController();
	new ScrollAnimations();
});
