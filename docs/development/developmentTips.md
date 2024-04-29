# Vue指令

## v-longpress长按触发方法

新建一个[vue2](https://so.csdn.net/so/search?q=vue2&spm=1001.2101.3001.7020)项目，在components里面新建一个longpress.vue文件
设置按钮 指令`v-longpress:3000="longpress"` ，3000是毫秒参数

```html
<template>
  <div class="box">
    <!-- 单位毫秒:3000  -->
    <button v-longpress:3000="longpress">长按</button>
  </div>
</template>

<script>
export default {
  methods: {
    longpress(e) {
      console.log("长按指令生效--", e);
    },
  },
};
</script>
<style scoped></style>
```

长按js自定义指令：按下时长小于3000毫秒属于点击，大于等于3000毫秒属于长按

```js
// 长按
const longpress = {
  bind: function (el, binding, vNode) {
    let s = binding.arg * 1 || 1000
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    let num = 0
    // 定义变量
    let pressTimer = null
    // 创建计时器（ 2秒后执行函数 ）
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) return;
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          num += 1
          handler()
        }, s)
      }
    }

    // 取消计时器
    let cancel = (e) => {
      if (pressTimer !== null) {
        if (num === 0) {
          // 还未执行定时器
          binding.value(false)
        } else {
          // 执行过定时器
          num = 0
        }
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e) => {
      binding.value(true)
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, {
    value
  }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}
export default longpress
```

## v-debounce 防抖

使用场景：点击查询按钮 或者 点击提交保存按钮 的时候点击次数过多，会多次提交，为了避免这种情况发生，我们可以做个防抖，点击一次后 第二次需要间隔一定的时间才能再次点击。
这时候我们能想到可以用vue 的自定义指令directive来完成这个功能。

```js
<template>
  <div>
      <!-- v-debounce:xx ，xx可以是对象可以是字符串可以是数字   -->
      <button v-debounce:3000="debounceClick">防抖</button>
  </div>
</template>

<script>
export default {
  methods: {
    debounceClick(v) {
      console.log("触发一下，间隔多少毫秒：", v);
    },  
  },
};
</script>
```

代码实现

```js
const debounce = {
  inserted: function (el, binding) {
   	// binding.arg 传进来的参数 可以
    let s = (binding.arg * 1) || 1000
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value(s)
      }, s)
    })
  },
}
export default debounce
```

## v-copy 复制

在vue 的项目里 当我们想直接在标签上加入 v-copy 就可以复制想要复制的内容该怎么做？

使用自定义指令 v-copy 其实就是把我们想要复制的内容赋值给cotpyTexts 这个变量，点击复制按钮的时候就把需要复制的内容复制过来了。

```js
<template>
  <div>
    <button v-copy="copyTexts">复制</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyTexts: "复制的内容",
    };
  },
};
</script>

<style scoped lang="less"></style>
```

实现代码

```

const copy = {
  bind(el, {
    value
  }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.style.width = 0
      textarea.style.height = 0

      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')

      if (result) {
        console.log('复制成功:', textarea.value) // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, {
    value
  }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}

export default copy
```

## v-emoji

背景：开发中遇到的表单输入，往往会有对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等。

我们常规方法是在每一个表单的 `on-change` 事件上做处理。

```js
<template>
  <input type="text" v-model="note" @change="vaidateEmoji" />
</template>
 
<script> export default {
    methods: {
      vaidateEmoji() {
        var reg = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
        this.note = this.note.replace(reg, '')
      },
    },
  } </script>
```

这样代码量比较大而且不好维护，所以我们需要自定义一个指令来解决这问题。

需求：根据正则表达式，设计自定义处理表单输入规则的指令，下面以禁止输入表情和特殊字符为例。

```js
let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}
 
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
 
const emoji = {
  bind: function (el, binding, vnode) {
    // 正则规则可根据需求自定义
    var regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
    let $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      let val = $inp.value
      $inp.value = val.replace(regRule, '')
 
      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  },
}
 
export default emoji
```

使用：将需要校验的输入框加上 v-emoji 即可

```html
<template>
  <input type="text" v-model="note" v-emoji />
</template>
```

## v-LazyLoad

背景：在类电商类项目，往往存在大量的图片，如 banner 广告图，菜单导航图，美团等商家列表头图等。图片众多以及图片体积过大往往会影响页面加载速度，造成不良的用户体验，所以进行图片懒加载优化势在必行。

需求：实现一个图片懒加载指令，只加载浏览器可见区域的图片。

思路：

1. 图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的
2. 拿到所有的图片 Dom ，遍历每个图片判断当前图片是否到了可视区范围内
3. 如果到了就设置图片的 `src` 属性，否则显示默认图片

图片懒加载有两种方式可以实现，一是绑定 srcoll 事件进行监听，二是使用 IntersectionObserver 判断图片是否到了可视区域，但是有浏览器兼容性问题。

下面封装一个懒加载指令兼容两种方法，判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载，否则则使用 srcoll 事件监听 + 节流的方法实现。

```js
const LazyLoad = {
  // install方法
  install(Vue, options) {
    const defaultSrc = options.default
    Vue.directive('lazy', {
      bind(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc)
      },
      inserted(el) {
        if (IntersectionObserver) {
          LazyLoad.observe(el)
        } else {
          LazyLoad.listenerScroll(el)
        }
      },
    })
  },
  // 初始化
  init(el, val, def) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300)
    LazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBtm = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer
    let prevTime
    return function (...args) {
      const currTime = Date.now()
      const context = this
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)
 
      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }
 
      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  },
}
 
export default LazyLoad
```

使用，将组件内 标签的 `src` 换成 `v-LazyLoad`

```html
<img v-LazyLoad="xxx.jpg" />
```

## v-permission

背景：在一些后台管理系统，我们可能需要根据用户角色进行一些操作权限的判断，很多时候我们都是粗暴地给一个元素添加 v-if / v-show 来进行显示隐藏，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以通过全局自定义指令来处理。

需求：自定义一个权限指令，对需要权限判断的 Dom 进行显示隐藏。

思路：

1. 自定义一个权限数组

2. 判断用户的权限是否在这个数组内，如果是则显示，否则则移除 Dom

   ```js
   function checkArray(key) {
     let arr = ['1', '2', '3', '4']
     let index = arr.indexOf(key)
     if (index > -1) {
       return true // 有权限
     } else {
       return false // 无权限
     }
   }
    
   const permission = {
     inserted: function (el, binding) {
       let permission = binding.value // 获取到 v-permission的值
       if (permission) {
         let hasPermission = checkArray(permission)
         if (!hasPermission) {
           // 没有权限 移除Dom元素
           el.parentNode && el.parentNode.removeChild(el)
         }
       }
     },
   }
    
   export default permission
   ```

   使用：给 `v-permission` 赋值判断即可

   ```html
   <div class="btns">
     <!-- 显示 -->
     <button v-permission="'1'">权限按钮1</button>
     <!-- 不显示 -->
     <button v-permission="'10'">权限按钮2</button>
   </div>
   ```

   ## v-select-loadmore

   对element ui下拉组件进行下拉触底加载的指令

   需求描述：在做搜索的时候由于有一个[下拉列表](https://so.csdn.net/so/search?q=下拉列表&spm=1001.2101.3001.7020)接口返回数据特别多所以对列表进行了一个下拉触底加载的事件，但是官方文档是没有对应的api的所以自己使用指令写了一个方法。

   ```html
           <el-select
             v-model="sellerNameSearchVal"
             v-select-loadmore="loadmore"
             remote
             filterable
             placeholder="请输入要搜索的供应商名称"
             class="w100"
             clearable
             :remote-method="selectSearch"
             @visible-change="selectVisibleChange"
             @change="onSellerNameChange"
             @clear="onSellerNameClear"
             @keyup.native.enter="onSellerNameEnter"
           >
             <el-option
               v-for="(item,index) in supplierList"
               :key="index"
               :label="item.label"
               :value="item.value"
             />
             <!-- 分页状态 -->
             <el-option disabled style="height: 25px;" class="flex flex-center">
               <div v-show="selectLoading">
                 <i class="el-icon-loading mr10" />
                 <span>正在加载更多...</span>
               </div>
    
               <div v-show="supplierList.length <= 0 && !selectLoading">无匹配数据</div>
    
               <div v-if="supplierList.length > 0 && supplierLeave <= 0">没有更多了</div>
             </el-option>
           </el-select>
   ```

   实现代码：

   ```js
     directives: {
       'select-loadmore': {
         bind(el, binding) {
           const element = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
           element.addEventListener('scroll', function(e) {
             // this.scrollTop 存在小数，导致加减存在1的误差
             const condition = Math.abs(this.scrollHeight - this.scrollTop - this.clientHeight) <= 1
             if (condition) binding?.value()
           })
         }
       }
     },
   ```

   这个指令的逻辑是监听元素的滚动事件，当滚动高度达到select的高度后调用loadmore这个方法去加载下一页的数据
