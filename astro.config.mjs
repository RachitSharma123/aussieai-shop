import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aussieai.shop',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
