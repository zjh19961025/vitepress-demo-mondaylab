---
# 提供三种布局，doc、page和home
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page
title: 不会切肉的小辉同学的博客
titleTemplate: Hi，终于等到你
editLink: true
lastUpdated: true

hero:
    name: 小辉同学
    text: Just do it.
    tagline: /斜杠青年/人间清醒/工具控/
    image:
        # 首页右边的图片
        src: /avatar.png
        # 图片的描述
        alt: avatar
    # 按钮相关
    actions:
    - theme: brand
      text: 进入主页
      link: /views/guide
    - theme: alt
      text: 个人成长
      link: /column/Growing/
# 按钮下方的描述
features:
  - icon: 🤹
    title: Web前端
    details: 小厂程序员，国内某互联网厂搬砖。
    link: /views/guide
  - icon: 🎨
    title: 喜欢美学
    details: 热爱一切美学，喜欢用各种设计工具造图。
  - icon: 🧩
    title: 斜杆青年
    link: /views/study
    details: 是个平平无奇但是又很热爱学习的斜杆青年。
---
<!-- 自定义组件 -->
<script setup>
import MyComponent from './.vitepress/components/love.vue';
</script>

[//]: # (<MyComponent/>)






