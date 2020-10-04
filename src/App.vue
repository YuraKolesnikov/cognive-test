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
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Navbar from '@/components/Navbar'
import VTable from '@/components/VTable'
export default {
  components: {
    Navbar,
    VTable
  },
  methods: {
    ...mapActions(['GET_DATA']),
    ...mapMutations(['UPDATE_SORTING']),
    updateSorting({ id, type }) {
      this.UPDATE_SORTING({ id, type })
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