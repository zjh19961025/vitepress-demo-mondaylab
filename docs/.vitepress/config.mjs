import { defineConfig } from 'vitepress'
import { nav } from './relaConf';

// https://vitepress.dev/reference/site-config

export const globals = [
]
export default defineConfig({
  base: '/vitepress-demo-mondaylab/',
  title: 'mondaylab-demo-blog',
  description: "Default Theme",
  themeConfig: {
    logo: './avatar.jpg',// 表示docs/public/avartar.png
    nav:nav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local' // 开启本地搜索
    },
    // i18nRouting: true //开启中英文
  },
  enhanceApp: ({ app }) => {
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
