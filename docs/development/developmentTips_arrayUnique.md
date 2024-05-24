# 对象数组去重

## 判断所有属性是否相等

```js
let arr = [
    { name: '张三', id: { n: 1 },age:1},
    { name: '张三', id: { n: 1 }},
    { name: '张三', id: { n: 2 }}
]

// 将对象序列化为字符串，然后使用 Set 来过滤重复项
let uniqueStringSet = new Set(arr.map(item => JSON.stringify(item)))

// 将字符串转换回对象
let newArr = Array.from(uniqueStringSet).map(item => JSON.parse(item))

console.log(newArr)
输出:
[
    { name: '张三', id: { n: 1 },age:1},
    { name: '张三', id: { n: 1 }},
    { name: '张三', id: { n: 2 }}
]

```

## 根据某个属性进行去重

```js
// 对数组中的元素是对象进行去重
// 后面的覆盖前面的，但位置顺序不变
function distinctObjList(array, primaryKey = 'id') {
  const map = new Map()
  for (let i = 0; i < array.length; ++i) {
    const item = array[i]
    if (item && Object.prototype.hasOwnProperty.call(item, primaryKey)) {
      map.set(item[primaryKey], item)
    }
  }
  return [...map.values()]
}
const arr = [
  {name:'zs',id:1},
  {name:'zs',id:1},
  {name:'zs',id:1},
  {name:'zs',id:2},
  {name:'zs',id:1,age:14},
  ]
console.log(distinctObjList(arr))
输出：
[  
    {name:'zs',id:1,age:14},
    {name:'zs',id:2},
]
```

