
# API 在 script 内写入 setup 的方式

## setup

直接在 script 标签中写入 setup，所有的属性和方法都无需手动 return 出去，都能在模板上直接使用

```js
// 不论是方法还是属性都能直接在模板上使用
<script setup>
    import { reactive } from 'vue'

    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }
</script>
```

## nextTick

等待下一次 DOM 更新刷新，将要在下次 dom 更新时执行的逻辑放入 nextTick 的回调函数里面，区别于 v2 的是可以加将 nextTick 作为 promise 使用阻塞后面的代码执行。

```js
import { nextTick } from "vue";

nextTick(() => {
  // 执行下次dom更新时执行的逻辑
});

// 或者
await nextTick();
// 执行下次dom更新时执行的逻辑
```

## 获取组件的实例 dom

1. 使用必须 ref 函数，并且组件标签身上的 ref 必须和 js 中的 ref 赋值的变量名一致

   ```js
   <HelloWorld ref="hello"></HelloWorld>;
   
   import HelloWorld from "./components/HelloWorld.vue";
   import { ref, onMounted } from "vue";
   
   // 变量必须和上面标签上ref的一致
   let hello = ref(null);
   
   onMounted(() => {
     hello.value; // 组件实例
   });
   ```

2. 区别为 v2 的是 setup 是封闭的，在外部是无法直接获取组件内部的属性和方法的，必须有组件内部抛出，外部才能使用

   子组件必须把方法交出去 defineExpose

   ```js
   import { ref } from "vue";
   let str = ref("字符串");
   function open(params) {
     return "你好";
   }
   // 交出open方法和str属性
   defineExpose({
     open,
     str,
   });
   ```

    - 方式一

      通过组件实例获取

      ```js
      import { ref, onMounted } from "vue";
      let hello = ref(null);
      
      onMounted(() => {
        hello.value.open(); // 通过组件实例就能拿到子组件交出来的open方法
        hello.value.str; // 子组件交出来的属性
      });
      ```

    - 方式二

      通过 getCurrentInstance 的 proxy

      ```js
      import { ref, onMounted, getCurrentInstance } from "vue";
      const { proxy } = getCurrentInstance();
      let hello = ref(null);
      
      onMounted(() => {
        proxy.$refs["hello"].open(); // 也能拿到子组件交出来的open方法
        proxy.$refs["hello"].str; // 子组件交出来的属性
      });
      ```

## 组件的引入

在 setup 的语法糖内组件无需在 components 挂载，即可使用。

```js
<HelloWorld ref="hello"></HelloWorld>;
import HelloWorld from "./components/HelloWorld.vue";
```

## defineProps

父子之间传值，等价于 v2 的 props，defineProps 无需引入直接使用，主要注意的是在 js 中使用传递过来的值，必须使用一个变量接收，再从这个变量中将值读取出来，而在模板上使用则可以直接读取传递的值，无需从变量上读取。

在父组件中给子组件传入参数

```html
<HelloWorld title="标题"></HelloWorld>
```

在子组件中接收

- 普通接收

  ```js
  import { defineProps } from "vue";
  
  let props = defineProps(["title"]);
  
  // 必须从变量上读取，不能直接读取title
  console.log(props.title); // 标题
  ```

- 指定类型

  ```js
  let props = defineProps({
    title: String,
  });
  console.log(props.title);
  
  ```

- 指定类型指定默认值

  ```js
  let props = defineProps({
    title: {
      type: String,
      default: "哈哈",
    },
  });
  
  console.log(props.title);
  ```

## defineEmits

抛出自定义事件，等价于 v2 的$emit，但是在 js 中抛出，抛出之前必须使用 defineEmits 提前定义要抛出的自定义事件。无需引入直接使用。

- 借助 defineEmits 抛出自定义事件

  在子组件中抛出自定义事件，组件名 Hello-world

  ```js
  <div @click="onBtn">我是子组件</div>
  
  import { defineEmits } from 'vue';  // 可以不引入
  
  const emit = defineEmits(['onBtn']) // 指定要抛出的事件
  
  function onBtn(){
      emit('onBtn','传递的值') // 抛出事件名，后面是传递的值
  }
  ```

  在父组件中接收自定义事件

  ```js
  <HelloWorld @on-btn="onBtn"></HelloWorld>
  
  import HelloWorld from './components/HelloWorld.vue'
  
  function onBtn(e){
      console.log(e,'接收值'); // e为子组件抛出的值
  }
  ```

- 在模板中直接抛出，则无需借助 definePeops

  在子组件中 组件名 my-login

  ```js
  抛出自定义onClick事件，并协带携带 哈哈 参数
  <button @click="$emit('onClick','哈哈')">my login</button>
  ```

  在父组件中

  ```js
  <myLogin @onClick="onClick"></myLogin>
  
  import myLogin from '@/views/my-login.vue'
  
  const onClick = (e) => {
  	console.log('我被点击了',e); // 接收子组件抛出的事件以及参数
  }
  ```

