import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/index'),
      meta: {
        pageTitle: '文章列表'
      }
    },
    {
      path: '/page1',
      name: 'page1',
      component: require('@/components/page1/index'),
      meta: {
        pageTitle: 'page1'
      },
      children: [{
        path: 'hello',
        name: 'page1/hello',
        component (resolve) {
          require(['@/components/page1/hello'], resolve)
        },
        meta: {
          pageTitle: 'page1/hello'
        }
      }]
    },
    {
      path: '*',
      name: 'page404',
      component: require('@/components/404/'),
      meta: {
        pageTitle: '404'
      }
    }
  ]
})
