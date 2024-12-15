document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Add hover effect to clickable elements
    const clickables = document.querySelectorAll('a, button, .project-card, .skill-tags span');
    clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Animation loop
    function animate() {
        // Smooth cursor movement
        const ease = 0.15;
        
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        followerX += (mouseX - followerX) * (ease * 0.5);
        followerY += (mouseY - followerY) * (ease * 0.5);
        
        // Update cursor positions
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
