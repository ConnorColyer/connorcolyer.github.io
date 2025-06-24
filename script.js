// Scroll fade-in animation
const reveal = () => {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", reveal);
window.addEventListener("load", () => {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "all 0.6s ease-out";
  });
  reveal();
});