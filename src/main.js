import Vue from 'vue'
import App from './App'
import router from './router'
import commonJs from './assets/common.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-default/index.css'

// mock数据
import '../mock/index.js'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

// 全局钩子
router.beforeEach((to, from, next) => {
  typeof to.meta.pageTitle !== undefined && commonJs.setDocumentTitle(to.meta.pageTitle)
  next()
})

const store = new Vuex.Store({
  state: {
    userInfo: {
      isLogin: false,
      userName: ''
    },
    count: 0
  },
  mutations: {
    login (state, payload) {
      state.userInfo = {
        isLogin: true,
        userName: payload.userName
      }
    },
    logout (state) {
      state.userInfo = {
        isLogin: false,
        userName: ''
      }
    },
    add (state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})


