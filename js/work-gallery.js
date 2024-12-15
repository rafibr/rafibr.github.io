class WorkGallery {
    constructor() {
        this.container = document.querySelector('#work-gallery');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.projects = [
            {
                title: "Booking Bengkel",
                image: "images/work/Booking bengkel.png",
                description: "A modern booking system for auto repair shops",
                tags: ["Web App", "PHP", "MySQL"]
            },
            {
                title: "FKUI Project",
                image: "images/work/FKUI.png",
                description: "Medical faculty information system",
                tags: ["Web Development", "Laravel", "UI/UX"]
            },
            {
                title: "Pelatihan Platform",
                image: "images/work/Pelatihan.png",
                description: "Online training and education platform",
                tags: ["E-Learning", "Web Platform", "React"]
            }
        ];
        
        this.currentIndex = 0;
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        // Create initial set of projects (3 visible + 2 clones for infinite effect)
        this.createInitialProjects();
        this.setupNavigation();
        
        // Set initial position to show the middle set
        this.container.scrollLeft = this.getCardWidth();
    }
    
    createInitialProjects() {
        // Clear container
        this.container.innerHTML = '';
        
        // Add last project as first (for infinite scroll)
        this.createProjectCard(this.projects[this.projects.length - 1], 'clone');
        
        // Add all projects
        this.projects.forEach(project => {
            this.createProjectCard(project);
        });
        
        // Add first project as last (for infinite scroll)
        this.createProjectCard(this.projects[0], 'clone');
    }
    
    createProjectCard(project, className = '') {
        const projectEl = document.createElement('div');
        projectEl.className = 'project-card ' + className;
        projectEl.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        this.container.appendChild(projectEl);
    }
    
    getCardWidth() {
        const card = this.container.querySelector('.project-card');
        const style = window.getComputedStyle(card);
        const gap = parseInt(window.getComputedStyle(this.container).gap);
        return card.offsetWidth + gap;
    }
    
    setupNavigation() {
        this.prevBtn.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn.addEventListener('click', () => this.navigate('next'));
        
        // Handle infinite scroll transitions
        this.container.addEventListener('transitionend', () => {
            if (!this.isAnimating) return;
            
            const cardWidth = this.getCardWidth();
            const cards = this.container.querySelectorAll('.project-card');
            
            if (this.currentIndex >= this.projects.length) {
                this.currentIndex = 0;
                this.container.style.transition = 'none';
                this.container.scrollLeft = cardWidth;
            } else if (this.currentIndex < 0) {
                this.currentIndex = this.projects.length - 1;
                this.container.style.transition = 'none';
                this.container.scrollLeft = cardWidth * this.projects.length;
            }
            
            // Reset transition after position reset
            setTimeout(() => {
                this.container.style.transition = 'all 0.5s ease';
                this.isAnimating = false;
            }, 50);
        });
        
        // Optional: Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate('prev');
            if (e.key === 'ArrowRight') this.navigate('next');
        });
    }
    
    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const cardWidth = this.getCardWidth();
        
        if (direction === 'next') {
            this.currentIndex++;
            this.container.scrollLeft += cardWidth;
        } else {
            this.currentIndex--;
            this.container.scrollLeft -= cardWidth;
        }
    }
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WorkGallery();
});
