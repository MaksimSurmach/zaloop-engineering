export function setupEntrance(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add('is-ready'));
    });
  }

  const revealGroups = document.querySelectorAll<HTMLElement>('[data-reveal]');
  revealGroups.forEach((group) => {
    group.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((item, index) => {
      item.style.setProperty('--reveal-order', String(Math.min(index, 7)));
    });
  });

  if (!('IntersectionObserver' in window)) {
    revealGroups.forEach((group) => group.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  revealGroups.forEach((group) => observer.observe(group));

  const rotatingText = document.querySelector<HTMLElement>('[data-rotating-text]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!rotatingText || reduceMotion) return;

  const phrases = document.documentElement.lang === 'be'
    ? [
        'Перастань пісаць код.',
        "Перастань рабіць рэв'ю.",
        'Перастань хадзіць на сустрэчы.',
        'Пачні аркестраваць.',
      ]
    : ['Stop coding.', 'Stop reviewing.', 'Stop attending.', 'Start orchestrating.'];
  let phraseIndex = 0;
  window.setInterval(() => {
    rotatingText.classList.add('is-changing');
    window.setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      rotatingText.textContent = phrases[phraseIndex] ?? phrases[0] ?? 'Stop coding.';
      rotatingText.classList.remove('is-changing');
    }, 220);
  }, 4200);
}
