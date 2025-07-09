// Smooth Scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', e => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out'
    });
    gsap.to(cursorTrail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
    });
});

document.querySelectorAll('.nav-link, .project-card, .cta-button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorTrail.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorTrail.classList.remove('hover');
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content h1', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.hero-content p', {
    opacity: 0,
    y: 30,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.cta-button', {
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'back.out(1.7)',
    delay: 0.8
});

// Section Animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('h2, p, .project-card'), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Project Card Hover Animations
gsap.utils.toArray('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// WebGL Particle Background
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particleCount = 500;
const particles = new THREE.BufferGeometry();
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 20;
    posArray[i + 1] = (Math.random() - 0.5) * 20;
    posArray[i + 2] = (Math.random() - 0.5) * 20;
}

particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    color: 0x007aff
});

const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);
camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
