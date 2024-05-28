<template>
  <div>
    <!-- 遮罩层 -->
    <div v-if="show" class="overlay" @click="closeDialog"></div>

    <!-- 对话框 -->
    <div v-if="show" class="dialog">
      <h2>对话框标题</h2>
      <input type="text" v-model="inputValue" placeholder="请输入内容" />
      <button @click="closeDialog">关闭</button>
    </div>

    <!-- 触发对话框的按钮 -->
    <button @click="openDialog">打开对话框</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      inputValue: ''
    };
  },
  methods: {
    openDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}
</style>
