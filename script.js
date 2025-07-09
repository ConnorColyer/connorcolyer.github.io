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
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', e => {
    gsap.to([cursor, cursorGlow], {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });
});

document.querySelectorAll('a, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2, background: '#ff4d4d', duration: 0.3 });
        gsap.to(cursorGlow, { scale: 1.2, opacity: 1, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, background: '#00ffcc', duration: 0.3 });
        gsap.to(cursorGlow, { scale: 1, opacity: 0.7, duration: 0.3 });
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-content', {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.5
});

gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.children, {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        scale: 0.9,
        rotationX: 10,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
        }
    });
});

// WebGL Liquid Background
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
            float wave = sin(dist * 10.0 - uTime * 2.0) * 0.1;
            float n = noise(uv + uTime * 0.1) * 0.2;
            vec3 color = vec3(0.0, 0.5 + wave + n, 0.8 + wave + n);
            gl_FragColor = vec4(color, 0.3);
        }
    `,
    side: THREE.DoubleSide
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
camera.position.z = 5;

document.addEventListener('mousemove', e => {
    material.uniforms.uMouse.value.set(e.clientX, e.clientY);
});

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += 0.05;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
});
