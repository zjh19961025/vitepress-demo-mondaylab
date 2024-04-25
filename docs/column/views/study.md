##### 用来放MD的一些基本组件样式
## Link Button

:::warning
`type="text"` has been **deprecated**, and **will be** removed in ^(3.0.0), consider switching to new API.

New API `link` has been added in ^(2.2.1), you can use `type` API to set the theme of your link button

:::


## Text Button
:::tip

Text button has been upgraded with a new design since <el-tag round effect="plain" size="small">2.2.0</el-tag> , if you want to use the
previous version like button, you might want to check [Link](./link.md#basic) out.

The API is also updated, because the `type` attribute also represents the button's style. So we have to make a new API
`text: boolean` for text button.

:::

## Simple Usage

:::warning

Because HTML standard has already defined a tag named [menu](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu),
so you need to use an alias in order to render the icon, if you register `Menu` directly it will not work.

:::
