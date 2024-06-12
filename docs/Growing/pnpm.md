## 怎么在pnpm中修改node_modules并生效

我在使用一个开源库的时候发现了一个bug，我目前着急解决这个问题，大家都知道官方解决一个问题，需要：cr-合并-发版，如果该开源库A是我使用的另一个开源库B引用的，那个还需去另外一个开源库提交BUG督促他们更新和发版，这样的流程是非常麻烦的。所以产生了该文档。

## 解决思路

直接修改`node_modules`

## 怎么生效

### 如果使用的是pnpm包管理工具：

文档：[pnpm.io/cli/patch](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Fcli%2Fpatch) 。 视频演示：[www.youtube.com/watch?v=0Gj…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D0GjLqRGRbcY) 。

##### 步骤

- 使用`pnpm patch <pkg> `其中是自己需要修改的包，需要明确指定版本号。
- 该命令会生成一个本地的地址，将该地址导入到你的编辑器。修改完成后执行`pnpm patch-commit <地址>`
- **最后一定要使用pnpm 执行命令，否则不生效**

会生成一个临时的项目地址，在缓存文件中，打开它并修改，如图：
![vue10.png](..%2Fpublic%2Fimg%2Fvue10.png)

打开项目后修改文件，使修改的文件生效：
![vue11.png](..%2Fpublic%2Fimg%2Fvue11.png)
