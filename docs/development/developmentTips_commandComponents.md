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
async function showMsg(){
    const [,res]= await msgBox('测试内容'，{type:'success',iconType:'question'})
    if(res){
        consloe.log('点击了确定')
    }else{
        console.log('点击了取消')
    }
}
```

### 三、开始封装

首先创建一个`MessageBox.vue`文件，编写组件样式代码，这里我使用的是`tailwindCSS`进行编写。

```vue
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { ElButton, ElDialog } from 'element-plus'
export interface HuiMsgBoxProp {
  /** 控制图标展示类型 info:叹号 success:钩 question:问号 */
  iconType:'info' | 'success' | 'question',
  /** 控制图标展示的颜色 */
  type:'info' | 'warning' | 'success' | 'danger',
  /** 弹窗显示的内容 */
  content:string,
  /** 取消按钮的文本 */
  cancelText:string,
  /** 确定按钮的文本 */
  confirmText:string,
  /** 关闭事件 */
  closeBox: ()=> void,
  /** 确定事件事件 */
  confirmHandler:()=> void,
  /** 取消事件 */
  cancelHandler:()=> void,
}
const { iconType, type, content, cancelText, confirmText, closeBox, confirmHandler, cancelHandler } = withDefaults(defineProps<HuiMsgBoxProp>(), {
  iconType: 'info',
  type: 'info',
  cancelText: '取消',
  confirmText: '确定',
})

const iconTypeClass = computed<string>(() => {
  const iconTypeClassList = {
    info: 'text-disabled',
    warning: 'text-warning',
    success: 'text-success',
    danger: 'text-danger',
  }
  return iconTypeClassList[type]
})

const iconColorClass = computed<string>(() => {
  const iconColorClassList = {
    info: 'i-com-gantanhao',
    success: 'i-com-gou1',
    question: 'i-com-wenhao',
  }
  return iconColorClassList[iconType]
})

// 控制显示处理
const isVisible = ref(false)
/**
 * 组件展示
 */
const show = () => {
  isVisible.value = true
}

/**
 * 处理动画 (render 函数的渲染，会直接进行)
 */
onMounted(() => {
  show()
})

/**
 * 取消事件
 */
const onCancelClick = () => {
  if (cancelHandler) {
    cancelHandler()
  }
  close()
}

/**
 * 确定事件
 */
const onConfirmClick = () => {
  if (confirmHandler) {
    confirmHandler()
  }
  closeBox()
}

// 关闭动画处理时间
const duration = '0.5s'
/**
 * 关闭事件,保留动画执行时长
 */
const close = () => {
  isVisible.value = false
  // 延迟一段时间进行关闭
  setTimeout(() => {
    if (closeBox) {
      closeBox()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '')) * 100)
}
</script>

<template>
  <div class="hua5-message-box">
    <ElDialog
      v-model="isVisible"
      width="400"
      @closed="close"
    >
      <div class="flex justify-center flex-center h-110">
        <div>
          <i :class="[iconTypeClass,iconColorClass,'icon-com !text-27']" />
        </div>
        <div class="text-14 font-bold text-normal ml-11">{{ content }}</div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <ElButton class="!text-primary !border !border-1 !border-primary" @click="onCancelClick">{{ cancelText }}</ElButton>
          <ElButton type="primary" class="w-100px" @click="onConfirmClick">{{ confirmText }}</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<style lang="scss">
.hua5-message-box{
  .el-dialog{
    border-radius: 8px !important;
  }
  .el-dialog .el-dialog__header{
    background-color: #fff !important;
  }
  .el-dialog .el-dialog__footer{
    background-color: #fff !important;
  }
}
</style>
```

组件需要接收参数

```ts
export interface HuiMsgBoxProp {
  /** 控制图标展示类型 info:叹号 success:钩 question:问号 */
  iconType:'info' | 'success' | 'question',
  /** 控制图标展示的颜色 */
  type:'info' | 'warning' | 'success' | 'danger',
  /** 弹窗显示的内容 */
  content:string,
  /** 取消按钮的文本 */
  cancelText:string,
  /** 确定按钮的文本 */
  confirmText:string,
  /** 关闭事件 */
  closeBox: ()=> void,
  /** 确定事件事件 */
  confirmHandler:()=> void,
  /** 取消事件 */
  cancelHandler:()=> void,
}
```

其次创建`index.ts`文件，由于组件调用方式是通过一个函数进行调用的，并提供`.then`和`.catch`方法，所以需要编写一个函数，该函数返回一个Promise。当调用该函数，创建组件实例，组件进行挂载。

```ts
import { h, render } from 'vue'
import confirmComponent from './message-box.vue'
import { to } from "@hua5/hua5-utils"

export interface PayLoadType {
  /** 控制图标展示类型 info:叹号 success:钩 question:问号 */
  iconType?:'info' | 'success' | 'question',
  /** 控制图标展示的颜色 */
  type?: "info" | "success" | "danger" | "warning",
  /** 取消按钮的文本 */
  cancelText?:string,
  /** 确定按钮的文本 */
  confirmText?:string
}
export const hua5MsgBox = (content: string, payLoad:PayLoadType = {}) => {
  const { iconType = 'info', type = 'info', cancelText, confirmText } = payLoad
  return new Promise((resolve) => {
    // 取消按钮事件
    const cancelHandler = () => {
      resolve(false)
    }

    // 确定按钮事件
    const confirmHandler = () => {
      resolve(true)
    }

    // 关闭弹层事件
    const closeBox = () => {
      render(null, document.body)
    }

    // 1. 生成 vnode
    const vnode = h(confirmComponent, {
      content,
      iconType,
      type,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      closeBox,
    })

    // 2. render 渲染
    render(vnode, document.body)
  })
}

export const msgBox = (content: string, payLoad?:PayLoadType) => {
  return to(hua5MsgBox(content, payLoad))
}
```

### 四、to函数

```typescript
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to(promise: Promise<any>): Promise<any> {
  return promise.then(res => [null, res]).catch(error => [error, null])
}
```

