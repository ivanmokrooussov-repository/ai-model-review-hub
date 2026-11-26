/**
 * Site settings.
 * The public site address lives in astro.config.ts. It is used for the sitemap,
 * canonical links, and Open Graph tags.
 */

export const siteName = 'AI Model & Tool Review Hub';
export const siteShortName = 'Review Hub';

export const tagline =
  'Practical AI model comparisons, transparent API cost math, and tested everyday workflows.';

export const siteDescription =
  'Practical AI model comparisons, free-tier limits, and transparent API cost math for freelancers and small teams.';

/** Gumroad profile. Used wherever the site used to offer an email address. */
export const gumroadProfileUrl = 'https://mokrooussov.gumroad.com';

/** Starter Pack checkout on Gumroad. */
export const gumroadUrl = 'https://mokrooussov.gumroad.com/l/onkodbc';

/** Shown on the Starter Pack page and the home page. */
export const packPrice = '$19 USD';

export const packName = 'Starter Pack';

/**
 * Domains that are commercial or affiliate links.
 * Links to these sites are marked rel="sponsored" automatically.
 */
export const affiliateHosts: string[] = ['gumroad.com'];

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/guides/', label: 'Guides' },
  { href: '/api-pricing/', label: 'API Costs' },
  { href: '/pack/', label: 'Starter Pack' },
  { href: '/about/', label: 'About' },
] as const;

export const footerExplore = [
  { href: '/guides/', label: 'Guides & Comparisons' },
  { href: '/api-pricing/', label: 'API Cost Table' },
  { href: '/pack/', label: 'Starter Pack' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const footerTrust = [
  { href: '/about/', label: 'About' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
  { href: '/privacy/', label: 'Privacy' },
] as const;
