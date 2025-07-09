// Smooth Scrolling with Lenis
const lenis = new Lenis({
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -11 * t)),
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
        gsap.to(cursor, { scale: 2, background: '#ff3333', duration: 0.3 });
        gsap.to(cursorTrail, { scale: 1.5, opacity: 0.8, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, background: '#00ffdd', duration: 0.3 });
        gsap.to(cursorTrail, { scale: 1, opacity: 0.5, duration: 0.3 });
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content', {
    opacity: 0,
    y: 150,
    scale: 0.8,
    rotation: 10,
    duration: 2,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.3
});

gsap.from('.cta-button', {
    opacity: 0,
    y: 80,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.8
});

// Section Animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.children, {
        opacity: 0,
        y: 100,
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
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 120,
        scale: 0.85,
        rotationX: 15,
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
            rotationY: 8,
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

// WebGL Liquid Background
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.PlaneGeometry(15, 15, 64, 64);
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
            vUv = uv;
            vec3 pos = position;
            float dist = length(vec2(pos.x, pos.y) - uMouse);
            pos.z += sin(dist * 15.0 - uTime * 4.0) * 0.3;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        float noise(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            vec2 mouse = uMouse / uResolution * 2.0 - 1.0;
            float dist = length(uv - mouse);
            float wave = sin(dist * 20.0 - uTime * 5.0) * 0.25;
            float n = noise(uv + uTime * 0.4) * 0.3;
            vec3 color = vec3(0.2 + wave, 0.7 + wave + n, 1.0 + wave + n);
            gl_FragColor = vec4(color, 0.5);
        }
    `,
    side: THREE.DoubleSide
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
camera.position.z = 6;

document.addEventListener('mousemove', e => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    material.uniforms.uMouse.value.set(mouseX * 8, mouseY * 8);
});

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += 0.05;
    plane.rotation.z += 0.002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
});
