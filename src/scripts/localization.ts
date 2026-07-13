export function setupLocalization(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-language]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = new URL(link.href, window.location.origin);
      target.hash = window.location.hash;
      event.preventDefault();
      window.location.assign(`${target.pathname}${target.hash}`);
    });
  });
}
