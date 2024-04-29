### 用来放MD的一些基本组件样式 

##### 自定义容器

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
##### 在语法块中的语法高亮
VitePress 通过 Prism来实现Markdown中语法块的语法高亮，使用了有色文本。 Prism 支持大量的编程语言，你需要做的只是在代码块的开始反引号后附加一个有效的语言别名：
```js
export default {
  name: 'MyComponent',
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
##### 代码块中的行高亮
在Prism站点中可以查询 可用的语言列表 is available on Prism’s site.

- 行区间: 例如 `{5-8}`, `{3-10}`, `{10-17}`
- 多个单行: 例如`{4,7,9}`
- 行区间与多个单行：例如 `{4,7-13,16,23-27,40}`

除了指定单号以外，你也可以指定多个单行、区间或两者皆有：

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

##### 行号

```js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

- 示例

![alt 属性文本](https://vitejs.cn/vitepress/assets/line-numbers-desktop.cc304762.png)

##### 表情符号 🎉

输入

```
:tada: :100:
```

输出

🎉 💯

