import Vue from 'vue'
import Vuex from 'vuex'

import { api } from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: null,
    next: null,
    previous: null,
    data: null
  },
  mutations: {
    SAVE_DATA: (state, { count, next, previous, results }) => {
      state.count     = count
      state.next      = next
      state.previous  = previous
      state.data      = results
    }
  },
  actions: {
    GET_DATA: async ({ state, commit }, { type = 'regular', page = 1 }) => {
      const requestTypes = {
        'next': state.next,
        'previous': state.previous,
        'page': `https://swapi.dev/api/vehicles/?page=${page}`,
        'regular': 'https://swapi.dev/api/vehicles'
      }
      
      const response = await api.get(requestTypes[type])
      commit('SAVE_DATA', response.data)
    },
  },
  getters: {

  }
})
