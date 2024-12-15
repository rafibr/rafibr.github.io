// Micro-interactions
class MicroAnimations {
    constructor() {
        this.initNavHover();
        this.initButtonEffects();
        this.initCursorEffect();
    }

    initNavHover() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                anime({
                    targets: link,
                    scale: 1.1,
                    translateY: -2,
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                });
            });

            link.addEventListener('mouseleave', () => {
                anime({
                    targets: link,
                    scale: 1,
                    translateY: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('button, .btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            button.addEventListener('click', () => {
                anime({
                    targets: button,
                    scale: [1, 0.95, 1],
                    duration: 300,
                    easing: 'easeInOutQuad'
                });
            });
        });
    }

    initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        // Style for custom cursor
        anime.set(cursor, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            backgroundColor: 'rgba(33, 150, 243, 0.3)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: 0
        });

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor with fade in
            if (parseFloat(cursor.style.opacity) === 0) {
                anime({
                    targets: cursor,
                    opacity: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });

        // Smooth cursor following
        function updateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;
            
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                anime({
                    targets: cursor,
                    width: '40px',
                    height: '40px',
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                });
            });

            el.addEventListener('mouseleave', () => {
                anime({
                    targets: cursor,
                    width: '20px',
                    height: '20px',
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                });
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MicroAnimations();
});
