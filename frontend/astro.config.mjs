import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://ajans-d8e.pages.dev',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
