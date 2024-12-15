class ParticleSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('hero-canvas'),
            alpha: true
        });
        
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Setup camera
        this.camera.position.z = 3;
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 5000;
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const color1 = new THREE.Color(0x2196f3); // Primary color
        const color2 = new THREE.Color(0xff4081); // Secondary color
        
        for(let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
            
            // Color
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i] = mixedColor.r;
            colors[i + 1] = mixedColor.g;
            colors[i + 2] = mixedColor.b;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
        
        // Event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Start animation
        this.animate();
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.mouseX = (event.clientX - window.innerWidth / 2) / window.innerWidth;
        this.mouseY = (event.clientY - window.innerHeight / 2) / window.innerHeight;
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Smooth mouse movement
        this.targetX += (this.mouseX - this.targetX) * 0.02;
        this.targetY += (this.mouseY - this.targetY) * 0.02;
        
        // Rotate particles based on mouse position
        this.particles.rotation.x += this.targetY * 0.01;
        this.particles.rotation.y += this.targetX * 0.01;
        
        // Gentle constant rotation
        this.particles.rotation.z += 0.001;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem();
});
