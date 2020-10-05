<template>
  <div id="app">
    <navbar/>
    <div class="main">
      <v-filter 
        @input="search" 
        @change="updateFilter"  
        :value="filter.value"
        :current-value="filter.key" />
      <v-table 
        table-title="Star Wars Vehicles" 
        :data="localData"
        :sorting-options="sort"
        @updateSorting="UPDATE_SORTING" />
    </div>
    <div class="container">
      <v-paginator 
        :count="count"
        :current-page="currentPage"
        @selectPage="selectPage" 
        @prevPage="GET_DATA({ type: 'previous' })" 
        @nextPage="GET_DATA({ type: 'next' })" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Navbar from '@/components/Navbar'
import VTable from '@/components/VTable'
import VPaginator from '@/components/VPaginator'
import VFilter from '@/components/VFilter'
export default {
  components: {
    Navbar,
    VTable,
    VPaginator,
    VFilter
  },
  methods: {
    ...mapActions(['GET_DATA']),
    ...mapMutations(['UPDATE_SORTING', 'UPDATE_FILTER']),
    selectPage(page) {
      this.GET_DATA({
        type: 'page',
        page
      })
    },
    updateFilter(value) {
      this.UPDATE_FILTER({ key: 'key', value })
      this.UPDATE_FILTER({ key: 'value', value: '' })
    },
    search(value) {
      this.UPDATE_FILTER({ key: 'value', value })
      if (this.filter.key == 'name') {
        /* Request */
        this.GET_DATA({
          type: 'regular'
        })
      } 
    }
  },
  computed: {
    ...mapState(['count', 'next', 'previous', 'sort', 'filter', 'currentPage']),
    ...mapGetters(['localData'])
  },
  async mounted() {
    await this.GET_DATA({
      type: 'regular'
    })
  }
}
</script>