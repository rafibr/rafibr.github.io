# Rafi BR Portfolio Website

A modern, animated portfolio website showcasing skills, projects, and contact information with advanced visual effects and animations.

## 📋 Features

- **Responsive Design** - Fully responsive layout that works on all devices (400px - 1400px+)
- **Advanced Animations** - Multiple animation types including typewriter, floating, pulse, glitch effects
- **Particle System** - Interactive background particles with Three.js
- **Loading Screen** - Custom loading screen with progress bar
- **Parallax Effects** - Subtle parallax scrolling backgrounds
- **Project Filtering** - Filter projects by category
- **Contact Form** - Functional contact form using EmailJS
- **Mouse Trail Effects** - Interactive cursor effects
- **Mobile-Optimized** - Enhanced mobile navigation and touch interactions
- **Scroll Animations** - Elements animate as they enter the viewport

## 🛠️ Technologies Used

- HTML5 / CSS3
- JavaScript (ES6+)
- GSAP (Animation)
- Three.js (3D/WebGL)
- Anime.js (Animation)
- EmailJS (Contact Form)
- Intersection Observer API
- CSS Grid/Flexbox

## 🚀 Performance Optimizations

- Lazy loading images
- Asset preloading system
- Optimized animations with requestAnimationFrame
- Debounced scroll events
- Progressive asset loading

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── styles.css              # Core styles
├── css/
│   └── animations.css      # Animation keyframes and utility classes
├── js/
│   ├── animations.js       # Primary animation controllers
│   ├── contact.js          # Contact form functionality
│   ├── cursor.js           # Custom cursor effects
│   ├── enhanced-animations.js # Advanced animation effects
│   ├── footer-year.js      # Dynamic year in footer
│   ├── loading.js          # Loading screen functionality
│   ├── main.js             # Core functionality
│   ├── micro-animations.js # Small UI animations
│   ├── parallax.js         # Parallax scrolling effects
│   ├── three-scene.js      # Three.js background effects
│   ├── visual-effects.js   # Visual effects and particles
│   └── work-gallery.js     # Project filtering and showcase
└── images/                 # Website images and assets
    ├── backgrounds/        # Section background images
    └── work/               # Project screenshots
```

## 🎨 Animation Classes

The website includes many animation utility classes you can use:

- `fade-in` - Simple fade in animation
- `fade-in-delay-1` through `fade-in-delay-5` - Fade in with increasing delays
- `slide-in-up`, `slide-in-left`, `slide-in-right` - Slide in animations
- `bounce-in` - Bouncing entrance effect
- `scale-in` - Scale from small to normal size
- `rotate-in` - Rotation animation
- `floating` - Gentle floating motion
- `pulse` - Pulsing effect for buttons
- `typewriter` - Text typing effect
- `glitch` - Digital glitch effect

## 📱 Responsive Breakpoints

- 1400px+ - Large desktops
- 1200px - Standard desktops
- 992px - Small desktops and large tablets
- 768px - Tablets
- 576px - Large phones
- 400px - Small phones

## 🧩 Components

- **Loading Screen** - Preloads assets with progress indicator
- **Animated Navigation** - Smooth scrolling with active state tracking
- **Hero Section** - Animated introduction with particle background
- **About Section** - Skills and statistics with animation sequences
- **Work Section** - Filterable project gallery with hover effects
- **Contact Section** - Interactive contact form with validation

## 🔧 Setup and Customization

1. Clone the repository
2. Modify `index.html` to update content
3. Add your own projects to the work section
4. Update EmailJS settings in `contact.js` with your service keys
5. Customize colors and themes in `styles.css`

## ⚙️ Configuration

- Background effects can be adjusted in `visual-effects.js`
- Animation timing can be modified in `animations.css`
- Loading screen behavior can be configured in `loading.js`

## 📝 License

This project is released under the MIT License

## 👤 Author

**Rafi Brilliansyah**
- GitHub: [rafibr](https://github.com/rafibr)
- LinkedIn: [rafi-brilliansyah](https://linkedin.com/in/rafi-brilliansyah)
- Email: rafi.brilliansyah@gmail.com

---

© <span id="readme-year">2024</span> Rafi BR. All rights reserved.
