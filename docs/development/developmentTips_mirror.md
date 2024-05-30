# 包管理工具配置镜像

## 一、npm

1. 设置淘宝镜像

   ```
   npm config set registry https://registry.npmmirror.com/
   ```

2. 查看源

   ```
   npm config get registry
   ```

3. 切回官方镜像

   ```
   npm config set registry https://registry.npmjs.org/
   ```

4. npm临时使用

   ```
   npm --registry https://registry.npmmirror.com install XXX（模块名）
   ```

## 二、yarn

1. 设置淘宝镜像

   ```
   yarn config set registry https://registry.npmmirror.com
   ```

2. 查看源

   ```
   yarn config set registry https://registry.yarnpkg.com
   ```

3. 切换官方镜像

   ```
   yarn config set registry https://registry.yarnpkg.com
   ```

## 三、pnpm

1. 设置淘宝镜像

   ```
   pnpm config set registry https://registry.npmmirror.com
   ```

2. 查看源

   ```
   pnpm config get registry
   ```

3. 切换官方镜像

   ```
   pnpm config set registry https://registry.npmjs.org
   ```

## 四、常见问题

[npm](https://so.csdn.net/so/search?q=npm&spm=1001.2101.3001.7020)修改了下载源，仍然是之前的下载源。或者下载失败、下载到某处停止不动。可以进行如下操作。
**（1）清除缓存**
**（2）将对应项目中的node_modules文件夹以及package-lock.json文件删除。
（3）执行安装 + 需要的下载源。**

```
npm cache clean -f
```

