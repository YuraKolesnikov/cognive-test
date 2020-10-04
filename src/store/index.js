import Vue from 'vue'
import Vuex from 'vuex'

import { api } from '@/services/api'

import { sortByInteger, sortByString } from '@/utils/sort'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: null,
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
      state.data      = results
    },
    UPDATE_SORTING: (state, { id, type }) => {
      state.sort.ascending = !state.sort.ascending
      state.sort.id = id
      state.sort.type = type
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
    localData: state => {
      if (state.data !== null) {
        return state.sort.type == 'number'
        ? state.data.sort(sortByInteger(state.sort))
        : state.data.sort(sortByString(state.sort))
      }
    } 
  }
})