## defineExpose

由于 setup 是默认关闭的，所以外部无法只能拿到 setup 内部声明的属性和方法，必须借助 defineExpose 将属性和方法将值抛出去，外部才能拿到，不同于 v2 拿到组件的实例，就能拿到组件内部所有的方法和属性。无需引入直接使用。

1. 在子组件中抛出属性和方法，在父组件中拿到

   在子组件中通过 defineExpose 交出方法和属性

   ```js
   import { ref } from 'vue';
   let str = ref('字符串')
   function open(params) {
       return '你好'
   }
   defineExpose({
       open，// 交出方法
       str	// 交出属性
   })
   
   等同于，上面只不过是简写，因此这里也可以重写抛出去的属性名
   defineExpose({
       open: open,
       s: str // 将 str 重命名为 s,
   })
   ```

   在父组件中通过子组件的实例就可以拿到子组件交出来的方法和属性

   ```js
   <HelloWorld ref="hello"></HelloWorld>;
   
   import { ref, onMounted } from "vue";
   let hello = ref(null);
   
   onMounted(() => {
     hello.value.open(); // 就能拿到子组件交出来的open方法
     hello.value.str; // 子组件交出来的属性
   });
   ```

2. 父组件抛出属性和方法在子组件中拿到就必须同时借助 **$parent** 和 **defineExpose**

   在父组件中抛出属性和方法

   ```js
   defineExpose({
     newSize,
     page,
   });
   ```

   在子组件中接收

   ```js
   // 参数必须叫$parent
   <button @click="sizeBtn($parent)">按钮</button>
   
   const sizeBtn =(e)=>{
       // e就是父组件的实例，e就有父亲身上交出来的属性和方法
       console.log(e);
   }
   ```

## defineOptions

声明这个组件的一些配置。比如声明组件 name 属性、 inheritAttrs（是否支持透传）属性

```js
defineOptions({
  name: "Foo",
  inheritAttrs: false, // 禁止透传
});
```

## defineSlots()

于为 IDE 提供插槽名称和 props 类型检查的类型提示。它还返回 slots 对象，该对象等同于在 setup 上下文中暴露或由 useSlots() 返回的 slots 对象。

```js
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

## useAttrs 和 $attrs

如果父组件给子组件传递的属性和方法没有被 defineProps 声明接收，那么父组件传递过来的就会被保存在 useAttrs（在 js 中使用）和$attrs（只能在模板中使用）上。useAttrs 等价于 setupContext.slots。

在父组件中传递属性和方法

```html
<childTemp @onChild="onChild" msg1="msg1" msg2="msg2" />
```

在子组件中的 js 中

```js
import { useAttrs } from "vue";
const attrs = useAttrs();

console.log(attrs); //  msg1: "msg1", msg2: "msg2"
```

在子组件的模板中

```html
<div @click="onChildClick($parent)">子组件</div>
{{ $attrs }} 编译后的结果 { "msg1": "msg1", "msg2": "msg2" }
```

$attrs 小技巧，同时给标签绑定父组件传递过来的所有属性

```js
<div v-bind="$attrs">子组件</div>

编译后的结果
<div msg1="msg1" msg2="msg2" />子组件</div>
```

## useSlots() 和 $slots

如果在子组件中定义的某个插槽被父组件使用了，那么就可以从 useSlots() 或 $slots 拿到父组件在插槽中传递的虚拟 dom。



## 动态组件

通过**component**配合**is**属性来判断要展示的属性，**is**上绑定的值就是要展示组件引入的名字或者是组件的**name**，最好使用 shallowRef 去绑定属性，不然会有警告。

```js
<component :is="componentName"></component>
<button @click="btn">修改</button>

import HelloWorld from './components/HelloWorld.vue'
import son from './components/son.vue'
import { shallowRef } from 'vue'

