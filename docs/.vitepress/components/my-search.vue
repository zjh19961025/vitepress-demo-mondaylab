<script setup>
import {Search} from '@element-plus/icons-vue'
import {ref} from 'vue'

const keyWords = ref('')
const toSearch = () => {
  window.open('https://www.baidu.com/s?wd=' + keyWords.value)
}

const goToPage = (item) => {
  window.open(item.link)
}

const menuList = ref([
  {
    name: '外贸官网',
    link: 'https://flowermi.com/page/?lang=zh',
    img: 'http://192.168.31.5/pages//dev-home/img/hua5-logo-trade.png'
  },
  {
    name: '花伍后台',
    link: 'https://group.hua5.com/hua5x-group-admin/827e7cfc-1bde-11ee-9630-0242ac13000b/#/login',
    img: 'http://192.168.31.5/pages//dev-home/img/hua5-logo-z.jpg'
  },
  {
    name: '自用GPT',
    link: 'http://192.168.31.5:3002/',
    img: 'http://192.168.31.5/pages//dev-home/img/chat_gpt.png'
  },
  {
    name: 'GODGPT',
    link: 'https://gptgod.online/#/session/9u91uwtigdt7wq5rfbn6w7d01',
    img: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+PHBhdGggZD0iTTc1OC45ODIgMTAxNEgyNjUuMDE4Yy0yNC45NSAwLTQ1LjE3Ni0yMC4yMjYtNDUuMTc2LTQ1LjE3NlY1NS4xNzZjMC0yNC45NSAyMC4yMjYtNDUuMTc2IDQ1LjE3Ni00NS4xNzZoNDkzLjk2NGMyNC45NSAwIDQ1LjE3NiAyMC4yMjYgNDUuMTc2IDQ1LjE3NnY5MTMuNjVjMCAyNC45NDgtMjAuMjI2IDQ1LjE3NC00NS4xNzYgNDUuMTc0eiIgZmlsbD0iIzU4NjFDNyIvPjxwYXRoIGQ9Ik03NTguOTgyIDEwSDI2NS4wMThjLTI0Ljk1IDAtNDUuMTc2IDIwLjIyNi00NS4xNzYgNDUuMTc0djQwYzAtMjQuOTUgMjAuMjI2LTQ1LjE3NCA0NS4xNzYtNDUuMTc0aDQ5My45NjRjMjQuOTUgMCA0NS4xNzYgMjAuMjI2IDQ1LjE3NiA0NS4xNzR2LTQwYzAtMjQuOTQ4LTIwLjIyNi00NS4xNzQtNDUuMTc2LTQ1LjE3NHoiIGZpbGw9IiM4Rjk1RTYiLz48cGF0aCBkPSJNNzU4Ljk4MiA5NzRIMjY1LjAxOGMtMjQuOTUgMC00NS4xNzYtMjAuMjI2LTQ1LjE3Ni00NS4xNzR2NDBjMCAyNC45NSAyMC4yMjYgNDUuMTc0IDQ1LjE3NiA0NS4xNzRoNDkzLjk2NGMyNC45NSAwIDQ1LjE3Ni0yMC4yMjYgNDUuMTc2LTQ1LjE3NHYtNDBjMCAyNC45NDgtMjAuMjI2IDQ1LjE3NC00NS4xNzYgNDUuMTc0eiIgZmlsbD0iIzRGNTZCMCIvPjxwYXRoIGQ9Ik03MzguMzggOTI2LjgxSDI4NS42MmExMy42NTYgMTMuNjU2IDAgMCAxLTEzLjY1OC0xMy42NThWMTEwLjg0OEExMy42NTYgMTMuNjU2IDAgMCAxIDI4NS42MiA5Ny4xOWg0NTIuNzZhMTMuNjU2IDEzLjY1NiAwIDAgMSAxMy42NTggMTMuNjU4djgwMi4zMDRhMTMuNjU2IDEzLjY1NiAwIDAgMS0xMy42NTggMTMuNjU4eiIgZmlsbD0iI0Q0NzZFMiIvPjxwYXRoIGQ9Ik02MzQuODQ0IDQwLjE0OEgzODkuMTU2YTEyLjMgMTIuMyAwIDAgMCAwIDI0LjZoMjQ1LjY4OGExMi4zIDEyLjMgMCAxIDAgMC0yNC42ek01NzMuNzAyIDk5Mi45N0g0NTAuM2MtMTIuNzc4IDAtMjMuMTM4LTEwLjM2LTIzLjEzOC0yMy4xMzggMC0xMi43NzggMTAuMzYtMjMuMTM4IDIzLjEzOC0yMy4xMzhoMTIzLjQwMmMxMi43NzggMCAyMy4xMzggMTAuMzYgMjMuMTM4IDIzLjEzOC0uMDAyIDEyLjc4LTEwLjM2IDIzLjEzOC0yMy4xMzggMjMuMTM4eiIgZmlsbD0iIzMzOSIvPjxwYXRoIGQ9Ik00MDcuOTk4IDE3OS4wNDRINTUuMTc2QzMwLjIyNiAxNzkuMDQ0IDEwIDE5OS4yNyAxMCAyMjQuMjJ2MjQyLjM3OGMwIDI0Ljk1IDIwLjIyNiA0NS4xNzYgNDUuMTc0IDQ1LjE3NmgxODcuMTY0bDEyMC40OTQgMTIwLjQ5NGM3LjA0MiA3LjA0MiAxOS4wOCAyLjA1NCAxOS4wOC03LjkwNHYtMTEyLjU5aDI2LjA4NGMyNC45NSAwIDQ1LjE3Ni0yMC4yMjYgNDUuMTc2LTQ1LjE3NlYyMjQuMjJjMC0yNC45NS0yMC4yMjYtNDUuMTc2LTQ1LjE3NC00NS4xNzZ6IiBmaWxsPSIjNjlFQkZDIi8+PHBhdGggZD0iTTE4NS45NDQgMjYxLjU5NmMzMi4yMS0uMzM0IDQ1LjMxMiAyMS40MDIgNDUuMzEyIDIxLjQwMnMxMi42NjgtMjEuMDcgNDQuODc4LTIxLjQwMmMzMi4yMS0uMzM0IDU2LjU0MiAyNi42MzIgNTYuODAyIDUxLjc1Ni4yNiAyNS4xMjItMy40NjIgNDMuMTE4LTQ5LjgyNiA4Mi41OTItMTYuMjgyIDEzLjg2Mi0yOS45NjYgMjMuNzEtMzguOTMyIDI5LjczNGEyMC44MTQgMjAuODE0IDAgMCAxLTIyLjg4NC4yMzhjLTkuMDg4LTUuODM4LTIyLjk3NC0xNS40LTM5LjU0LTI4LjkyLTQ3LjE3NC0zOC41MDQtNTEuMjY4LTU2LjQyLTUxLjUyOC04MS41NDItLjI2LTI1LjEyNCAyMy41MDgtNTMuNTI0IDU1LjcxOC01My44NTh6IiBmaWxsPSIjRkY4MzU0Ii8+PHBhdGggZD0iTTYxNi4wMDQgNDI4LjE4NGgzNTIuODIyYzI0Ljk1IDAgNDUuMTc0IDIwLjIyNiA0NS4xNzQgNDUuMTc2djI0Mi4zNzhjMCAyNC45NS0yMC4yMjYgNDUuMTc2LTQ1LjE3NCA0NS4xNzZINzgxLjY2Mkw2NjEuMTY4IDg4MS40MDhjLTcuMDQyIDcuMDQyLTE5LjA4IDIuMDU0LTE5LjA4LTcuOTA0di0xMTIuNTloLTI2LjA4NGMtMjQuOTUgMC00NS4xNzYtMjAuMjI2LTQ1LjE3Ni00NS4xNzZ2LTI0Mi4zOGMwLTI0Ljk1IDIwLjIyNi00NS4xNzQgNDUuMTc2LTQ1LjE3NHoiIGZpbGw9IiM2OUVCRkMiLz48cGF0aCBkPSJNOTI1Ljk0OCA1NjUuMjhINjU4Ljg4Yy0xMC44MyAwLTE5LjYxLTguNzgtMTkuNjEtMTkuNjFzOC43OC0xOS42MSAxOS42MS0xOS42MWgyNjcuMDY4YzEwLjgzIDAgMTkuNjEgOC43OCAxOS42MSAxOS42MSAwIDEwLjgzMi04Ljc4IDE5LjYxLTE5LjYxIDE5LjYxem0wIDk4LjgwNkg2NTguODhjLTEwLjgzIDAtMTkuNjEtOC43OC0xOS42MS0xOS42MXM4Ljc4LTE5LjYxIDE5LjYxLTE5LjYxaDI2Ny4wNjhjMTAuODMgMCAxOS42MSA4Ljc4IDE5LjYxIDE5LjYxcy04Ljc4IDE5LjYxLTE5LjYxIDE5LjYxeiIgZmlsbD0iI0M3RkNGRSIvPjwvc3ZnPg=='
  },
  {
    name: 'CSDN',
    link: 'https://blog.csdn.net/weixin_44326167?spm=1000.2115.3001.5343',
    img: 'https://g.csdnimg.cn/static/logo/favicon32.ico'
  },
  {
    name: '稀土掘金',
    link: 'https://juejin.cn/',
    img: 'https://explore.yohn-z.cn/my-search/icon/juejin.svg'
  },
])
</script>

