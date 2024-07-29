## 搜索后子级无法展开

这个是element ui的一个bug但是目前一直没有解决，网上很多人遇到，因此有大神给出解决方法

组件代码：

```vue
<el-tree
    ref="tree" :props="defaultProps" :load="loadNode"
    :filter-node-method="filterNode" lazy accordion
    @node-click="handleNodeClick"
/>
```

实现代码：

```js
filterNode(value, data, node) {
    if (!value) return true
    // 解决搜索后无法点击下级展开问题
    const one = data?.name?.includes(value)
    const two = node?.parent?.data?.name?.includes(value)
    const three = node?.parent?.parent?.data?.name?.includes(value)
    let result_one = false
    let result_two = false
    let result_three = false
    if (node.level === 1) {
        result_one = one
    } else if (node.level === 2) {
        result_two = one || two
    } else if (node.level === 3) {
        result_three = one || two || three
    }
    return result_one || result_two || result_three
},
```

## 清空搜索后子节点没有关闭

描述：比如我在地区树搜索昆明，地区树可以过滤出昆明来，但是我删除搜索字段的时候会展开含有搜索字段的第一个值，比如搜索昆明，删除之后会展开所有含有昆的地市，这是不符合预期的。

实现代码：

```js
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
      if (!val) {
        this.changeTreeNodeStatus(this.$refs.tree.store.root)
      }
    }
   }

    // 改变节点的状态
    changeTreeNodeStatus(node) {
      for (let i = 0; i < node.childNodes.length; i++) {
        // 改变节点的自身expanded状态
        node.childNodes[i].expanded = this.expandAll
        // 遍历子节点
        if (node.childNodes[i].childNodes.length > 0) {
          this.changeTreeNodeStatus(node.childNodes[i])
        }
      }
    },
```

