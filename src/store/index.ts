import Vue from 'vue'
import Vuex from 'vuex'
// modules
import base from './modules/base'
Vue.use(Vuex)
export interface rootState {
  [key: string]: any
}
export default new Vuex.Store({
  state: () => {
    const initState: rootState = {}
    return initState
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    base
  }
})
