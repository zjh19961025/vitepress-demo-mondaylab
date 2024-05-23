## 对象数组去重

```js
let arr = [
    { name: '张三', id: { n: 1 }},
    { name: '张三', id: { n: 1 }},
    { name: '张三', id: { n: 2 }}
]

// 将对象序列化为字符串，然后使用 Set 来过滤重复项
let uniqueStringSet = new Set(arr.map(item => JSON.stringify(item)))

// 将字符串转换回对象
let newArr = Array.from(uniqueStringSet).map(item => JSON.parse(item))

console.log(newArr)

```

