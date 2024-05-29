<template>
  <div class="photo-wall">
    <el-timeline>
      <template v-for="(items, i) in dataList">
        <el-timeline-item
            :timestamp="items.time"
            type="primary"
            placement="top"
        >
          <el-card>
            <div
                slot="header"
                class="clearfix"
                v-text="items.time + '照片墙'"
            ></div>
            <div class="img-list">
              <div
                  v-for="(item, j) in items.list"
                  :key="j"
                  class="img-item-con"
              >
                <img :src="getUrl(item.src)" alt="">
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </template>
    </el-timeline>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import imgSrc from './imgSrc.json'

const getUrl = (item) => {
  return new URL(item, import.meta.url)
}
console.info('🚀 ~ file:photo method: line:42 -----', imgSrc)
const dataList = ref([
  {
    time: '2019',
    listSrc: [],
    list: imgSrc.cat
  },
  {
    time: '2020',
    listSrc: [],
    list: imgSrc.school
  },
  {
    time: '2021',
    listSrc: [],
    list: imgSrc.family
  },
  {
    time: '2021',
    listSrc: [],
    list: imgSrc.family
  },
  {
    time: '2021',
    listSrc: [],
    list: imgSrc.family
  },
  {
    time: '2021',
    listSrc: [],
    list: imgSrc.family
  },
])
</script>
<style scoped>
.photo-wall {
  padding: 50px;
}


.img-list {
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  .img-item-con {
    width: 300px;
    float: left;
    height: 240px;
    padding: 10px;

    img {
      transition: all 0.4s;
      height: 200px;
      width: auto;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
