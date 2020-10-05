import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'

import { api } from '@/services/api'
import { customSort } from '@/utils/sort'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: null,
    currentPage: 1,
    data: null,
    sort: {
      ascending: true,
      id: null,
      type: null
    },
    filter: {
      key: 'name',
      value: ''
    }
  },
  mutations: {
    SAVE_DATA: (state, { count, results }) => {
      state.count     = count
      state.data      = [ ...results ]
    },
    UPDATE_SORTING: (state, id) => {
      state.sort.ascending = !state.sort.ascending
      state.sort.id = id
    },
    SET_PAGE: (state, page) => state.currentPage = page,
    UPDATE_FILTER: (state, { key, value }) => state.filter[key] = value
  },
  actions: {
    GET_DATA: async ({ state, commit }, { type = 'regular', page = 1 }) => {
      switch (type) {
        case 'next':
          commit('SET_PAGE', ++state.currentPage)
          break;
        case 'previous':
          commit('SET_PAGE', --state.currentPage)
          break
        case 'page':
          commit('SET_PAGE', page)
        default:
          break;
      }

      const payload = {
        page: state.currentPage,
        /* Do not create 'search' key-value pair if state.filter.value is empty (to avoid this kind of string - /?page=1&search=) */
        ...(!state.filter.value ? {} : { search: state.filter.value })
      }
      
      const response = await api.get(`?${qs.stringify(payload)}`)

      commit('SAVE_DATA', response.data)
    },
  },
  getters: {
    localData: state => {
      let data
      /* Check if there is a filter value and prevent filtering by name */
      if (state.filter.value && state.filter.key !== 'name') {
        data = state.data.filter(item => item[state.filter.key].match(state.filter.value))
      } else {
        data = state.data
      }
      
      if (state.data !== null) {
        data.sort(customSort(state.sort))
      }

      return data
    } 
  }
})
