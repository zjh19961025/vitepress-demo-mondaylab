## 官方文档地址

```
https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html 
```

## 实现代码

- 页面部分

  ```vue
  <template>
    <div class="container">
      <template v-if="isMobile">
        <div class="mp-link-text">正在打开 “荷塔”...</div>
        <div class="mp-btn" @click="openWeapp">打开小程序</div>
      </template>
      <div v-else>请在手机打开链接</div>
    </div>
  </template>
  
  <script setup>
  import { useH5ToMp } from './useH5ToMp.ts'
  import { HERTHA_APP_PATH } from '../app-config.js'
  const { isMobile, openWeapp } = useH5ToMp({
    appName: 'hertha',
    appPath: HERTHA_APP_PATH
  })
  </script>
  
  <style lang="scss" scoped>
  .container{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mp-link-text{
    }
    .mp-btn{
      background: #07c160;
      padding: 8px 24px;
      font-weight: 700;
      font-size: 17px;
      border-radius: 4px;
      color: #fff;
      width: 184px;
      text-align: center;
      margin-top: 100px;
    }
  }
  </style>
  
  ```

- hooks部分

  ```ts
  import { ref } from 'vue'
  import { APP_ID, MP_TYPE } from '../app-config.js'
  import useUrlParams from '../../hooks/useParams'
  import { testUtils } from '@hua5/hua5-utils'
  export const useH5ToMp = ({ appName, appPath = {}})=> {
    const isMobile = ref(false)
    const { paramsObj } = useUrlParams()
    const mpType = ref(0)
    const mpPath = ref('')
    const mpQuery = ref({ ...paramsObj })
    // 获取小程序类型
    // @ts-ignore
    mpType.value = paramsObj.mp_type || 0
    // 获取小程序路径
    if (paramsObj && paramsObj.t && appPath[paramsObj.t]) {
      mpPath.value = appPath[paramsObj.t]
    }
    // 删除非跳转参数
    delete mpQuery.value.type
    delete mpQuery.value.mp_type
  
    console.log('paramsObj', paramsObj, mpPath.value, mpQuery.value)
  
    function docReady(fn) {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        fn()
      } else {
        document.addEventListener('DOMContentLoaded', fn)
      }
    }
    docReady(function() {
      if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i)) {
        isMobile.value = true
      }
      isMobile.value && openWeapp()
    })
  
    function openWeapp() {
      let path = mpPath.value + '&'
      if (testUtils.isNotEmpty(mpQuery.value)) {
        const query = Object.keys(mpQuery.value).map(key=> `${key}=${mpQuery.value[key]}`).join('&')
        path += 'query=' + query
        path += '&'
      }
      path += `env_version=${MP_TYPE[mpType.value]}`
      console.info('🚀 ~ file:page method:openWeapp line:35 -----', `weixin://dl/business/?appid=${APP_ID[appName]}&path=${path}`)
      location.href = `weixin://dl/business/?appid=${APP_ID[appName]}&path=${path}`
    }
  
    return {
      openWeapp,
      isMobile
    }
  }
  ```

  