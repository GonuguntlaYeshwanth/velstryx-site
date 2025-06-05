// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate the hero section on load
gsap.from(".hero .brand", {
  opacity: 0,
  y: -50,
  duration: 1.5,
});

gsap.from(".hero .tagline", {
  opacity: 0,
  y: 30,
  duration: 1.5,
  delay: 0.5,
});

// Animate each section on scroll using ScrollTrigger
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
});