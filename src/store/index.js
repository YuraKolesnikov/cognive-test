import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'

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
    },
    filter: {
      key: 'name',
      value: ''
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
    },
    SET_PAGE: (state, page) => state.currentPage = page,
    PREV_PAGE: state => state.currentPage -= 1,
    NEXT_PAGE: state => state.currentPage += 1,
    UPDATE_FILTER_KEY: (state, key) => state.filter.key = key,
    UPDATE_FILTER_VAL: (state, val) => state.filter.value = val
  },
  actions: {
    GET_DATA: async ({ state, commit }, { type = 'regular', page = 1 }) => {
      switch (type) {
        case 'next':
          commit('NEXT_PAGE')
          break;
        case 'previous':
          commit('PREV_PAGE')
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
      response.data.results.forEach(item => normalize(item))

      commit('SAVE_DATA', response.data)
    },
  },
  getters: {
    localData: state => {
      let data
      /* Check if there is a filter value and prevent filtering by name */
      if (!!state.filter.value && state.filter.key !== 'name') {
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
