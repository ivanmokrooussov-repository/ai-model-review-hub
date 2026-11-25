import { formatNumber, formatUsd } from '../lib/format';

function readNumber(input: HTMLInputElement | null): number {
  if (!input) return 0;
  const value = Number(input.value);
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

function syncRange(numberInput: HTMLInputElement, rangeInput: HTMLInputElement) {
  const max = Number(rangeInput.max);
  const value = readNumber(numberInput);
  rangeInput.value = String(Math.min(value, Number.isFinite(max) ? max : value));
}

export function initPricingCalculator(root: HTMLElement) {
  const requests = root.querySelector<HTMLInputElement>('[data-requests]');
  const requestsRange = root.querySelector<HTMLInputElement>('[data-requests-range]');
  const inputTokens = root.querySelector<HTMLInputElement>('[data-input-tokens]');
  const inputRange = root.querySelector<HTMLInputElement>('[data-input-range]');
  const outputTokens = root.querySelector<HTMLInputElement>('[data-output-tokens]');
  const outputRange = root.querySelector<HTMLInputElement>('[data-output-range]');
  const summary = root.querySelector<HTMLElement>('[data-workload-summary]');
  const cheapest = root.querySelector<HTMLElement>('[data-cheapest]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const body = root.querySelector<HTMLElement>('[data-price-body]');
  const reset = root.querySelector<HTMLButtonElement>('[data-reset]');

  if (!requests || !requestsRange || !inputTokens || !inputRange || !outputTokens || !outputRange || !body) return;

  const defaults = {
    requests: root.dataset.defaultRequests ?? '1000',
    inputTokens: root.dataset.defaultInput ?? '1500',
    outputTokens: root.dataset.defaultOutput ?? '500',
  };

  function render() {
    const workload = {
      requests: readNumber(requests),
      inputTokens: readNumber(inputTokens),
      outputTokens: readNumber(outputTokens),
    };
    const provider =
      root.querySelector<HTMLButtonElement>('[data-filter="provider"][aria-pressed="true"]')?.dataset.value ?? 'all';
    const tier =
      root.querySelector<HTMLButtonElement>('[data-filter="tier"][aria-pressed="true"]')?.dataset.value ?? 'all';

    const rows = [...body.querySelectorAll<HTMLTableRowElement>('[data-row]')];
    for (const row of rows) {
      const inputRate = Number(row.dataset.input);
      const outputRate = Number(row.dataset.output);
      const total =
        ((workload.requests * workload.inputTokens) / 1_000_000) * inputRate +
        ((workload.requests * workload.outputTokens) / 1_000_000) * outputRate;
      row.dataset.total = String(total);
      const cell = row.querySelector<HTMLElement>('[data-monthly]');
      if (cell) cell.textContent = formatUsd(total);
    }

    rows.sort(
      (a, b) =>
        Number(a.dataset.total) - Number(b.dataset.total) ||
        (a.dataset.name ?? '').localeCompare(b.dataset.name ?? ''),
    );
    for (const row of rows) body.append(row);

    const visible = rows.filter((row) => {
      const show =
        (provider === 'all' || row.dataset.provider === provider) && (tier === 'all' || row.dataset.tier === tier);
      row.hidden = !show;
      return show;
    });

    if (summary) {
      summary.textContent = `${formatNumber(workload.requests)} requests, ${formatNumber(workload.inputTokens)} input tokens, and ${formatNumber(workload.outputTokens)} output tokens each. Cached input is not included.`;
    }
    if (cheapest) {
      const winner = visible[0];
      cheapest.textContent = winner
        ? `Lowest estimate in this view: ${winner.dataset.name} at ${formatUsd(Number(winner.dataset.total))} per month.`
        : 'No models match these filters.';
    }
    if (empty) empty.hidden = visible.length > 0;
  }

  function bindPair(numberInput: HTMLInputElement, rangeInput: HTMLInputElement) {
    numberInput.addEventListener('input', () => {
      syncRange(numberInput, rangeInput);
      render();
    });
    rangeInput.addEventListener('input', () => {
      numberInput.value = rangeInput.value;
      render();
    });
    numberInput.addEventListener('wheel', () => numberInput.blur(), { passive: true });
  }

  bindPair(requests, requestsRange);
  bindPair(inputTokens, inputRange);
  bindPair(outputTokens, outputRange);

  root.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.filter;
      root.querySelectorAll<HTMLButtonElement>(`[data-filter="${group}"]`).forEach((item) => {
        item.setAttribute('aria-pressed', 'false');
      });
      button.setAttribute('aria-pressed', 'true');
      render();
    });
  });

  reset?.addEventListener('click', () => {
    requests.value = defaults.requests;
    inputTokens.value = defaults.inputTokens;
    outputTokens.value = defaults.outputTokens;
    syncRange(requests, requestsRange);
    syncRange(inputTokens, inputRange);
    syncRange(outputTokens, outputRange);
    render();
  });

  render();
}
