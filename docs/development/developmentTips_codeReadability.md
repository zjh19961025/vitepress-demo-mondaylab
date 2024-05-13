## 一、可选链接运算符【？.】

**左面值不是null 和 undefined，就执行右面的值（拼接上左面）**

不使用 可选链接运算符

```js
if (data && data.children && data.children[0] && data.children[0].title) {
    // I have a title!
}
```

使用后

```js
let title = data?.children?.[0]?.title;
```

**对于静态属性**用法是：

```js
object?.property
```

**对于动态属性**将其更改为：

```js
object?.[expression] 
```

**对于方法**的调用你可以这样写：

```js
object.runsOnlyIfMethodExists?.()
```

举例：

```js
let parent = {
    name: "parent",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      console.log(this.name)
    }
  };
  
  parent.getName?.()   // parent
  parent.getTitle?.()  //不会执行
```

## 二、空值合并操作符【??】

::: tip
空值合并操作符（??）是一个逻辑操作符，
当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
:::

```JS
console.log(null ?? 666)   
console.log(undefined ?? 666)
// 以上输出结果都为666
```

- **?? 与 || 的区别**

```
相同点：
?? 和 || 的语法相同。
不同点:
判断的方法不同：
使用 ?? 时，只有One为 null 或者 undefined 时才会返回 two;
使用 || 时，One会先转化为布尔值判断，为true时返回One , false 返回Two，
若左边能转成true，返回左边式子的值，反之返回右边式子的值；
简单来说就是优先返回true的值
 // ??
  undefined ?? 2    // 2
  null ?? 2        // 2
  0 ?? 2            // 0
  "" ?? 2            // ""
  true ?? 2        // true
  false ?? 2        // false
 // ||
  undefined || 2    // 2
  null || 2        // 2
  0 || 2            // 2
  "" || 2            // 2
  true || 2        // true
  false || 2        // 2
```

顺便记录下转布尔值的两种方法 

