/**
 * Site settings.
 *
 * Change the email, the Gumroad link, and the Starter Pack price here.
 * You do not need to edit the page layout to update those three.
 */

export const siteName = 'AI Model & Tool Review Hub';
export const siteShortName = 'Review Hub';

export const tagline =
  'Practical AI model comparisons, transparent API cost math, and tested everyday workflows.';

export const siteDescription =
  'Practical AI model comparisons, free-tier limits, and transparent API cost math for freelancers and small teams.';

/** The address shown on the contact page. Replace hello@example.com. */
export const contactEmail = 'hello@example.com';

/**
 * Paste your Gumroad product link between the quotes,
 * replacing [GUMROAD_URL]. Include the https:// part.
 */
export const gumroadUrl = '[GUMROAD_URL]';

/** Shown on the Starter Pack page and the home page. */
export const packPrice = '$19';

export const packName = 'Starter Pack';

/**
 * Domains that are affiliate links (for example "partner.example").
 * Links to these sites are marked rel="sponsored" automatically.
 * Leave the list empty until you add a partner link.
 */
export const affiliateHosts: string[] = [];

export const emailIsPlaceholder = contactEmail.endsWith('@example.com');

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
