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
  <div class="avue-map">
    <el-input
      v-model="poi.formattedAddress"
      :placeholder="placeholder"
    >
      <el-button
        slot="append"
        @click="open"
      >{{ textTitle }}</el-button>
    </el-input>

    <el-dialog
      class="avue-map__dialog"
      width="80%"
      append-to-body
      modal-append-to-body
      :title="title"
      :visible.sync="box"
      @close="handleClose"
    >
      <div
        v-if="box"
        class="avue-map__content"
      >
        <el-input
          id="map__input"
          v-model="address"
          class="avue-map__content-input"
          :readonly="disabled"
          clearable
          placeholder="输入关键字选取地点"
          @input="addElementNode"
        />
        <div class="avue-map__content-box">
          <div
            id="map__container"
            class="avue-map__content-container"
            tabindex="0"
          />
          <div
            id="map__result"
            class="avue-map__content-result"
          >
            <h3 class="w100 tc">暂无搜索结果</h3>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="box = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addAMap, removeAMap } from './config'
export default {
  name: 'AvueMap',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
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
    place: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      address: '',
      poi: {},
      marker: null,
      map: null,
      box: false
    }
  },
  computed: {
    longitude() {
      return this.poi.longitude
    },
    latitude() {
      return this.poi.latitude
    },
    title() {
      return this.disabled ? '查看坐标' : '选择坐标'
    },
    textTitle() {
      return this.disabled ? this.title : (this.poi.name === undefined ? '选择地址' : '重新选择')
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
        this.$emit('update:place', this.poi.formattedAddress)
        this.$emit('input', val)
      },
      deep: true
    },
    box: {
      handler() {
        if (this.box) {
          this.$nextTick(() =>
            this.init(() => {
              if (this.longitude && this.latitude) {
                this.addMarker(this.longitude, this.latitude)
                this.getAddress(this.longitude, this.latitude)
              }
              if (this.poi.location) {
                this.addMarker(this.poi.location.lng, this.poi.location.lat)
                this.getAddress(this.poi.location.lng, this.poi.location.lat)
              }
            })
          )
        } else {
          removeAMap()
        }
      },
    }
  },
  methods: {
    addElementNode() {
      const resultDiv = document.getElementById('map__result')
      setTimeout(() => {
        const searchDiv = document.querySelector('.amap_lib_placeSearch')
        if (!searchDiv) {
          resultDiv.innerHTML = `<h3 class="w100 tc">暂无搜索结果</h3>`
        }
      }, 200)
    },
    submitInfo() {
      if (this.testUtils.isNotEmpty(this.poi)) {
        this.$emit('handConfirm', this.poi)
        this.box = false
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
      if (this.marker) {
        this.marker.setMap(null)
        this.marker = null
      }
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
            markerSpan.className = 'avue-map__marker'
            markerSpan.innerHTML = this.poi.formattedAddress
            markerContent.appendChild(markerSpan)
            this.marker.setContent(markerContent) // 更新点标记内容
          }
        })
      })
    },
    handleClose() {
      window.poiPicker.clearSearchResults()
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
        zoom: this.testUtils.isNotEmpty(this.poi) ? 23 : 13,
        center: (() => {
          if (this.longitude && this.latitude) {
            return [this.longitude, this.latitude]
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
        var poiPicker = new PoiPicker({
          input: 'map__input',
          placeSearchOptions: {
            map: this.map,
            pageSize: 10
          },
          searchResultsContainer: 'map__result'
        })
        // 初始化poiPicker
        this.poiPickerReady(poiPicker)
      })
    },
    poiPickerReady(poiPicker) {
      window.poiPicker = poiPicker
      // 选取了某个POI
      poiPicker.on('poiPicked', poiResult => {
        this.clearMarker()
        var source = poiResult.source
        var poi = poiResult.item
        this.poi = Object.assign(poi, {
          formattedAddress: poi.name,
          longitude: poi.location.R,
          latitude: poi.location.P
        })
        if (source !== 'search') {
          poiPicker.searchByKeyword(poi.name)
        }
      })
    },
    open() {
      addAMap().then(() => {
        this.box = true
      })
    }
  }
}
</script>

<style lang="scss">
.amap-icon img,
.amap-marker-content img {
  width: 25px;
  height: 34px;
}
.avue-map {
  &__marker {
    position: absolute;
    top: -20px;
    right: -118px;
    color: #fff;
    padding: 4px 10px;
    box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
    white-space: nowrap;
    font-size: 12px;
    font-family: "";
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

