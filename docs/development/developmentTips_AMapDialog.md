## 说明

组件是基于vue2以及高德地图版本1.4.15

## 组件样式

![map.png](..%2Fpublic%2Fimg%2Fmap.png)

## 组件功能

- 搜索功能
- 点击地图进行定位功能

## 组件代码

```vue
<template>
  <div class="AMap">
    <el-dialog
      class="AMap__dialog"
      width="80%"
      append-to-body
      modal-append-to-body
      :title="title"
      :visible.sync="showAMapDialog"
    >
      <template v-if="showAMapDialog">
        <el-input
          id="map__input"
          v-model="address"
          class="AMap__content-input"
          :readonly="disabled"
          clearable
          placeholder="输入关键字选取地点"
          @input="handleInput"
        />
        <div class="AMap__content-box">
          <div id="map__container" class="AMap__content-container" tabindex="0" />
          <div id="map__result" class="AMap__content-result">
            <h3 class="w100 tc">暂无搜索结果</h3>
          </div>
        </div>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAMapDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addAMap, removeAMap } from './config'
import { throttle } from '@/hua5-lib/utils/common-utils'
export default {
  name: 'MapDialog',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 双向数据绑定的值 组件使用 place.sync = form.xxx
    place: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      address: '', // 地址
      poi: {}, // 地点信息
      marker: null, // 标记点
      map: null, // 地图实例
      showAMapDialog: false // 是否展示地图弹窗
    }
  },
  computed: {
    title() {
      return this.disabled ? '查看坐标' : '选择坐标'
    },
  },
  watch: {
    value: {
      handler(val) {
        this.poi = val
      },
      deep: true,
      immediate: true
    },
    poi: {
      handler(val) {
        this.address = val.formattedAddress
        this.$emit('input', val)
      },
      deep: true
    },
    showAMapDialog(newValue) {
      newValue ? this.setupMap() : this.tearDownMap()
    }
  },
  methods: {
    // 加载地图
    setupMap() {
      this.$nextTick(() =>
        this.init(() => {
          // 在打开地图的时候判断是否有地址信息，如果有地址信息需要回显地址信息
          if (this.poi.longitude && this.poi.latitude) {
            this.addMarker(this.poi.longitude, this.poi.latitude)
            this.getAddress(this.longitude, this.poi.latitude)
          }
          if (this.poi.location) {
            this.addMarker(this.poi.location.lng, this.poi.location.lat)
            this.getAddress(this.poi.location.lng, this.poi.location.lat)
          }
        })
      )
    },
    // 卸载地图
    tearDownMap() {
      window.poiPicker.clearSearchResults()
      window.poiPicker.off('poiPicked')
      window.poiPicker = null
      this.map.destroy('click')
      // 解绑地图的点击事件
      this.map.off('click')
      // 销毁地图，并清空地图容器
      this.map.destroy()
      // 地图对象赋值为null
      this.map = null
      // 清除地图容器的 DOM 元素
      document.getElementById('map__container').remove()
      removeAMap()
    },
    handleInput() {
      throttle(this.updateSearchResults, 200)
    },
    updateSearchResults() {
      // 控制弹窗右侧搜索结果容器 没有搜索结果的时候显示暂无搜索结果
      const resultDiv = document.getElementById('map__result')
      setTimeout(() => {
        const searchDiv = document.querySelector('.amap_lib_placeSearch')
        if (!searchDiv) {
          resultDiv.innerHTML = `<h3 class="w100 tc">暂无搜索结果</h3>`
        }
      }, 200)
    },
    // 提交事件
    submitInfo() {
      if (this.testUtils.isNotEmpty(this.poi)) {
        this.$emit('handConfirm', this.poi)
        this.$emit('update:place', this.poi.formattedAddress) // 触发双向数据绑定的方法
        this.showAMapDialog = false
      } else {
        this.hua5UI.err('请选择地址')
      }
    },
    // 新增坐标
    addMarker(R, P) {
      this.clearMarker()
      this.marker = new window.AMap.Marker({
        position: [R, P]
      })
      this.marker.setMap(this.map)
    },
    // 清空坐标
    clearMarker() {
      this.marker?.setMap(null)
      this.marker = null
    },
    // 获取坐标
    getAddress(R, P) {
      // eslint-disable-next-line new-cap
      new window.AMap.service('AMap.Geocoder', () => {
        // 回调函数
        const geocoder = new window.AMap.Geocoder({})
        geocoder.getAddress([R, P], (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            const regeocode = result.regeocode
            this.poi = Object.assign(regeocode, {
              longitude: R,
              latitude: P
            })
            // 自定义点标记内容
            const markerContent = document.createElement('div')
            // 点标记中的图标
            const markerImg = document.createElement('img')
            markerImg.src =
              '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
            markerContent.appendChild(markerImg)
            // 点标记中的文本
            const markerSpan = document.createElement('span')
            markerSpan.className = 'AMap__marker'
            markerSpan.innerHTML = this.poi.formattedAddress
            markerContent.appendChild(markerSpan)
            this.marker.setContent(markerContent) // 更新点标记内容
          }
        })
      })
    },
    addClick() {
      this.map.on('click', e => {
        const lnglat = e.lnglat
        const P = lnglat.P || lnglat.Q
        const R = lnglat.R
        this.addMarker(R, P)
        this.getAddress(R, P)
      })
    },
    init(callback) {
      this.map = new window.AMap.Map('map__container', {
        // zoom 控制地图缩放比例 有地址信息的时候需要放大地图
        // center 地图的中心点
        zoom: this.testUtils.isNotEmpty(this.poi) ? 23 : 13,
        center: (() => {
          if (this.poi.longitude && this.poi.latitude) {
            return [this.poi.longitude, this.poi.latitude]
          }
          if (this.poi.location) {
            return [this.poi.location.lng, this.poi.location.lat]
          }
        })()
      })
      this.initPoip()
      this.addClick()
      callback()
    },
    initPoip() {
      window.AMapUI.loadUI(['misc/PoiPicker'], PoiPicker => {
        // 初始化poiPicker
        window.poiPicker = new PoiPicker({
          input: 'map__input',
          placeSearchOptions: {
            map: this.map,
            pageSize: 10
          },
          searchResultsContainer: 'map__result'
        })
        window.poiPicker.on('poiPicked', this.handlePoiPicked)
      })
    },
    handlePoiPicked(poiResult) {
      this.clearMarker()
      const source = poiResult.source
      const poi = poiResult.item
      this.poi = Object.assign(poi, {
        formattedAddress: poi.name,
        longitude: poi.location.R,
        latitude: poi.location.P,
      })
      if (source !== 'search') {
        window.poiPicker.searchByKeyword(poi.name)
      }
    },
    // 打开弹窗的时候将动态加载地图需要的js标签
    open() {
      addAMap().then(() => {
        this.showAMapDialog = true
      })
    }
  }
}
</script>

<style lang="scss">
.AMap {
  &__marker {
    position: absolute;
    top: -20px;
    right: -118px;
    color: #fff;
    padding: 4px 10px;
    box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
    white-space: nowrap;
    font-size: 12px;
    background-color: #25a5f7;
    border-radius: 3px;
  }
  &__content {
    &-input {
      margin-bottom: 10px;
    }
    &-box {
      display: flex;
    }
    &-container {
      width: 100%;
      height: 450px;
    }
    &-result {
      display: block !important;
      width: 250px;
      height: 450px;
      overflow-y: auto;
    }
  }
}
</style>

```

其中引入的js

```js
import { AMapProxyHost } from '@/config/env'
export const addAMap = function() {
  window._AMapSecurityConfig = {
    // securityJsCode: '您的密钥',
    serviceHost: AMapProxyHost
  }
  const key = '您的key'
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&plugin=AMap.PlaceSearch`
    script.onload = function() {
      var scriptMain = document.createElement('script')
      scriptMain.type = 'text/javascript'
      scriptMain.src = `https://webapi.amap.com/ui/1.1/main.js`
      document.head.appendChild(scriptMain)
      scriptMain.onload = function() {
        resolve()
      }
    }
    document.head.appendChild(script)
  })
}

export const removeAMap = function(str = 'webapi') {
  const scriptTags = document.querySelectorAll('script')
  scriptTags.forEach((scriptTag) => {
    if (scriptTag.src.includes(str)) {
      scriptTag.parentNode.removeChild(scriptTag)
    }
  })
}
```

这个js的用途是动态添加页面的scipt标签以及移除

页面使用

```vue
<mapDialog ref="mapDialog" v-model="addressInfo" :place.sync="form.receiverAddress" @handConfirm="handConfirm" />
```

