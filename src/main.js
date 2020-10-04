import Vue from 'vue'
import App from './App.vue'
import store from './store'

import '@/assets/scss/main.scss'
import '@/assets/scss/grid.scss'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { MdToolbar, MdButton, MdTable, MdCard, MdIcon, MdField } from 'vue-material/dist/components'

Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdTable)
Vue.use(MdCard)
Vue.use(MdIcon)
Vue.use(MdField)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
