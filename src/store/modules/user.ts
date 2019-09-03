import Vue from 'vue'
import Vuex, {Commit, StoreOptions} from 'vuex'
import {SET_USER_TOKEN} from '../mutation-types'
Vue.use(Vuex)

interface UserState {
  token: string
}

const user = {
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    [SET_USER_TOKEN](state: UserState, token: string) {
      state.token = token
    }
  },
  actions: {}
}

export default user
