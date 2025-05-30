---
// astro.config.mjs
---
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tool.seedloc.com', // 可改为你自己的域名
  integrations: [],
  output: 'static',
  build: {
    format: 'directory'
  }
});

" + ${60}.raw_content + "
