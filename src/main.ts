import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'
import callApi from '@/api/index'
import store from '@/store/index'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// or with options 也可以直接在这里设置参数
Vue.use(VueLazyload, {
  preLoad: 1.3, //预加载的宽高比
  error: 'public/layout_image.gif', //图片加载失败时使用的图片源
  loading: 'public/layout_image.gif', //图片加载的路径
  attempt: 1 //尝试加载次数
})

import globalComponents from '@/components/globalComponents'
Vue.use(globalComponents)
Vue.prototype.$callApi = callApi

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
