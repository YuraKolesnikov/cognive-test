import Vue from 'vue'
import App from './App.vue'
import store from './store'

import '@/assets/scss/main.scss'
import '@/assets/scss/grid.scss'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { MdToolbar, MdButton, MdTable, MdCard, MdIcon, MdField, MdContent } from 'vue-material/dist/components'

Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdTable)
Vue.use(MdCard)
Vue.use(MdIcon)
Vue.use(MdField)
Vue.use(MdContent)

import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce, {
  listenTo: 'input',
  defaultTime: '1000ms'
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
