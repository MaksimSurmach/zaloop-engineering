export function setupNavigation(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const navigation = document.querySelector<HTMLElement>('[data-navigation]');

  if (!toggle || !navigation) return;

  const setOpen = (open: boolean, returnFocus = false): void => {
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);

    if (open) {
      navigation.querySelector<HTMLAnchorElement>('a')?.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  window.matchMedia('(min-width: 1100px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

