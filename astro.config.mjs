import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://octos-org.github.io',
  base: '/octos-website',
  integrations: [sitemap(), react()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'i18n': new URL('./src/i18n', import.meta.url).pathname,
      },
    },
  },
});
