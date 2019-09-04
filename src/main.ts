import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'
import callApi from '@/api/index'
import store from '@/store/index'

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
