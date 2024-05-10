# 快速注册一堆全局组件

1. 创建一个 globalComponent.js（文件名任意）文件，在文件中将你需要注册的组件全部导入进来，并使用 install 方法创建一个插件。

   ```js
   import svgIcon from './SvgIcon/svgIcon.vue'
   import menu from './menu'
   
   const components = {
       svgIcon,
       menu
   }
   
   export default {
       // 暴露方法必须叫install，这样才能接收到app的实例，才能拿到component方法
       install(app) {
           Object.keys(components).forEach((key) => {
               app.component(key, components[key])
           })
       },
   }
   ```

   

2. 在 main.js 中导入 js 文件

   ```js
   import globalComponent from "@/components";
   app.use(globalComponent);
   ```

