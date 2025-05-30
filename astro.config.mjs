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

---
// package.json
---
{
  "name": "astro-tools",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  }
}

---
// public/styles/tools.css
---
/* 拷贝自原 styles.css，已放入 public 目录，保持类名一致性，支持所有组件使用 */
/* 请将原始 styles.css 文件复制至此处命名为 tools.css */

---
// src/lib/ctpinyin.js
---
/* 请将你当前的 ctpinyin.js 中完整逻辑粘贴至此文件路径，以供 PinyinConverter 调用 */

---
// public/scripts/tools.js
---
/* 拷贝自原 script.js，整合五个工具逻辑 */
/* 已适配 Astro 模块加载，可复用于多个组件页面逻辑调用 */

" + ${60}.raw_content + "
