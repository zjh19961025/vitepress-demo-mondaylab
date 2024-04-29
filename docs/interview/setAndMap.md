# JavaScript中的new map()和new set()的使用以及区别

## 简介

- new Map(): 在JavaScript中，new Map()用于创建一个新的 Map 对象。Map 对象是一种键值对的集合，其中的键是唯一的，值可以重复。
- new Set():   在JavaScript中， new Set() 是用来创建一个新的 Set 对象的语法。Set 对象是一种集合，其中的值是唯一的，没有重复的值。 new Set() 可以用来创建一个空的 Set 对象，在创建时传入一个数组或类数组对象，Set 会自动去除重复的值。

## 一、new Map()

### 基本特性

1. `new Map()` 是用来创建一个新的 `Map` 对象的构造函数。`Map` 对象保存键值对，并记住键的原始插入顺序。这意味着你可以迭代 `Map` 对象，按键的插入顺序获取键值对。
2. `Map` 对象与普通的对象（使用字符串作为键）不同，因为 `Map` 可以使用任何类型作为键（包括函数、对象或任何原始值），而不仅仅是字符串或符号。

### 相关方法

1. set(key, value) : 向 Map 对象中添加一个键值对。
2.  get(key) : 获取指定键对应的值。
3. has(key) : 判断 Map 对象中是否存在指定的键。
4. delete(key) : 删除指定键及其对应的值。
5. size : 返回 Map 对象中键值对的数量。
6. clear() : 清空 Map 对象中的所有键值对。
7.  keys() : 返回一个包含 Map 对象中所有键的迭代器。
8. values() : 返回一个包含 Map 对象中所有值的迭代器。
9. entries() : 返回一个包含 Map 对象中所有键值对的迭代器。

### 基本使用

```js
// 创建一个新的Map对象  
let myMap = new Map();  
  
// 1、添加键值对  
myMap.set('name', 'Alice');  
myMap.set('age', 25);  
  
// 2、获取值  
console.log(myMap.get('name')); // 输出: "Alice"  
  
// 3、检查键是否存在  
console.log(myMap.has('age')); // 输出: true  
  
// 4、删除键值对  
myMap.delete('name');  
console.log(myMap.has('name')); // 输出: false  
 
// 5、获取Map的大小  
console.log(myMap.size); // 输出: 1  
  
// 6、清空Map  
myMap.clear();  
console.log(myMap.size); // 输出: 0  
  
// 7、遍历键  
for (let key of myMap.keys()) {  
  console.log(key); // 输出: "age"  
}  
  
// 8、遍历值  
for (let value of myMap.values()) {  
  console.log(value); // 输出: 25  
}  
  
// 9、遍历键值对  
for (let [key, value] of myMap.entries()) {  
  console.log(`Key: ${key}, Value: ${value}`); // 输出: Key: age, Value: 25  
}  
```

## 二、new Set()

### 基本特性

1. 唯一性：在 `Set` 中，每个值只出现一次，可以实现简单的数组去重，即使是两个完全相同的对象，它们在 `Set` 中也只会被存储一次。
2. 无序性：`Set` 中的元素没有特定的顺序。

### 相关方法

1. `add(value)`: 向 `Set` 对象中添加一个值。如果值已存在，则不会进行任何操作。
2. `delete(value)`: 从 `Set` 对象中删除一个值。如果值存在，则删除并返回 `true`；否则，返回 `false`。
3. `has(value)`: 返回一个布尔值，表示 `Set` 对象中是否包含指定的值。
4. `clear()`: 清空 `Set` 对象，移除所有元素。

### 基本使用

```js
let setData = new Set();  
  
// 添加元素  
setData .add(1);  
setData .add(2);  
setData .add(3); 
console.log(setData); // setData { 1, 2 ,3 }  
 
// 删除元素  
setData.delete(2);  
console.log(setData); // Set { 1, 3 }  
 
  
// 检查元素是否存在  
console.log(setData.has(1)); // true  
console.log(setData.has(4)); // false  
  
// 遍历元素  
setData.forEach(value => console.log(value));  
// 输出:  
// 1  
// 3
 
// 清空集合  
setData.clear();  
console.log(setData.size);    // 输出: 0，因为集合已被清空
 
 
//在创建 Set 时直接传入一个可迭代对象（如数组），来初始化 Set：
let set = new Set([1, 2, 2, 3, 4, 4]);  
//简单数组去重
console.log(set); // Set { 1, 2, 3, 4 }
```

