import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { affiliateHosts } from './src/config';
import { rehypeExternalLinks, rehypeWrapTables } from './src/lib/rehype';

// Public address of the site. After Cloudflare gives you a name.pages.dev
// link, replace the address below so the sitemap and link previews match it.
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
