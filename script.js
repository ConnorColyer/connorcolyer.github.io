// Custom Cursor with Beam
const cursor = document.querySelector('.cursor');
const cursorBeam = document.createElement('div');
cursorBeam.classList.add('cursor-beam');
document.body.appendChild(cursorBeam);

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursorBeam.style.left = `${x}px`;
    cursorBeam.style.top = `${y}px`;
});

document.querySelectorAll('a, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorBeam.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorBeam.classList.remove('hover');
    });
});

// Smooth Scrolling with Lenis
const lenis = new Lenis({
    duration: 1.5,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    autoRaf: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
gsap.to('.hero-bg', {
    y: '30%',
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
});
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.children, {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 1.2,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
        },
    });
});

// Canvas Particles with Beam Interaction
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const beamRadius = 100;

        if (distance < beamRadius) {
            const force = (beamRadius - distance) / beamRadius * 0.3;
            this.speedX += (dx / distance) * -force; // Repulsion
            this.speedY += (dy / distance) * -force;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(59, 47, 47, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) particles.push(new Particle());
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
