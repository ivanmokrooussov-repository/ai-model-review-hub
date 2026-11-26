import { getCollection, type CollectionEntry } from 'astro:content';

export type Guide = CollectionEntry<'guides'>;

const preferredOrder = [
  'best-ai-for-writing-emails-2026',
  'cheapest-llm-apis-compared-2026',
  'best-free-ai-chat-options-2026',
  'how-to-pick-an-ai-model-for-everyday-work',
];

const categoryOrder = ['Email & Writing', 'API Pricing', 'Free Tiers', 'Workflows'];

export async function getGuides(): Promise<Guide[]> {
  const guides = await getCollection('guides', ({ data }) => data.draft !== true);
  return guides.sort((a, b) => {
    const byDate = b.data.date.getTime() - a.data.date.getTime();
    if (byDate !== 0) return byDate;
    const ai = preferredOrder.indexOf(a.data.slug);
    const bi = preferredOrder.indexOf(b.data.slug);
    const ao = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bo = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    if (ao !== bo) return ao - bo;
    return a.data.title.localeCompare(b.data.title);
  });
}

export function guideCategories(guides: Guide[]): string[] {
  const present = new Set(guides.map((guide) => guide.data.category));
  const known = categoryOrder.filter((category) => present.has(category));
  const extra = [...present]
    .filter((category) => !categoryOrder.includes(category))
    .sort((a, b) => a.localeCompare(b));
  return [...known, ...extra];
}

export function relatedGuides(guides: Guide[], currentSlug: string, limit = 3): Guide[] {
  const current = guides.find((guide) => guide.data.slug === currentSlug);
  const others = guides.filter((guide) => guide.data.slug !== currentSlug);
  if (!current) return others.slice(0, limit);
  const same = others.filter((guide) => guide.data.category === current.data.category);
  const rest = others.filter((guide) => guide.data.category !== current.data.category);
  return [...same, ...rest].slice(0, limit);
}

export function guidePath(slug: string): string {
  return `/guides/${slug}/`;
}
