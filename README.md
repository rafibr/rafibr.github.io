# Rafi BR Portfolio Website

Personal portfolio website for Muhammad Rafi Brilliansyah Ramadhan, updated with current profile content, selected public work, internal systems, and direct contact channels.

## Features

- Responsive single-page portfolio layout
- Updated hero, about, and contact sections based on the latest profile deck
- Selected work section covering public and internal projects
- Animated loading screen, micro-interactions, and section reveals
- Three.js hero background loaded through an ES module
- EmailJS contact form integration
- Mobile-friendly navigation and layout behavior

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES modules + browser scripts)
- GSAP
- Anime.js
- Three.js
- EmailJS

## Project Structure

```text
├── index.html
├── styles.css
├── css/
│   └── animations.css
├── js/
│   ├── contact.js
│   ├── enhanced-animations.js
│   ├── footer-year.js
│   ├── loading.js
│   ├── main.js
│   ├── micro-animations.js
│   ├── three-scene.js
│   └── visual-effects.js
└── images/
    ├── backgrounds/
    └── work/
```

## Local Preview

Run a simple local server from the repository root:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Content Update Notes

- Main content lives in `index.html`
- Core styling lives in `styles.css`
- Project screenshots are stored in `images/work/`
- EmailJS public key is initialized in `index.html`
- EmailJS service and template IDs are configured in `js/contact.js`

## Author

Muhammad Rafi Brilliansyah Ramadhan

- GitHub: [rafibr](https://github.com/rafibr)
- LinkedIn: [rafi-brilliansyah](https://www.linkedin.com/in/rafi-brilliansyah/)
- Email: [rafi.brilliansyah@gmail.com](mailto:rafi.brilliansyah@gmail.com)
- Website: [rafibr.github.io](https://rafibr.github.io)
