import Vue from 'vue'
import App from './App'
import router from './router'
import commonJs from './assets/common.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// mock数据
import '../mock/index.js'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

// 全局钩子
router.beforeEach((to, from, next) => {
  typeof to.meta.pageTitle !== undefined && commonJs.setDocumentTitle(to.meta.pageTitle)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
