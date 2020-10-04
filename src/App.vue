<template>
  <div id="app">
    <navbar/>
    <div class="main">
      <v-table 
        table-title="Star Wars Vehicles" 
        :data="localData"
        :sorting-options="sort"
        @updateSorting="updateSorting" />
    </div>
    <div class="container">
      <v-paginator 
        :count="count"
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
export default {
  components: {
    Navbar,
    VTable,
    VPaginator
  },
  methods: {
    ...mapActions(['GET_DATA']),
    ...mapMutations(['UPDATE_SORTING']),
    updateSorting({ id, type }) {
      this.UPDATE_SORTING({ id, type })
    },
    selectPage(page) {
      this.GET_DATA({
        type: 'page',
        page
      })
    }
  },
  computed: {
    ...mapState(['count', 'next', 'previous', 'sort']),
    ...mapGetters(['localData'])
  },
  async mounted() {
    await this.GET_DATA({
      type: 'regular'
    })
  }
}
</script>