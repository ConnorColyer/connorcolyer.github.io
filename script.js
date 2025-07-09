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
    y: 100,
    scale: 0.7,
    rotation: 15,
    duration: 1.8,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.2
});

gsap.from('.hero-content p', {
    opacity: 0,
    x: -100,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.cta-button', {
    opacity: 0,
    y: 80,
    scale: 0.8,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.8
});

// Section Animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('h2, p, .project-card'), {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Project Card Animations
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotationX: index % 2 === 0 ? 10 : -10,
        duration: 1.5,
        ease: 'elastic.out(1, 0.4)',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%'
        }
    });

    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.1,
            rotationY: index % 2 === 0 ? 5 : -5,
            rotationX: -3,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.4,
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

const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const posArray = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
const mouseEffect = new Float32Array(particleCount);

for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 20;
    posArray[i + 1] = (Math.random() - 0.5) * 20;
    posArray[i + 2] = (Math.random() - 0.5) * 20;
    velocities[i] = (Math.random() - 0.5) * 0.05;
    velocities[i + 1] = (Math.random() - 0.5) * 0.05;
    velocities[i + 2] = (Math.random() - 0.5) * 0.05;
    mouseEffect[i / 3] = 0;
}

particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particles.setAttribute('mouseEffect', new THREE.BufferAttribute(mouseEffect, 1));

const material = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    vertexColors: true
});

const colors = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
    colors[i] = Math.random() * 0.5 + 0.5; // Red channel
    colors[i + 1] = Math.random() * 0.5 + 0.5; // Green channel
    colors[i + 2] = 1; // Blue channel
}
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);
camera.position.z = 10;

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    const positions = particles.attributes.position.array;
    const mouseEffects = particles.attributes.mouseEffect.array;

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        const dist = Math.sqrt(
            Math.pow(positions[i] - mouseX * 10, 2) +
            Math.pow(positions[i + 1] - mouseY * 10, 2)
        );
        mouseEffects[i / 3] = Math.max(0, 0.2 - dist * 0.1);

        if (positions[i] > 10 || positions[i] < -10) velocities[i] *= -1;
        if (positions[i + 1] > 10 || positions[i + 1] < -10) velocities[i + 1] *= -1;
        if (positions[i + 2] > 10 || positions[i + 2] < -10) velocities[i + 2] *= -1;
    }

    particles.attributes.position.needsUpdate = true;
    particles.attributes.mouseEffect.needsUpdate = true;
    particleSystem.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
