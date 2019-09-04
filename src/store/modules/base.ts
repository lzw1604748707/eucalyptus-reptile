import Vue from 'vue'
import Vuex, {Module} from 'vuex'
Vue.use(Vuex)
import store from '../index'
import {SET_USER_TOKEN} from '../mutation-types'
import {rootState} from '../index'
interface BaseState {
  token: string
}

const base: Module<BaseState, rootState> = {
  namespaced: true,
  state: {
    token: 'I-am-token-of-state'
  },
  getters: {},
  mutations: {
    [SET_USER_TOKEN](state: BaseState, token: string) {
      state.token = token
    }
  },
  actions: {}
}

export default base
