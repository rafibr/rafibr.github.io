class PortfolioController {
    constructor() {
        this.initializeComponents();
        this.setupEventListeners();
    }

    initializeComponents() {
        this.setupMobileMenu();
        this.populateProjects();
        this.setupFormValidation();
    }

    setupMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
    }

    populateProjects() {
        const projects = [
            {
                title: 'Interactive 3D Visualization',
                description: 'A WebGL-based interactive data visualization project using Three.js',
                image: 'images/project1.jpg',
                tags: ['Three.js', 'WebGL', 'JavaScript'],
                link: '#'
            },
            {
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce solution with real-time inventory management',
                image: 'images/project2.jpg',
                tags: ['React', 'Node.js', 'MongoDB'],
                link: '#'
            },
            {
                title: 'Portfolio Website',
                description: 'Modern portfolio website with GSAP animations and 3D effects',
                image: 'images/project3.jpg',
                tags: ['GSAP', 'Three.js', 'CSS3'],
                link: '#'
            }
        ];

        const workGrid = document.querySelector('.work-grid');
        if (workGrid) {
            workGrid.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
        }
    }

    createProjectCard(project) {
        return `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="project-link" target="_blank">View Project</a>
                </div>
            </div>
        `;
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Add floating label behavior
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');

            if (input && label) {
                input.addEventListener('focus', () => {
                    label.classList.add('active');
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.classList.remove('active');
                    }
                });

                // Check initial state
                if (input.value) {
                    label.classList.add('active');
                }
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message
        this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
    }

    showFormMessage(message, type = 'success') {
        const form = document.getElementById('contact-form');
        
        // Remove existing message if any
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create and add new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        form.appendChild(messageElement);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    const menuBtn = document.querySelector('.menu-btn');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuBtn.classList.remove('active');
                    }

                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize portfolio controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioController();
});
