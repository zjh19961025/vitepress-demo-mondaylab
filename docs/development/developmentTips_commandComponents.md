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

   