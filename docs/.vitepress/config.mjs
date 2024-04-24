import { defineConfig } from 'vitepress'
import { nav } from './relaConf';

// https://vitepress.dev/reference/site-config

export const globals = [
]
export default defineConfig({
  title: "A VitePress Site",
  description: "Default Theme",
  themeConfig: {
    logo: './avatar.jpg',// 表示docs/public/avartar.png
    nav:nav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  enhanceApp: ({ app }) => {
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})

