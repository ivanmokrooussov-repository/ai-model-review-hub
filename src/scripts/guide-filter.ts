export function initGuideFilter(root: HTMLElement) {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-category]')];
  const cards = [...root.querySelectorAll<HTMLElement>('[data-guide-category]')];
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  if (buttons.length === 0) return;

  function apply(category: string, updateUrl: boolean) {
    let shown = 0;
    for (const card of cards) {
      const match = category === 'all' || card.dataset.guideCategory === category;
      card.hidden = !match;
      if (match) shown += 1;
    }
    if (empty) empty.hidden = shown !== 0;
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.category === category));
    }
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (category === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', category);
      window.history.replaceState(null, '', url);
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => apply(button.dataset.category ?? 'all', true));
  }

  const initial = new URL(window.location.href).searchParams.get('category');
  if (initial && buttons.some((button) => button.dataset.category === initial)) {
    apply(initial, false);
  }
}
