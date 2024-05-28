<template>
  <div class="home-wrapper">
    <div style="display: flex">
      <img src="../../public/avatar.png" class="avatar" />
      <h1 id="title" class="title"></h1>
    </div>
    <canvasStar></canvasStar>
    <mouse class="mouse"></mouse>
    <div class="fight">加油，冲鸭！</div>
  </div>
</template>

<script setup>
import canvasStar from "./components/canvas.vue"
import mouse from './components/mouse.vue'
import Typed from "typed.js";
import { onMounted, onBeforeUnmount } from "vue";
const wisdomList = [
  "强者总是尝试改变，弱者总是说命中注定…更弱的人说不去做都知道会失败。",
  "成功的秘诀在于坚持到最后一刻。",
  "挫折可能是你通向成功的最后一道门。",
  "不要因为害怕失败而放弃追求，因为只有经历失败，你才能真正理解成功。",
  "每一次的失败都是通向成功的另一条道路。",
  "生活中最重要的事情不是我们在哪里，而是我们朝着哪个方向前进。",
  "你的生活只有你能控制，你的未来只有你能决定。",
  "只有敢于迎接挑战，我们才能真正实现自我。",
  "生活就像骑自行车，要保持平衡，就必须不断前进。",
  "成功不是终点，失败不是终结，只有勇气才是永恒。",
  "加油奥利给！"
]

let typed;
let timer = null
onMounted(() => {
  getWisdomList()
  timer = setInterval(()=>{
    getWisdomList()
  },5000)
});
onBeforeUnmount(() => {
  typed.destroy();
  clearInterval(timer)
  timer = null
});
const getWisdomList = ()=>{
  try {
    typed = new Typed("#title", {
      strings: [wisdomList[parseInt(Math.random() * 10)]],
      typeSpeed: 50,
    });
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>
.home-wrapper{
  //background: #212121;
  height: 100vh;
}
.mouse{
  position: fixed;
  right: 30px;
  bottom: 40px;
}
.fight{
  color: #fff;
  position: fixed;
  right: 55px;
  bottom: 10px;
  z-index: 9999;
}
.avatar {
  z-index: 99;
  position: fixed;
  left: 30px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 100%;
  box-shadow: 0px 0px 30px 8px rgba(255, 255, 255, 0.82);
  transition: all 0.2s;
  &:hover {
    transform: scale(1.3);
  }
}
 .title {
  color: #ffffff;
  font-size: 1rem;
  z-index: 999;
  position: fixed;
  left: 130px;
  margin-top: 10px;
}
</style>
