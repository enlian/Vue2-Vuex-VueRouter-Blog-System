import Vue from 'vue'
import App from './App'
import router from './router'
import commonJs from './assets/common.js'


// mock数据
import '../mock/index.js'

Vue.prototype.$http = axios
Vue.config.productionTip = false

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
    blogList: []
  },
  actions: {
    getBlogList ({commit}) {
      axios.get('/api/getBlogList')
        .then(function (res) {
          commit({
            type: 'getBlogList',
            blogList: res.data
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
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
    getBlogList(state, payload){
      state.blogList = payload.blogList
    },
    addBlog(state, payload){
      state.blogList.unshift(payload.data)
    },
    blogFilter(state,payload){
      if(payload.data.field == 'userName'){
        if(payload.data.value == 'my'){
          let temp = []
          for(let i = 0;i<state.blogList.length;i++){
            if(state.blogList[i].userInfo.userName == state.userInfo.userName){
              temp.push(state.blogList[i])
            }
          }
          state.blogList = temp
        }
      }
    }
  }
})

//初始化博客列表数据
store.dispatch('getBlogList')

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})


