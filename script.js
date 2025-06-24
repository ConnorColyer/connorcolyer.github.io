document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  document.querySelectorAll('.hero-layer').forEach((layer, i) => {
    const depth = (i + 1) * 10;
    const moveX = x * depth;
    const moveY = y * depth;

    layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
