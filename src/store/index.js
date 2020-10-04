import Vue from 'vue'
import Vuex from 'vuex'

import { api } from '@/services/api'

import { customSort } from '@/utils/sort'
import { normalize } from '@/utils/normalize'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: null,
    currentPage: 1,
    next: null,
    previous: null,
    data: null,
    sort: {
      ascending: true,
      id: null,
      type: null
    }
  },
  mutations: {
    SAVE_DATA: (state, { count, next, previous, results }) => {
      state.count     = count
      state.next      = next
      state.previous  = previous
      state.data      = [ ...results ]
    },
    UPDATE_SORTING: (state, id) => {
      state.sort.ascending = !state.sort.ascending
      state.sort.id = id
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
      response.data.results.forEach(item => normalize(item))

      commit('SAVE_DATA', response.data)
    },
  },
  getters: {
    localData: state => {
      if (state.data !== null) {
        return state.data.sort(customSort(state.sort))
      }
    } 
  }
})
