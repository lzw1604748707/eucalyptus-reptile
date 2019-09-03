import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
Vue.use(Vuex)

interface BaseState {
  menuList: []
}

const base: StoreOptions<BaseState> = {
  state: {
    menuList: []
  },
  getters: {},
  mutations: {
    updateMenuList(state: any, menuList: []) {
      state.menuList = menuList
    }
  },
  actions: {}
}

export default base
