## 前言

- 在vue2中
  `v-model实际上是表单的 :value属性 和@input事件的合写,是一个语法糖`
- 在vue3中
  `v-model实际上是表单的 :modelValue属性 和@update:modelValue事件的合写,是一个语法糖`

## Vue2

```
绑定数据时使用.sync修饰符
作用：可以实现 子组件 与 父组件数据 的 双向绑定，简化代码
特点：props属性名，可以自定义，非固定为 value
场景：封装弹框类的基础组件， visible属性 true显示 false隐藏
本质：就是 :属性名 和 @update:属性名 合写
```

父组件

```html
<el-form-item label="主体 :" prop="unitId">
	<select-loadmore
          ref="partnerUnitNameSearchRef"
          placeholder="请输入要搜索的运营商主体"
          :search-model-val.sync="form.unitId"
          :format-select-list="{value: 'id', label: 'name'}"
          :select-get-api="socialCreditUnitApi.getSocialCreditUnitPage"
          search-key="p.unit_id"
          select-searchkey="name"
          @onSelectEnter="onSelectEnter"
	/>
</el-form-item>
```

子组件

```vue
<template>
  <el-select
    v-model="searchModelVal"
    v-select-loadmore="loadmore"
    remote
    filterable
    :placeholder="placeholder"
    class="w100"
    clearable
    :remote-method="selectSearch"
    @visible-change="selectVisibleChange"
    @change="onSelectChange"
    @clear="onSelectClear"
    @keyup.native.enter="onSelectEnter"
  >
    <el-option
      v-for="(item,index) in selectList"
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
      <div v-show="selectList.length <= 0 && !selectLoading">无匹配数据</div>
      <div v-if="selectList.length > 0 && selectLeave <= 0">没有更多了</div>
    </el-option>
  </el-select>
</template>

<script>
import selectLoadmoreMixins from '@/mixins/select-loadmore-mixins'
import props from './props'

export default {
  name: 'SelectLoadmore',
  mixins: [props, selectLoadmoreMixins],
  methods: {
    onSelectChange() {
      this.$emit('update:searchModelVal', this.searchModelVal)
      this.$emit('onSelectChange', this.searchKey, this.searchModelVal)
    },
    onSelectClear() {
      this.$emit('onSelectClear', this.searchKey)
      this.searchModelVal = ''
    },
    onSelectEnter() {
      this.$emit('onSelectEnter', this.searchModelVal)
    },
    resetState() {
      this.onSelectClear()
    },
  }
}
</script>

```

- 使用props接收父组件传递过来的参数
- $emit发送固定事件名update:props接收过来的参数

## Vue3

### 1.简写

父组件使用v-model

```vue
<channel-select v-model="params.cate_id"></channel-select>
```

子组件使用defineProps接收数据和defineEmits发送数据

```vue
<script setup>
// 接收父组件传递过来的参数
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
// 子向父传递的参数
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" >
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>
```

### 2.完整写法

父组件使用 :modelValue 和 @update:modelValue

```vue
<channel-select
          :modelValue="params.cate_id"
          @update:modelValue="params.cate_id = $event"
        ></channel-select>
```

子组件通过defineProps接收数据和defineEmits发送数据

```vue
<script setup>
// 接收父组件传递过来的参数
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
// 子向父传递的参数
const emit = defineEmits(['update:modelValue'])
const changeHandel = (e) => {
  console.log(e)
  emit('update:modelValue', e)
}
</script>
<template>
  <el-select :modelValue="modelValue" @change="changeHandel">
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>
```

可以自定义参数

```vue
<channel-select v-model:cid="params.cate_id"></channel-select>
```

子组件使用defineProps接收数据和defineEmits发送数据

```vue
<script setup>
// 接收父组件传递过来的参数
defineProps({
  cid: {
    type: [Number, String]
  }
})
// 子向父传递的参数
const emit = defineEmits(['update:cid'])
</script>
<template>
  <el-select :modelValue="cid" @update:modelValue="emit('update:cid', $event)" >
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>
```