// 页面上渲染的组件，取决于componentName的值
let componentName = shallowRef(HelloWorld)
const btn = ()=>{
    componentName.value = son
}
```

## 全局组件

```js
import MyComponent from "./App.vue";
app.component("MyComponent", MyComponent);
```

## 全局异步组件

全局异步组件注册

```js
app.component(
  "MyComponent",
  defineAsyncComponent(() => import("./components/MyComponent.vue"))
);
```

## v-model 的扩展

在同一个组件中能写多个 v-model 实现多个值的双向绑定，在组件上写 v-model="page"，就是给子组件传递了一个 page 属性，同时接收了一个 update:page 的事件

1. 不使用 v-model 实现数据的双向绑定，其实下面的 v-mode 的形式，是这个的简写形式

   在父组件中

   ```js
   <HelloWorld :page="page" @updata:page="hand" />  // 接收自定义事件
   
   import HelloWorld from '@/components/HelloWorld.vue'
   import { ref } from 'vue'
   
   let page = ref(10)
   const hand = (res) =>{
       page.value = res
   }
   ```

   在子组件中

   ```js
   <button @click="btn">我是按钮</button>
   
   let props = defineProps(["page"]) // 接收参数
   let emit = defineEmits(["updata:page"]) // 自定义事件
   
   const btn =()=>{
       emit('updata:page', props.page + 50)
   }
   ```

2. 通过 v-model 实现父子组件之间的数据双向绑定，等同于 v2 的`.sync`实现的效果

   在父组件中，使用 v-model 传递数据

   ```js
   <childTemp v-model:page="page" />;
   
   import childTemp from "./child-temp.vue";
   import { ref, watch } from "vue";
   
   const page = ref(5);
   
   watch(page, (val) => {
     console.log("父组件的监听", val);
   });
   ```

   在子组件中更改值，实现父子之间值的同步

   ```js
   import { nextTick } from "vue";
   
   const props = defineProps(["page"]);
   
   const emit = defineEmits(["update:page"]);
   
   const change = async () => {
     emit("update:page", props.page + 1);
     // 必须要异步之后，子组件的值才是更新后的值
     await nextTick();
     console.log("子组件page", props.page);
   };
   ```

3. 特殊的值**modelValue**

   如果在 v-model 后没有指定双向绑定的值，那么他传递给子组件的值就是一个 modelValue 的特殊值。

   在父组件中

   ```js
   <childTemp v-model="page" />;
   
   import childTemp from "./child-temp.vue";
   import { ref, watch } from "vue";
   
   const page = ref(5);
   watch(page, (val) => {
     console.log("父组件的监听", val);
   });
   ```

   在子组件中

   ```js
   const props = defineProps(["modelValue"]);
   const emit = defineEmits(["update:modelValue"]);
   
   const change = async () => {
     emit("update:modelValue", props.modelValue + 1);
     await nextTick();
     console.log("子组件page", props.modelValue);
   };
   
   ```

## v-bind

1. 同时给一个标签挂载一堆属性

   ```js
   <div v-bind="objectOfAttrs">测试</div>
   
   objectOfAttrs: {
       id: 'divDom',
       class: 'user-top'
   }
   ```

2. 挂载动态属性

   ```js
   <div :[title]="newTitle">测试</div>
   
   title: 'aaaa',
   newTitle: 'newTitle',
   ```

## $parent

如果在子组件中的任意事件，在绑定事件的时候传递了一个`$parent`的属性，那么事件上就可以接受到该组件父组件的实例，并且该属性上有父组件通过 defineExpose 抛出的属性和方法。

```js
<div @click="change($parent)">子组件</div>

const change = async(e)=> {
  console.log('父组件的实例', e)
}
```

## 自定义事件的校验

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

在子组件中

```js
<button @click="submitForm(email,password)">my login</button>

import { ref } from 'vue'
let email = ref(123)
let password = ref(456)

const emit = defineEmits({
    // 没有校验
    click: null,

    // 校验 submit 事件
    submit: ({ email, password }) => {
        if (email && password) {
            return true
        } else {
            console.warn('Invalid submit event payload!')
            return false
        }
    }
})

function submitForm(email:any, password:any) {
    emit('submit', { email, password })
}
```

在父组件中

```js
<myLogin @submit="submit"></myLogin>

import myLogin from '@/views/my-login.vue'

const submit = (e) => {
    console.log('我被点击了',e);
}
```

## 透传

前提：传递的属性没有在子组件的 prop 中声明接收，深层组件继承，如果子组件嵌套着子组件，并且孙子组件是这个子组件的根标签，那么这个属性会继续透传到孙组件中。

注意：

1. 如果子组件有根标签，也就是子组件被一个标签包裹了所有的元素，同时子组件中并没有声明接收父组件传过来的 lage，那么这个 lage 将会加载到根标签中。
2. 子组件本身有 my-login 这个类，将会和父组件传递过来的 lage 合并
3. style 中的属性也是同样的结果
4. 这一行为是可以禁止的，在 defineOptions 中声明 inheritAttrs: false 即可

- style 和 clasee 在父子组件中透传

  在父组件中

  ```html
  <myLogin class="lage" style="font-size: 15px;"></myLogin>
  ```

  在子组件中的根标签中

  ```html
  浏览器渲染的结果
  <div class="my-login lage " style="font-size: 15px;">
    <button>my login</button>
  </div>
  ```

- 事件在父子组件中透传

  在父组件中

  ```js
  <myLogin @click="onClick"></myLogin>
  
  const onClick = () => {
  	console.log('我被触发了');
  }
  ```

  在子组件中

  ```html
  <div class="my-login">
    哈哈哈
    <button>my login</button>
  </div>
  ```

## 在 css 中直接使用 js 中的变量

借助 v-bind 直接在 css 中使用变量。

```
<script setup lang="ts">
let textColor = 'red'
</script>

<style>
    .login{
        color: v-bind(textColor);  // 此时的col就等于red
    }
</style>

```
