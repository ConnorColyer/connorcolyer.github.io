// Custom Cursor
document.addEventListener('mousemove', e => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-content', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('#about h2, #about p', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '#projects',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('#contact h2, #contact p, #contact .cta-button', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
});
