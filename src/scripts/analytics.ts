type UmamiClient = {
  track: (event: string, data?: Record<string, string>) => void;
};

declare global {
  interface Window {
    umami?: UmamiClient;
  }
}

const trackedSections = new Map([
  ['framework', 'section_framework_view'],
  ['blockability', 'section_blockability_view'],
  ['maturity', 'section_maturity_view'],
]);

function track(event: string, data?: Record<string, string>): void {
  window.umami?.track(event, data);
}

export function setupAnalytics(): void {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  if (!websiteId) return;

  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = import.meta.env.VITE_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';
  script.dataset.websiteId = websiteId;
  document.head.append(script);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const trigger = event.target.closest<HTMLElement>('[data-analytics-event]');
    const eventName = trigger?.dataset.analyticsEvent;
    if (!trigger || !eventName) return;

    const data: Record<string, string> = {};
    if (trigger.dataset.language) data.language = trigger.dataset.language;
    if (trigger instanceof HTMLAnchorElement) data.destination = trigger.getAttribute('href') || '';
    track(eventName, data);
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const eventName = trackedSections.get(entry.target.id);
        if (eventName) track(eventName);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 },
  );

  trackedSections.forEach((_eventName, sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) observer.observe(section);
  });
}
