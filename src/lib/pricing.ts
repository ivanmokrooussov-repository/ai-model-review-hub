import data from '../data/api-pricing.json';

export type ModelRate = {
  id: string;
  provider: string;
  name: string;
  tier: 'budget' | 'flagship';
  inputPerMillion: number;
  cachedInputPerMillion: number | null;
  outputPerMillion: number;
  notes: string;
};

export type Workload = {
  requests: number;
  inputTokens: number;
  outputTokens: number;
};

export const pricingChecked = data.checked;
export const pricingNote = data.note;
export const models = data.models as ModelRate[];

export const exampleWorkload: Workload = {
  requests: 1000,
  inputTokens: 1500,
  outputTokens: 500,
};

const providerOrder = ['OpenAI', 'Anthropic', 'Google', 'xAI', 'DeepSeek'];

export const providers = providerOrder.filter((provider) => models.some((model) => model.provider === provider));

export const tierLabel: Record<ModelRate['tier'], string> = {
  budget: 'Budget & mid-tier',
  flagship: 'Flagship',
};

export function estimate(model: ModelRate, workload: Workload) {
  const inputCost = ((workload.requests * workload.inputTokens) / 1_000_000) * model.inputPerMillion;
  const outputCost = ((workload.requests * workload.outputTokens) / 1_000_000) * model.outputPerMillion;
  return {
    inputCost,
    outputCost,
    total: inputCost + outputCost,
  };
}

export function modelsByCost(workload: Workload): Array<ModelRate & { total: number }> {
  return models
    .map((model) => ({ ...model, total: estimate(model, workload).total }))
    .sort((a, b) => a.total - b.total || a.name.localeCompare(b.name));
}
