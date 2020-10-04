<template>
  <div id="app">
    <navbar/>
    <div class="main">
      <v-table table-title="Star Wars Vehicles" :data="data" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Navbar from '@/components/Navbar'
import VTable from '@/components/VTable'
export default {
  components: {
    Navbar,
    VTable
  },
  methods: {
    ...mapActions(['GET_DATA'])
  },
  computed: {
    ...mapState(['count', 'next', 'previous', 'data'])
  },
  mounted() {
    this.GET_DATA({
      type: 'regular'
    })
  }
}
</script>