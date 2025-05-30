// Enhanced Animations Controller
class EnhancedAnimations {
	constructor() {
		this.init();
	}

	init() {
		this.setupIntersectionObserver();
		this.initTypewriterEffect();
		this.initParticleSystem();
		this.initGlitchEffect();
		this.addScrollAnimations();
	}

	setupIntersectionObserver() {
		const options = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const element = entry.target;

					// Add animation classes based on element type
					if (element.classList.contains('fade-in')) {
						element.style.opacity = '1';
						element.style.transform = 'translateY(0)';
					}

					if (element.classList.contains('slide-in-left')) {
						element.style.transform = 'translateX(0)';
						element.style.opacity = '1';
					}

					if (element.classList.contains('slide-in-right')) {
						element.style.transform = 'translateX(0)';
						element.style.opacity = '1';
					}

					if (element.classList.contains('slide-in-up')) {
						element.style.transform = 'translateY(0)';
						element.style.opacity = '1';
					}

					if (element.classList.contains('scale-in')) {
						element.style.transform = 'scale(1)';
						element.style.opacity = '1';
					}

					if (element.classList.contains('rotate-in')) {
						element.style.transform = 'rotate(0deg)';
						element.style.opacity = '1';
					}

					if (element.classList.contains('bounce-in')) {
						element.style.animation = 'bounceIn 1s ease-out forwards';
					}
				}
			});
		}, options);

		// Observe all animation elements
		const animatedElements = document.querySelectorAll([
			'.fade-in', '.slide-in-left', '.slide-in-right', '.slide-in-up',
			'.scale-in', '.rotate-in', '.bounce-in', '.card-hover'
		].join(', '));

		animatedElements.forEach(el => {
			// Set initial states
			if (el.classList.contains('fade-in')) {
				el.style.opacity = '0';
				el.style.transform = 'translateY(30px)';
				el.style.transition = 'all 0.8s ease-out';
			}

			if (el.classList.contains('slide-in-left')) {
				el.style.transform = 'translateX(-50px)';
				el.style.opacity = '0';
				el.style.transition = 'all 0.8s ease-out';
			}

			if (el.classList.contains('slide-in-right')) {
				el.style.transform = 'translateX(50px)';
				el.style.opacity = '0';
				el.style.transition = 'all 0.8s ease-out';
			}

			if (el.classList.contains('slide-in-up')) {
				el.style.transform = 'translateY(50px)';
				el.style.opacity = '0';
				el.style.transition = 'all 0.8s ease-out';
			}

			if (el.classList.contains('scale-in')) {
				el.style.transform = 'scale(0.8)';
				el.style.opacity = '0';
				el.style.transition = 'all 0.8s ease-out';
			}

			if (el.classList.contains('rotate-in')) {
				el.style.transform = 'rotate(-10deg)';
				el.style.opacity = '0';
				el.style.transition = 'all 0.8s ease-out';
			}

			observer.observe(el);
		});
	}

	initTypewriterEffect() {
		const typewriterElements = document.querySelectorAll('.typewriter');

		typewriterElements.forEach(element => {
			const text = element.textContent;
			element.textContent = '';

			let i = 0;
			const typeEffect = setInterval(() => {
				if (i < text.length) {
					element.textContent += text.charAt(i);
					i++;
				} else {
					clearInterval(typeEffect);
					// Remove cursor after typing
					setTimeout(() => {
						element.style.borderRight = 'none';
					}, 1000);
				}
			}, 100);
		});
	}

	initParticleSystem() {
		const hero = document.querySelector('.hero');
		if (!hero) return;

		// Create particles
		for (let i = 0; i < 50; i++) {
			const particle = document.createElement('div');
			particle.className = 'particle';

			// Random size and position
			const size = Math.random() * 4 + 2;
			particle.style.width = size + 'px';
			particle.style.height = size + 'px';
			particle.style.left = Math.random() * 100 + '%';
			particle.style.top = Math.random() * 100 + '%';

			// Random animation delay
			particle.style.animationDelay = Math.random() * 4 + 's';
			particle.style.animationDuration = (Math.random() * 3 + 2) + 's';

			hero.appendChild(particle);
		}
	}

	initGlitchEffect() {
		const glitchElements = document.querySelectorAll('.glitch');

		glitchElements.forEach(element => {
			element.setAttribute('data-text', element.textContent);

			// Random glitch trigger
			setInterval(() => {
				if (Math.random() > 0.95) {
					element.style.animation = 'none';
					element.offsetHeight; // Trigger reflow
					element.style.animation = 'glitch 0.3s ease-in-out';
				}
			}, 100);
		});
	}

	addScrollAnimations() {
		// Smooth scroll for navigation links
		const navLinks = document.querySelectorAll('a[href^="#"]');

		navLinks.forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = link.getAttribute('href');
				const targetSection = document.querySelector(targetId);

				if (targetSection) {
					targetSection.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			});
		});

		// Header visibility on scroll
		const header = document.querySelector('.header');
		let lastScrollY = window.scrollY;

		window.addEventListener('scroll', () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > 100) {
				header.classList.add('visible');
			} else {
				header.classList.remove('visible');
			}

			lastScrollY = currentScrollY;
		});

		// Parallax effect for backgrounds
		window.addEventListener('scroll', () => {
			const scrolled = window.pageYOffset;
			const parallaxElements = document.querySelectorAll('.parallax-bg');

			parallaxElements.forEach(element => {
				const speed = 0.5;
				element.style.transform = `translateY(${scrolled * speed}px)`;
			});
		});
	}

	// Counter animation for stats
	animateCounters() {
		const counters = document.querySelectorAll('.stat-number');

		counters.forEach(counter => {
			const target = parseInt(counter.textContent);
			let current = 0;
			const increment = target / 100;

			const updateCounter = () => {
				if (current < target) {
					current += increment;
					counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
					requestAnimationFrame(updateCounter);
				} else {
					counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
				}
			};

			// Start animation when element is visible
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						updateCounter();
						observer.unobserve(entry.target);
					}
				});
			});

			observer.observe(counter);
		});
	}
}

// Initialize enhanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new EnhancedAnimations();
});
