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
            <div class="img-list">
              <div
                  v-for="(item, j) in items.list"
                  :key="j"
                  class="img-item-con"
              >
                <div class="imgTitle">{{ item.name }}</div>
                <img
                    :src="item.src"
                    class="avatar"
                    alt=""
                />
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

const dataList = ref([
  {
    time: '我的猫',
    listSrc: [],
    list: imgSrc.cat
  },
  {
    time: '大学时光',
    listSrc: [],
    list: imgSrc.school
  },
  {
    time: '家人时光',
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
    width: auto;
    float: left;
    height: 200px;
    padding: 10px;
    margin-bottom: 20px;

    .imgTitle {
      color: #409EFF;
    }

    img {
      transition: all 0.4s;
      height: 200px;
      width: auto;
    }

    &:hover {
      img {
        transform: scale(1.2);
      }

      .imgTitle {
        font-weight: bold;
      }
    }
  }
}
</style>
