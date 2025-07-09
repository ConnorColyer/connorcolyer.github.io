document.addEventListener('DOMContentLoaded', () => {
  // Elements for custom cursor and trails
  const cursor = document.getElementById('cursor');
  const trails = document.querySelectorAll('.cursor-trail');

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    // Position the main cursor element immediately
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    // Animate each trailing dot to the mouse with increasing lag
    trails.forEach((dot, i) => {
      gsap.to(dot, {
        duration: 0.3 + i * 0.1,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out'
      });
    });
  });

  // Initialize tsParticles for the background
  tsParticles.load("tsparticles", {
    particles: {
      number: { value: 40 },
      color: { value: "#888888" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: { enable: true, speed: 0.5, direction: "none" }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" }
      },
      modes: {
        repulse: { distance: 100 }
      }
    }
  });

  // GSAP entrance animations
  gsap.from(".hero-content", { y: -50, opacity: 0, duration: 1 });
  gsap.from(".about", { opacity: 0, duration: 1, delay: 0.5 });
  gsap.from(".projects", { opacity: 0, duration: 1, delay: 1 });
  gsap.from(".contact", { opacity: 0, duration: 1, delay: 1.5 });
});
