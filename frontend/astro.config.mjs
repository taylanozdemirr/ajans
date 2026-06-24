import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://taylanozdemirr.github.io',
  base: '/ajans/',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