1. 使用 双重逻辑非 !!，语法: !!要转换的值 Boolean( "100001356145") //true
2. 使用[Boolean](https://so.csdn.net/so/search?q=Boolean&spm=1001.2101.3001.7020)()函数，可以强制把值转换为布尔值，语法 :Boolean(字符串) !! Objec //true

## 三、提升代码可读性，减少 if-else 几个小技巧 

使用 if else

```js
let c
if(a){
    c = a
} else {
    c = b
}
```

使用 || 短路运算符 （会先转换为布尔值，若左边能转成true，返回左边式子的值，反之返回右边式子的值）

```js
let c = a || b
```

例：有A、B、C、D四种种类型，在A、B的时候输出1，C输出2、D输出3，默认输出0。

```js
let type = 'A'
 
//if else if
if (type === 'A' || type === 'B') {
    console.log(1);
} else if (type === 'C') {
    console.log(2);
} else if(type === 'D') {
    console.log(3);
} else {
    console.log(0)
}
 
//switch case
switch (type) {
    case 'A':
    case 'B':
        console.log(1)
        break
    case 'C':
        console.log(2)
        break
    case 'D':
        console.log(3);
        break;
    default:
        console.log(0)
}
```

对象配置/策略模式【重要 好用】

接下来我们用对象配置的方法实现一下上述的例子

```js
let type = 'A'
 
let tactics = {
    'A': 1,
    'B': 1,
    'C': 2,
    'D': 3,
    default: 0
}
console.log(tactics[type]) // 1
```

**接下来用几个例子让大家更加熟悉一点。**

#### **例一**：根据不同的用户使用不同的折扣，如：普通用户不打折，普通会员用户9折，年费会员8.5折，超级会员8折

先使用 `if else `实现😢

```js
// 获取折扣 --- 使用if else
const getDiscount = (userKey) => {
    if (userKey === '普通会员') {
        return 0.9
    } else if (userKey === '年费会员') {
        return 0.85
    } else if (userKey === '超级会员') {
        return 0.8
    } else {
        return 1
    }
}
console.log(getDiscount('普通会员')) // 0.9
```

在 使用对象配置/策略模式实现🙂

```js
// 获取折扣 -- 使用对象配置/策略模式
const getDiscount = (userKey) => {
    // 我们可以根据用户类型来生成我们的折扣对象
    let discounts = {
        '普通会员': 0.9,
        '年费会员': 0.85,
        '超级会员': 0.8,
        'default': 1
    }
 // 如果左边值转换布尔值后为true就返回左边，否则反之 
    return discounts[userKey] || discounts['default']
}
console.log(getDiscount('普通会员')) // 0.9
```

从上面的案列中可以明显看得出来，使用对象配置比使用if else可读性更高，后续如果需要添加用户折扣也只需要修改折扣对象就行👍

————————————————————————————————————

对象配置不一定非要使用对象去管理我们键值对，还可以使用 **`Map`去管理**🦋，如：

```js
// 获取折扣 -- 使用对象配置/策略模式
const getDiscount = (userKey) => {
    // 我们可以根据用户类型来生成我们的折扣对象
    let discounts = new Map([
        ['普通会员', 0.9],
        ['年费会员', 0.85],
        ['超级会员', 0.8],
        ['default', 1]
    ])
    return discounts.get(userKey) || discounts.get('default')
}
console.log(getDiscount('普通会员')) // 0.9
```

#### **例二**：绩效为A的人年终奖有4倍工资，绩效为B的有3倍，绩效为C的只有2倍。

```js
const calculateBonus = (performanceLevel, salary) => { 
    if (performanceLevel === 'A'){
        return salary * 4
    }
    if (performanceLevel === 'B'){
        return salary * 3
    }
    if (performanceLevel === 'C'){
        return salary * 2
    }
}
calculateBonus( 'B', 20000 ) // 输出：60000
```

完成了，但是如果增加了一种新的 绩效等级D，或者把 A等级的倍数改成5，那我们必须阅读所有代码才能去做修改

**所以我们可以用对象配置/策略模式去简化这个函数😺**

```js
let state = new Map([
    ['A', 4],
    ['B', 3],
    ['C', 2]
])
 
const hCalc = (type, money) => { 
    return state.get(type) * money
}
 
 hCalc( 'B', 20000 ) // 输出：60000
```

#### **例三：** 复杂分支优化

```js
function getUserDescribe(name) {
    if (name.length > 3) {
        console.log("名字太长");
    } else if (name.length < 2) {
        console.log("名字太短");
    } else if (name[0] === "陈") {
        console.log("小陈");
    } else if (name[0] === "李" && name !== "李鹏") {
        console.log("小李");
    } else if (name === "李鹏") {
        console.log("管理员");
    } else {
        console.log("此人比较神秘！");
    }
}
```

优化后;

```js
function getUserDescribe(name) {
    const describeForNameMap = [
        [
            (name) => name.length > 3, // 判断条件
            () => console.log("名字太长") // 执行函数
        ],
        [
            (name) => name.length < 2, 
            () => console.log("名字太短")
        ],
        [
            (name) => name[0] === "陈", 
            () => console.log("小陈")
        ],
        [
            (name) => name === "大鹏", 
            () => console.log("管理员")
        ],
        [
            (name) => name[0] === "李" && name !== "李鹏",
            () => console.log("小李"),
        ],
    ];
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

#### **例四：** 抽离分支优化

```js
const describeForNameMap = {
    小刘: () => console.log("刘哥哥"),
    小红: () => console.log("小红妹妹"),
    陈龙: () => console.log("大师"),
    李龙: () => console.log("师傅"),
    大鹏: () => console.log("恶人"),
};
 
function getUserDescribe(name) {
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

优化后：

```js
const describeForNameMap = [
    [
        (name) => name.length > 3, // 判断条件
        () => console.log("名字太长") // 执行函数
    ],
    [
        (name) => name.length < 2, 
        () => console.log("名字太短")
    ],
    [
        (name) => name[0] === "陈", 
        () => console.log("小陈")
    ],
    [
        (name) => name === "大鹏", 
        () => console.log("管理员")
    ],
    [
        (name) => name[0] === "李" && name !== "李鹏",
        () => console.log("小李"),
    ],
];
    
function getUserDescribe(name) {
      // 通过find方法找到子数组中的第一个函数（判断条件）为true的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

::: info

通过模块化的开发也可以将这个`map`对象写进一个单独的`js`文件，之后在需要使用的地方导入即可。 

:::

#### 例五：模块抽离例子

```js
/**
* @method getUserDescribe
* @param name 用户名
* @param uUser 用户账号
* @description 根据用户名和用户账号获取用户头像
* @returns {string} 用户头像
* @author zk
* @createDate 2023/03/02 15:06:40
* @lastFixDate 2023/03/02 15:06:40
*/
export function getUserDescribe(name: string, uUser: string, userImg: {value:string})
{
    const describeForNameMap = [
        [
            () => name == '监管' && uUser.indexOf('yanghang') === -1, // 判断条件
            () => (userImg.value = '/user5.png'), // 执行函数
        ],
        [() => uUser.indexOf('jianguan') > -1, () => (userImg.value = '/user5.jpg')],
        [() => uUser.indexOf('dianjunqu') > -1, () => (userImg.value = '/user4.jpg')],
        [() => uUser.indexOf('yinhang') > -1, () => (userImg.value = '/user3.png')],
        [() => uUser.indexOf('yanghang') > -1, () => (userImg.value = '/user6.png')],
    ];
    // 通过find方法找到子数组中的第一个函数（判断条件）为true的子数组
    let getDescribe = describeForNameMap.find((item) => item[0]());
    console.log('！这里输出 🚀 ==>：', getDescribe);
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : (userImg.value = '/user1.png');
}
// 使用 
 1：import { getUserDescribe } from '/@/utils/userImg';
 2：getUserDescribe(name, uUser, userImg);
```

