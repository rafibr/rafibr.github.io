// Counter Animation and Visual Effects
class VisualEffects {
	constructor() {
		this.init();
	}

	init() {
		this.initCounterAnimations();
		this.initTextAnimations();
		this.initBackgroundEffects();
		this.initButtonEffects();
		this.initSkillTagAnimations();
	}

	initCounterAnimations() {
		const counters = document.querySelectorAll('.stat-number');

		const animateCounter = (counter) => {
			const target = parseInt(counter.textContent.replace(/\D/g, ''));
			const duration = 2000; // 2 seconds
			const startTime = performance.now();
			const hasPlus = counter.textContent.includes('+');

			const updateCounter = (currentTime) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// Easing function for smooth animation
				const easeOutQuart = 1 - Math.pow(1 - progress, 4);
				const current = Math.floor(easeOutQuart * target);

				counter.textContent = current + (hasPlus ? '+' : '');

				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				} else {
					counter.textContent = target + (hasPlus ? '+' : '');
				}
			};

			requestAnimationFrame(updateCounter);
		};

		// Use Intersection Observer to trigger counter animation
		const counterObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					counterObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		counters.forEach(counter => {
			counterObserver.observe(counter);
		});
	}

	initTextAnimations() {
		// Split text animation for headings
		const animateText = (element) => {
			const text = element.textContent;
			const chars = text.split('');
			element.innerHTML = '';

			chars.forEach((char, index) => {
				const span = document.createElement('span');
				span.textContent = char === ' ' ? '\u00A0' : char;
				span.style.opacity = '0';
				span.style.transform = 'translateY(20px)';
				span.style.transition = `all 0.5s ease ${index * 0.05}s`;
				element.appendChild(span);
			});

			// Trigger animation
			setTimeout(() => {
				element.querySelectorAll('span').forEach(span => {
					span.style.opacity = '1';
					span.style.transform = 'translateY(0)';
				});
			}, 100);
		};

		// Apply to section titles
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
					animateText(entry.target);
					entry.target.classList.add('animated');
				}
			});
		}, { threshold: 0.8 });

		document.querySelectorAll('h2').forEach(h2 => {
			observer.observe(h2);
		});
	}

	initBackgroundEffects() {
		// Create floating particles
		const createParticles = () => {
			const particleContainer = document.createElement('div');
			particleContainer.className = 'particle-container';
			particleContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;

			for (let i = 0; i < 20; i++) {
				const particle = document.createElement('div');
				particle.className = 'floating-particle';
				particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: var(--color-accent);
                    border-radius: 50%;
                    opacity: ${Math.random() * 0.5 + 0.1};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
                `;
				particleContainer.appendChild(particle);
			}

			document.body.appendChild(particleContainer);
		};

		createParticles();

		// Mouse trail effect
		let mouseTrail = [];
		const maxTrailLength = 10;

		document.addEventListener('mousemove', (e) => {
			mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

			if (mouseTrail.length > maxTrailLength) {
				mouseTrail.shift();
			}

			// Create trail effect
			const trail = document.createElement('div');
			trail.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--color-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 3}px;
                top: ${e.clientY - 3}px;
                opacity: 0.7;
                animation: trailFade 0.5s ease-out forwards;
            `;

			document.body.appendChild(trail);

			setTimeout(() => {
				trail.remove();
			}, 500);
		});
	}

	initButtonEffects() {
		// Ripple effect for buttons
		const createRipple = (e, button) => {
			const rect = button.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			const ripple = document.createElement('span');
			ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

			button.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		};

		// Apply ripple effect to all buttons
		document.querySelectorAll('.btn, button').forEach(button => {
			button.style.position = 'relative';
			button.style.overflow = 'hidden';

			button.addEventListener('click', (e) => {
				createRipple(e, button);
			});
		});
	}

	initSkillTagAnimations() {
		// Skill tags hover effects
		const skillTags = document.querySelectorAll('.skill-tags span');

		skillTags.forEach((tag, index) => {
			// Stagger initial animation
			tag.style.opacity = '0';
			tag.style.transform = 'translateY(20px)';
			tag.style.transition = `all 0.5s ease ${index * 0.1}s`;

			// Add hover effects
			tag.addEventListener('mouseenter', () => {
				tag.style.transform = 'translateY(-5px) scale(1.05)';
				tag.style.boxShadow = '0 10px 20px rgba(33, 150, 243, 0.3)';
			});

			tag.addEventListener('mouseleave', () => {
				tag.style.transform = 'translateY(0) scale(1)';
				tag.style.boxShadow = 'none';
			});
		});

		// Trigger animation when in view
		const skillObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const tags = entry.target.querySelectorAll('.skill-tags span');
					tags.forEach(tag => {
						tag.style.opacity = '1';
						tag.style.transform = 'translateY(0)';
					});
					skillObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		document.querySelectorAll('.skills-container').forEach(container => {
			skillObserver.observe(container);
		});
	}
}

// Initialize visual effects
document.addEventListener('DOMContentLoaded', () => {
	new VisualEffects();
});

// Add CSS animations for new effects
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        0% { opacity: 0.7; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.3); }
    }

    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }

    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }

    .floating-particle {
        animation-timing-function: linear;
    }
`;
document.head.appendChild(style);
