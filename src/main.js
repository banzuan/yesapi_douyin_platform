import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/style/index.scss'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/element-#FBAB1A/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

