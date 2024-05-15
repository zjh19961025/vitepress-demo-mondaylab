## 概述：

有时候开发需要在js中展示某个组件，例如在uniapp中调用uni.showLoading()、uni.showToast()以及在element Ui中this.$message.warnning('xxxx')这类只用在js中书写命令但是页面上有组件效果的就是命令式组件

## Vue2

例子：

- 需求描述：需要在请求拦截器里面判断用户是否进行了实名制，如果没有实名制则弹框提示输入信息并完成认证操作

1. 创建idCard.vue

   ```vue
   <template>
   	<!-- 校验身份证弹框 -->
   	<view id="idCardTest" class="idCardTestQj">
   		<view class="backMask">
   			<view class="idCardTest_contain">
   				<image class="idCardTest_img" src="/static/images/index_img/idCardTest.png" mode=""></image>
   				<view class="f-blod">当前账号登记的身份证号码有误或不完整，请输入正确的身份证号码进行更新。</view>
   				<input placeholder-class="placeholder" class="idCardTest_input" type="text" maxlength="18" v-model="idCardValue" placeholder="请输入身份证号："/>
   				<button type="default" hover-class="none" class="linear-gradient1 idCardTest_but" @tap="submit">提交</button>
   			</view>
   		</view>
   	</view>
   </template>
   
   <script>
   	import {
   		throttle,
   		myToast,
   		request,
   	} from "../util.js";
   	
   	export default {
   		data() {
   			return {
   				idCardValue:'',//身份证
   			}
   		},
   		methods:{
   			submit: throttle(function() {
                   
   				let {idCardValue} = this;
   				
   				if (idCardValue == '') {
   					myToast('请输入身份证号');
   					return false;
   				}
   				// 正则验证
   				if(!this.checkIDCard(idCardValue)){
   					myToast('身份证格式错误，请重新输入!');
   					return false;
   				}
   				let params = {
   					identityCard:idCardValue,
   				}
   				request.post('/H5/identityCard/', params).then(res => {
   					// console.log(res);
   					if(res.returnCode=='0'){
   						myToast('身份证补录成功！');
                           this.$closeInvite()
   					}else{
                           myToast(res.returnMessage);
                       }
   				})
   			},1500),
   			//身份证格式判断
   			checkIDCard(idcode) {
   				var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
   				var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
   				var code = idcode + "";
   				var last = idcode[17]; //最后一个
   				var seventeen = code.substring(0, 17);
   				var arr = seventeen.split("");
   				var len = arr.length;
   				var num = 0;
   				for (var i = 0; i < len; i++) {
   					num = num + arr[i] * weight_factor[i];
   				}
   			
   				var resisue = num % 11;
   				var last_no = check_code[resisue];
   			
   				var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
   				// 判断格式是否正确
   				var format = idcard_patter.test(idcode);
   				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
   				return last === last_no && format ? true : false;
   			},
   		}
   	}
   </script>
   
   <style lang="less" scoped>
   	#idCardTest{
   		.backMask{
   			z-index: 999;
   			.idCardTest_contain{
   				width: 560rpx;
   				height: 580rpx;
   				background: #fff;
   				border-radius: 20rpx;
   				font-size: 26rpx;
   				color: #272727;
   				padding: 50rpx 78rpx;
   				box-sizing: border-box;
   				display: flex;
   				flex-direction: column;
   				justify-content: space-between;
   				align-items: center;
   				.idCardTest_img{
   					width: 176rpx;
   					height: 126rpx;
   				}
   				.idCardTest_but{
   					color: #fff;
   					border-radius: 50rpx;
   					width: 100%;
   					margin: 0;
   				}
   				.idCardTest_input{
   					width: 100%;
   					box-sizing: border-box;
   					background: #f1f0f0;
   					border-radius: 8rpx;
   					padding: 10rpx 20rpx;
   					height: 60rpx;
   				}
   				.placeholder{
   					font-size: 26rpx;
   					color: #d7d5d5;
   				}
   			}
   		}
   	}
   </style>
   
   ```

   2.创建invite.js

   ```js
   import Invite from './index_common/idCardTestQj.vue'
    
   export default {
     install(Vue) {
       const Profile = Vue.extend(Invite)
       
       // 弹出邀请
       Vue.prototype.$openInvite = function(params) {
         const instance = new Profile()
       //   instance._props._specia = params
         instance.vm = instance.$mount()
         const InviteEle = document.body.lastElementChild
         if(InviteEle.className === 'idCardTestQj') return
         setTimeout(() => document.body.appendChild(instance.vm.$el))
         return instance
       }
    
       // 关闭邀请
       Vue.prototype.$closeInvite = function() {
         const instance = new Profile()
         instance.vm = instance.$mount()
         const InviteEle = document.body.lastElementChild
         if(InviteEle.className !== 'idCardTestQj') return
         document.body.removeChild(InviteEle)
         return instance
       }
     }
   }
   ```

   3.main.js

   ```js
   import invite from './common/invite' //注意路径
   Vue.use(invite)
   ```

   4.现在可以在全局使用（在rquest.js）

   ```
   var vue = new Vue()
   vue.$openInvite()
   ```


