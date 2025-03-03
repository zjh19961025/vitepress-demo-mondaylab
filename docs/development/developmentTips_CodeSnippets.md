## webstorm

1. 打开setting
2. 搜索live找到live Templates
3. 点击右侧加号选择建立代码片段组，这个片段组可以放你们项目的常用代码片段
   ![webstorm.png](..%2Fpublic%2Fimg%2Fwebstorm.png)

如何让你的同事也可以使用你配置的代码片段？

1.找到你路径C:\Users\{name}\AppData\Roaming\JetBrains\WebStorm\templates\里面你配置代码组名称的xml文件，将这个文件发送给你的同事，放至在对应的目录下面即可

## vscode

要是同事使用的是vscode如何也使用你配置的代码片段呢？

我看你骨骼惊奇，天生就是写代码的人才，肯定也想到使用deep seek，让他帮我们把xml生成vscode快捷代码片段。

步骤

1. 将xml文件内容复制出来，让deep seek转为vscode可以使用的代码片段
2. 在项目根目录中创建.vscode文件夹，在文件夹中创建global.code-snippets文件
3. 将deep seek转的内容复制到global.code-snippets文件中保存提交，同事拉了代码就可以使用代码片段了
