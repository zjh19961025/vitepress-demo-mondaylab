<template>
    <div id="mineContent">
      <!-- 遮罩层 -->
      <template v-if="checkResult">
        <i class="iconfont suoshui lockIcon"></i>
        <div class="overlay"></div>
        <passwordCheck class="dialog" @change="checkPassWord"></passwordCheck>
      </template>
      <div v-else>
        暂时还没有内容
      </div>
    </div>
</template>

<script setup>
import passwordCheck from './components/password.vue'
import {ref} from 'vue'
const checkResult = ref(true)
const checkPassWord = (value)=>{
  debugger
  if (value === 'zjh'){
    checkResult.value = false
  }
}
</script>

<style scoped>
@import "docs/public/css/iconfont.css";
html,
body {
  margin: 0;
  padding: 0;
  overflow-y: hidden;
}

body {
  background: #171717;
  color: #999;
  font: 100%/18px helvetica, arial, sans-serif;
}

#mineContent {
  position: fixed;
  height: 100%;
  left: 0;
  top: 64px;
  width: 100%;
  z-index: 20;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .lockIcon{
    font-size: 100px;
    position: fixed;
    top: 40%;
    left: 50%;
    color: #38bbf8;
    transform: translate(-50%, -50%);
    z-index: 1001;
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
}
</style>
