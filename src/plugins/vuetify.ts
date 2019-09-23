import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const Scroll = require('vuetify/lib/directives')

Vue.use(Vuetify, {
  directives: {
    Scroll
  }
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})
