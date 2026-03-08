// Loading Screen Controller
class LoadingScreen {
	constructor() {
		this.loadingScreen = document.querySelector('.loading-screen');
		this.progress = document.querySelector('.progress');
		this.counter = document.querySelector('.counter');
		this.currentProgress = 0;
		this.targetProgress = 0;

		this.init();
	}

	init() {
		this.simulateLoading();
		this.preloadAssets();
	}

	simulateLoading() {
		setTimeout(() => {
			this.targetProgress = 100;
			this.animateProgress(() => {
				setTimeout(() => {
					this.hideLoadingScreen();
				}, 120);
			}, 1100);
		}, 120);
	}

	animateProgress(callback, duration = 800) {
		const startTime = performance.now();
		const startProgress = this.currentProgress;
		const progressDiff = this.targetProgress - startProgress;

		const animate = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const easeInOutCubic = progress < 0.5
				? 4 * Math.pow(progress, 3)
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;
			this.currentProgress = startProgress + (progressDiff * easeInOutCubic);

			// Update UI
			this.progress.style.width = `${this.currentProgress}%`;
			this.counter.textContent = `${Math.round(this.currentProgress)}%`;

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				this.currentProgress = this.targetProgress;
				this.progress.style.width = `${this.currentProgress}%`;
				this.counter.textContent = `${Math.round(this.currentProgress)}%`;
				if (callback) callback();
			}
		};

		requestAnimationFrame(animate);
	}

	preloadAssets() {
		const images = [
			'images/work/wbs-banjarbaru.png',
			'images/work/intan-banjar-mobile.png',
			'images/work/tagid-ai.png',
			'images/work/youthcamp.png',
			'images/work/bank-akasia-kredit.png',
			'images/work/luminatesting.png',
			'images/work/meditap-logo.png',
			'images/work/FKUI.png',
			'images/work/Pelatihan.png',
			'images/backgrounds/hero.jpg',
			'images/backgrounds/about.jpg',
			'images/backgrounds/work.jpg',
			'images/backgrounds/contact.jpg'
		];

		let loadedImages = 0;
		const totalImages = images.length;

		images.forEach(src => {
			const img = new Image();
			img.onload = () => {
				loadedImages++;
				if (loadedImages === totalImages) {
					console.log('All images preloaded');
				}
			};
			img.onerror = () => {
				loadedImages++;
				console.warn(`Failed to load image: ${src}`);
			};
			img.src = src;
		});
	}
	hideLoadingScreen() {
		this.loadingScreen.style.opacity = '0';
		this.loadingScreen.style.pointerEvents = 'none';

		setTimeout(() => {
			this.loadingScreen.style.display = 'none';
			document.body.style.overflow = 'auto';

			// Trigger header animation
			setTimeout(() => {
				const header = document.querySelector('.header');
				if (header) {
					header.classList.add('visible');
				}
			}, 50); // Reduced from 100ms to 50ms			// Start main animations
			this.triggerMainAnimations();

			// Dispatch loading complete event for other scripts
			const loadingCompleteEvent = new Event('loadingComplete');
			document.dispatchEvent(loadingCompleteEvent);
		}, 300); // Reduced from 500ms to 300ms
	}

	triggerMainAnimations() {
		// Trigger hero animations
		const heroElements = document.querySelectorAll('.fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3');
		heroElements.forEach((element, index) => {
			setTimeout(() => {
				element.style.opacity = '1';
				element.style.transform = 'translateY(0)';
			}, index * 200);
		});

		// Initialize GSAP animations if available
		if (typeof gsap !== 'undefined') {
			gsap.from('.hero h1', {
				duration: 1.2,
				y: 50,
				opacity: 0,
				ease: 'power3.out',
				delay: 0.3
			}); gsap.from('.hero-description', {
				duration: 1,
				y: 30,
				opacity: 0,
				ease: 'power2.out',
				delay: 0.6
			});

			gsap.from('.hero-buttons .btn', {
				duration: 0.8,
				y: 20,
				opacity: 0,
				stagger: 0.2,
				ease: 'back.out(1.7)',
				delay: 0.9
			});
		}
	}
}

// Initialize loading screen
document.addEventListener('DOMContentLoaded', () => {
	new LoadingScreen();
});