## Vue3

### 一、前言

相信大家都封装过弹窗组件，基本思路都是父组件给子组件传递一个变量，子组件props进行接收，当点击确认或者关闭按钮时，通过emit回传事件供父组件调用。这种封装方式缺点是复用性查、使用频繁时需要定义多份{isVisible、handleSubmit、handleClose}代码，代码冗余，今天分享一种命令式组件封装的方式。

### 二、什么是命令式组件

命令式组件封装是一种将功能封装在组件内部，并通过命令式的方式进行调用和控制的封装方法。在命令式组件封装中，组件负责封装一定的功能逻辑，并提供一组接口或方法，供外部代码调用来触发和控制组件的行为。调用方式大致为：

```js
MessageBox({
  title: '这是标题',
  content: '这是内容',
  confirmContent: '确定',
  cancelContent: '取消'
}).then(() => {
  console.log('comfirm');
}).catch(() => {
  console.log('cancel');
})
```

### 三、开始封装

首先创建一个`MessageBox.vue`文件，编写组件样式代码，这里我使用的是`tailwindCSS`进行编写。

```vue
<Transition name="message-fade">
  <div class="w-full h-full bg-[rgba(0,0,0,.5)] fixed top-0 left-0 " v-show="isVisible">
    <div
      class=" z-10 w-[500px] h-[150px] rounded-md bg-white absolute top-1/2 left-1/2 -ml-[250px] -mt-[75px] p-3 flex flex-col">
      <div class="flex justify-between items-center h-[30px]">
        <p class="text-xl">{{ title }}</p>
        <img :src="CloseIcon" alt="" class="w-4 h-4  cursor-pointer" @click="handleCancel">
      </div>
      <div class="flex-[1] py-2">
        <p class="text-sm text-gray-500">{{ content }}</p>
      </div>
      <div class="h-[40px] flex justify-end items-center">
        <button class="text-white p-1 bg-green-500 w-[50px] text-sm mr-2" @click="handleComfirm">{{ confirmContent
        }}</button>
        <button class=" p-1 bg-white text-sm border-[1px] border-solid border-[#ccc] w-[50px]" @click="handleCancel">{{
          cancelContent }}</button>
      </div>
    </div>
  </div>
</Transition>
```

组件过渡样式代码：

```css
.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
}

.message-fade-enter-active {
  transition: opacity .2s ease-in;
}

.message-fade-leave-active {
  transition: opacity .2s ease-out;
}
```

组件需要接收参数有`title`(标题)、`content`(内容)、`confirmContent`(确认按钮文本)、`cancelContent`(取消按钮文本)。

