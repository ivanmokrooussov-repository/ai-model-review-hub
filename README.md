# AI Model & Tool Review Hub

This is a simple website of practical AI guides. The articles are Markdown files. There is no database and no login.

You can put it on the internet for free with [Cloudflare Pages](https://pages.cloudflare.com/). Cloudflare gives you an address that ends in `.pages.dev`.

## Publish with Cloudflare Pages

1. Log in to the Cloudflare dashboard.
2. Create a **Pages** project and connect it to this GitHub repository. (In many accounts this lives under **Workers & Pages**.)
3. When Cloudflare asks for the build settings, use:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `22`

   If you do not see a Node version field, add an environment variable named `NODE_VERSION` with the value `22`.
4. Choose the `main` branch if it asks which branch to publish.
5. Save and deploy. The first build takes a few minutes. When it finishes, open the `.pages.dev` link Cloudflare shows you.

You do not upload a `dist` folder yourself. Cloudflare creates it by running the build command.

You do not need a credit card for the free Pages plan. The site does not take payments. The Starter Pack button sends people to Gumroad.

### Site address

The public address is already set in `astro.config.ts` to `https://ai-model-review-hub.pages.dev`. The sitemap, canonical links, and link previews use that address.

The sitemap is created for you at `/sitemap-index.xml`. Search engines are allowed to read the site via `/robots.txt`. There are no tracking scripts.

## Price and Gumroad links

Open `src/config.ts` if these need to change later.

- `gumroadUrl` — Starter Pack checkout. It is `https://mokrooussov.gumroad.com/l/onkodbc`.
- `gumroadProfileUrl` — where questions go. This site does not publish an email address.
- `packPrice` — the price shown on the Starter Pack. It is `$19 USD`.

Commit and push. Cloudflare publishes the new version after the build finishes.

To change the wording of About, Methodology, Affiliate Disclosure, Privacy, Contact, or the Starter Pack description, edit the matching file in `content/pages/`.

## Add a new guide

1. Create a new file in the `content/guides/` folder. Use lowercase words and hyphens, for example `best-ai-for-meeting-notes.md`.
2. Copy this block to the top. It must start and end with `---`.

```markdown
---
title: "Best AI for Meeting Notes"
slug: "best-ai-for-meeting-notes"
date: "2026-12-01"
category: "Workflows"
summary: "One or two sentences. This text is used on the home page and in search results."
---
```

3. Write the guide underneath, in normal Markdown. You can copy a table from an existing guide and change the words.
4. Use the same `slug` as the file name, without `.md`. The new page will be at `/guides/best-ai-for-meeting-notes/`.
5. For `category`, use one of these so it matches the filters: `Email & Writing`, `API Pricing`, `Free Tiers`, `Workflows`. A new category is allowed. It shows up as its own filter.
6. Commit and push.

To hide a draft, add `draft: true` inside the top block. Remove that line when the guide should go live.

Every published guide already shows a short disclosure at the top. You do not paste that yourself. The launch articles also contain a placeholder sentence that starts with `[AFFILIATE_DISCLOSURE:`. Replace that sentence when you add partner links.

When you add an affiliate link, add that company's domain to the `affiliateHosts` list in `src/config.ts` (for example `"partner.example"`). Those links are then marked as sponsored.

You can do all of this on the GitHub website: open the file, click the pencil, edit, and commit. Cloudflare rebuilds the site from that commit.

## Update API prices

The cost table reads `src/data/api-pricing.json`. Change a number there to update the calculator. The long pricing article is a separate file in `content/guides/`. If a price changes, update both so they match.

## Optional: preview on your computer

If Node.js 22 is installed:

```bash
npm install
npm run dev
```

Open the local address it prints, usually `http://localhost:4321`. Run `npm run build` to confirm the site builds. The finished files go in `dist/`, which you do not commit.

The footer says the site has no tracking scripts. If you add analytics later, change that sentence in `src/components/Footer.astro` and update `content/pages/privacy.md` in the same commit.
