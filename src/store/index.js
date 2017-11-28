import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const state = {
  ws_connected: false,
  servers: [],
  queues: [],
  selectedQueue: '',
  dragMember: null,
  qnameFilter: '',
  loading: 0,
  pagination: {
    perPage: 9,
    currentPage: 1
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
