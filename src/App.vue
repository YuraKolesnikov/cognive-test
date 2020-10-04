<template>
  <div id="app">
    <navbar/>
    <div class="main">
      Count: {{ count }}<br>
      Next: {{ next }}<br>
      Prev: {{ previous }}
      Data: {{ data }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
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