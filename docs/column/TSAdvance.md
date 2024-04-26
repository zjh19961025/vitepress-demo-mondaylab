# 快速开始

## 引入

```ts{3-5,10-12}
// main.ts
import { createApp } from 'vue'
import '@hua5/hua5-web-ui/style'
import hua5WebUI from "@hua5/hua5-web-ui"
import { hlibDelegate } from "@/delegate"
import App from './App.vue'

const app = createApp(App)

app.use(hua5WebUI, {
  delegate: hlibDelegate,
})
app.mount('#app')

```

## Volar 支持
在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@hua5/hua5-web-ui/global"]
  }
}
```
