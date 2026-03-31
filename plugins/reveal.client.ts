export default defineNuxtPlugin(() => {
  if (!import.meta.client) return;

  const setupReveal = () => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const sweepTargets = document.querySelectorAll<HTMLElement>(
      "main .section h2, main .section h3, main .section h4, main .section p, main .section .link-arrow, main .section .kicker, main .section .metric"
    );

    sweepTargets.forEach((el) => {
      if (!el.classList.contains("no-sweep") && !el.closest(".site-footer, .cp-topbar, .problems .panel, .help, .process, .story, .blog, .cta")) {
        el.classList.add("sweep-reveal");
      }
    });

    const sweepItems = document.querySelectorAll<HTMLElement>(".sweep-reveal");

    if (items.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -30px" }
      );

      items.forEach((item) => observer.observe(item));
    }

    if (sweepItems.length) {
      const sweepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("sweep-visible");
            } else {
              entry.target.classList.remove("sweep-visible");
            }
          });
        },
        { threshold: 0, rootMargin: "-36% 0px -36% 0px" }
      );

      sweepItems.forEach((item) => sweepObserver.observe(item));
    }
  };

  requestAnimationFrame(setupReveal);
});
