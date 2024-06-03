# 封装表格表单组件

实现效果
![vue-8.png](..%2Fpublic%2Fimg%2Fvue-8.png)

## 功能：

- 实现表格项填入以及表单校验、自定义显示列数、输入框文字颜色自定义
- 表格项自定义插槽内容

## 组件代码：

```vue

<script setup lang="ts">
  import {toValue} from 'vue'
  import type {tableFormSetting} from './tableFormType'
  // 接收父组件传递的数据

  const {tableData, lineCount} = withDefaults(defineProps<{
    tableData: Ref<tableFormSetting[]>,
    lineCount?: number
  }>(), {
    lineCount: 2,
  })
  /**
   * checkResult ： 校验结果
   */
  const checkResult = ref(true)
  /**
   * errorMessage ： 错误提示信息
   */
  const errorMessage = ref('')
  /**
   * getMessage ： 提供给父组件传递错误信息的方法
   */
  const getMessage = (message: string) => {
    errorMessage.value = message
    checkResult.value = false
  }
  /**
   * checkData ： 提供给父组件进行校验 并返回校验结果的方法
   * @returns {boolean} 返回校验结果
   * 注意：接收checkResult 需要使用async await 例如：const res = await boxPriceSettingRef.value.checkData()
   */
  const checkData = async () => {
    checkResult.value = true
    errorMessage.value = ''
    for (const item of toValue(tableData)) {
      item?.rules && await item.rules(item.value)
    }
    return checkResult.value
  }

  const getWidth = computed(() => 100 / lineCount + '%')
  defineExpose({
    checkData,
    getMessage,
  })
</script>

<template>
  <div class="flex flex-wrap">
    <div v-for="(item,index) in tableData" :key="item.prop" :class="['flex' ,'h-32']" :style="{ width: getWidth}">
      <div class="text-center bg-bg_main w-100 h-32 lh-32 flex-shrink-0 text-14 boxTitle"
           :class="(index+1) <= lineCount ? 'noBorderTop' :''">{{ item.title }}
      </div>
      <div class="flex-1 boxTitle" :class="(index+1) <= lineCount ? 'noBorderTop' :''">
        <template v-if="$slots[item.prop]">
          <div class="h-32 lh-32 text-14 ml-10">
            <slot :name="item.prop" v-bind="item"/>
          </div>
        </template>
        <template v-else>
          <el-input v-model="item.value" :input-style="item.style" :placeholder="item.placeholder"/>
        </template>
      </div>
    </div>
  </div>
  <!-- 校验信息 -->
  <div v-if="errorMessage" class="color-red mt-10 text-14">{{ errorMessage }}</div>
</template>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .noBorderTop {
    border-top: 1px solid #EBEEF5 !important;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border-top: 1px solid #EBEEF5;
    height: 32px;
    margin-top: -1px;
    border-radius: 0 !important;
  }

  .boxTitle {
    color: #606266;
    border: 1px solid #EBEEF5;
    border-top: none;
  }
</style>
```

TS类型文件内容

```ts
/**
 * 定义接收的数据类型接口
 */
export interface tableFormSetting {
    /**
     * 表格每一项的标题
     * @type {string}
     */
    title: string;

    /**
     * 表格项的值
     * @type {string | null}
     */
    value: string | null;

    /**
     * 输入框的提示
     * @type {string}
     */
    placeholder?: string;

    /**
     * 表格项id
     * @type {string}
     */
    prop: string;

    /**
     * 输入框的样式
     * @type {number}
     */
    style?: string;

    /**
     * 表格项的校验方法
     * @type {(value: string | null) => void}
     */
    rules?: (value: string | null) => void;
}
```

父组件调用

```vue

<template>
  <div>
    <tableForm ref="boxPriceSettingRef" :table-data="tableData"/>
    <div>---------------------------------------------------------</div>
    <tableForm ref="boxPriceSettingRef2" :table-data="tableData2" :line-count="3">
      <template #name="">
        <div class="flex flex-justify-between">
          <div>山东省-聊城市-望城区</div>
          <div class="text-[#1dc0faff] mr-10" @click="checkData">收货地址</div>
        </div>
      </template>
      <template #sex="scope">
        <div class="flex flex-justify-between">
          <div class="text-[#1dc0faff]">{{ scope.value }}</div>
          <div class="text-[#ff2f74ff] mr-10">收货地址</div>
        </div>
      </template>
      <template #email="scope">
        <div class="flex flex-justify-between">
          <div class="text-#1dc0faff">{{ scope.value }}</div>
          <div class="text-[#1dc0faff] mr-10">收货地址</div>
        </div>
      </template>
      <template #age="scope">
        <div class="flex flex-justify-between">
          <div class="text-#1dc0faff">{{ scope.value }}</div>
          <div class="text-[#1dc0faff] mr-10">收货地址</div>
        </div>
      </template>
    </tableForm>
  </div>
</template>
<script setup lang="ts">
  import type {tableFormSetting} from "@/components/tableForm/tableFormType"

  const boxPriceSettingRef = ref()
  const checkFail = (message: string) => {
    boxPriceSettingRef.value.getMessage(message)
  }
  const numRule = (value: string | null) => {
    if (!value) {
      nextTick(() => {
        checkFail('请输入价格')
      })
    }
  }
  const nameRule = (value: string) => {
    if (!value) {
      nextTick(() => {
        checkFail('请输入价格21313')
      })
    }
  }
  const tableData = ref<tableFormSetting[]>([
    {title: '50*50', value: null, placeholder: '请输入价格', prop: 'name', rules: numRule, style: 'color:red'},
    {title: '50*50', value: null, placeholder: '请输入价格', prop: 'age', rules: numRule, style: 'color:green'},
    {title: '50*50', value: null, placeholder: '请输入价格', prop: 'sex', rules: numRule, style: 'color:red'},
    {title: '50*50', value: null, placeholder: '请输入价格', prop: 'email', rules: numRule, style: 'color:green'},
  ])

const tableData2 = ref < tableFormSetting[] >([
  { title: '订单数', value: '25个订单', prop: 'name' },
  { title: '优惠券', value: '2涨券', prop: 'age' },
  { title: '运营触达', value: '2次触达', prop: 'sex' },
  { title: '销售跟进', value: '14次跟进', prop: 'email' },
])


  const checkData = () => {
    boxPriceSettingRef.value.checkData()
  }
</script>

```

效果：
![vue-9.png](..%2Fpublic%2Fimg%2Fvue-9.png)
