import Vue from 'vue'
import App from './App'
import router from './router'
import commonJs from './assets/common.js'
import axios from 'axios'
// mock数据
import '../mock/index.js'
Vue.prototype.$http = axios;
Vue.config.productionTip = false

//全局钩子
router.beforeEach((to, from, next) => {
  typeof to.meta.pageTitle !== undefined && commonJs.setDocumentTitle(to.meta.pageTitle);
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
