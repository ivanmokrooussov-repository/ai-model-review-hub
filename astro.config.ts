import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { affiliateHosts } from './src/config';
import { rehypeExternalLinks, rehypeWrapTables } from './src/lib/rehype';

// Canonical public address. Sitemap, canonical links, and Open Graph tags use this.
const site = 'https://ai-model-review-hub.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: false,
      rehypePlugins: [rehypeWrapTables, [rehypeExternalLinks, affiliateHosts]],
    }),
  },
});