```ts
interface IProps {
  title: string
  content: string
  confirmContent: string
  cancelContent: string
}

defineProps<IProps>()
```

我们需要定义变量`isVisible`和`type`。`isVisible`用来控制组件的显示和隐藏，`type`用来判断点击的按钮类型(`comfirm / cancel`)。

```js
const state = reactive({
  isVisible: false,
  type: ''
})

const {isVisible,type} = toRefs(state)
```

为了能够改变组件的显隐，编写一个`setVisible`方法。

```js
/**
 * 改变组件显隐
 * @param value true(显示) / false(隐藏)
 */
const setVisible = (value: boolean) => {
  isVisible.value = value
}
```

给确定按钮和取消按钮添加点击事件。

```js
/**
 * 确认
 */
const handleComfirm = () => {
  isVisible.value= false
  type.value = 'comfirm'
}

/**
 * 取消
 */
const handleCancel = () => {
  isVisible.value= false
  type.value  = 'cancel'
}
```

暴露响应式对象和控制显隐函数，供组件实例调用。

```js
defineExpose({
  setVisible,
  state
})
```

其次创建`index.ts`文件，由于组件调用方式是通过一个函数进行调用的，并提供`.then`和`.catch`方法，所以需要编写一个函数，该函数返回一个Promise。当调用该函数，创建组件实例，组件进行挂载。

```ts
/**
 * 
 * @param config 组件配置
 * @returns Promise
 */
const MessageBox = (config) => {
  // 创建组件实例
  const messageApp = createApp(MessageBoxComponent, config)

  return new Promise((resolve, reject) => {
    showMessage(messageApp, { resolve, reject })
  })
}

/**
 * 展示组件
 * @param app 组件实例
 * @param param1 
 */
const showMessage = (app, { resolve, reject }) => {
  // 创建文档碎片
  const dFrag = document.createDocumentFragment()
  // 将组件挂载在文档碎片上
  const vm = app.mount(dFrag)
  // 组件显示
  vm.setVisible(true)
  document.body.appendChild(dFrag)
}
```

目前就可以通过命令式进行调用组件，但是发现了一个问题，我们打开控制台，发现DOM元素不断的变多。原因是因为我们通过函数调用，不断创建新的DOM元素，所以需要对state进行监视，当组件呈隐藏状态，通过type来判断点击的是确定还是取消按钮，如果是点击确定按钮，调用resolve，否则调用reject，最后将组件进行卸载。

```js
/**
 * 展示组件
 * @param app 组件实例
 * @param param1 
 */
const showMessage = (app, { resolve, reject }) => {
  // 创建文档碎片
  const dFrag = document.createDocumentFragment()
  // 将组件挂载在文档碎片上
  const vm = app.mount(dFrag)
  // 组件显示
  vm.setVisible(true)
  document.body.appendChild(dFrag)

  watch(vm.state, (state) => {
    if (!state.isVisible) {
      switch (state.type) {
        case 'comfirm':
          resolve()
          break;
        case 'cancel':
          reject()
          break;
      }
      hideMessage(app)
    }
  })
}

/**
 * 卸载组件
 * @param app 组件实例
 */
const hideMessage = (app) => {
  app.unmount()
}
```

### 四、组件调用

我们通过函数进行调用，当前点击确定按钮，执行`.then`里的逻辑，例如发送请求等业务，否则执行`.catch`里的逻辑。

```js
MessageBox({
  title: '这是标题',
  content: '这是内容',
  confirmContent: '确定',
  cancelContent: '取消'
}).then(() => {
  console.log('comfirm');
}).catch(() => {
  console.log('cancel');
})
```

### 五、组件扩展

弹窗组件里的content区域不一定是一段提示语，也有可能是一个表单，我们可以在MessageBox.vue(或者可以创建一个新的文件)里编写一个组件函数contentView，该函数接收一个type参数，通过这个type进行判断并利用h函数显示，然后在模板中调用传值即可，这里就不给大家实现了。

