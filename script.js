const revealElements = document.querySelectorAll("[data-reveal]");
const counterElements = document.querySelectorAll("[data-count]");

for (const element of revealElements) {
  const delay = element.getAttribute("data-delay");
  if (delay) {
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  },
  { threshold: 0.2 }
);

for (const element of revealElements) {
  revealObserver.observe(element);
}

const animateCount = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1400;
  const startTime = performance.now();

  const tick = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }

      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  },
  { threshold: 0.7 }
);

for (const element of counterElements) {
  counterObserver.observe(element);
}