<template>
  <div class="mySearch">
    <div class="content">
      <!--输入框上面的东西-->
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40" id="test"></circle>
        </svg>
      </div>

      <div class="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>

      <el-input
          v-model="keyWords"
          style="width: 100%"
          size="large"
          @change="toSearch"
          placeholder=""
          :suffix-icon="Search"
      />
      <!--   下面的网站列表   -->
      <div class="menuList">
        <div class="menuItem" v-for="(item,index) in menuList" :key="index" @click="goToPage(item)">
          <div class="imgBox">
            <img class="itemImg" :src="item.img" alt="">
          </div>
          <div class="itemName">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  --path: #2f3545;
  --dot: #5628ee;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
}

.loader:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg rect,
.loader svg polygon,
.loader svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader.triangle {
  width: 48px;
}

.loader.triangle:before {
  left: 21px;
  transform: translate(-10px, -18px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 20px 16px;
}


.mySearch {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  background-image: url(http://oss.yohn-z.cn/service/2024-04-28/background.jpg);
  /* background-color: pink; */
  background-color: transparent;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .content {
    position: fixed;
    width: 800px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    .menuList {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 20px 50px;

      .menuItem {
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .imgBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background-color: #eee;
          border-radius: 50%;

          .itemImg {
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 4px;
          }
        }

        .itemName {
          color: #fff;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
