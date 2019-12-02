import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  username: '',
  code: '',
  current_id: {}
}

export default new Vuex.Store({
  state,
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setCode (state, code) {
      state.code = code
    },
    setCurrent_id (state, id) {
      state.current_id = id
    },
  },
  actions: {
  },
  modules: {
  }
})
