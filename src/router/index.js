import { createRouter, createWebHistory } from 'vue-router'; // 正确的导入方式
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import ArticleAdmin from '../views/ArticleAdmin.vue';
import CategoryAdmin from '../views/CategoryAdmin.vue';
import UserAdmin from '../views/UserAdmin.vue';
import PermissionAdmin from '../views/PermissionAdmin.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login, // 主页和登录页面共用同一个组件
  },
  {
    path: '/login',
    name: 'login',
    component: Login, // 同样是登录页面
  },
  {
    path: '/dashboard',
    component: Dashboard,  // 后台管理主页面
    meta: { requiresAuth: true },  // 需要验证身份的路由
    children: [
      {
        path: '',
        redirect: '/dashboard/article-admin',  // 当访问 /dashboard 时重定向到 article-admin
      },
      {
        path: 'article-admin',
        name: 'article-admin',
        component: ArticleAdmin,
      },
      {
        path: 'category-admin',
        name: 'category-admin',
        component: CategoryAdmin,
      },
      {
        path: 'user-admin',
        name: 'user-admin',
        component: UserAdmin,
      },
      {
        path: 'permission-admin',
        name: 'permission-admin',
        component: PermissionAdmin,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由，替代原来的 "*"
    redirect: '/', // 重定向到主页
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // Vue 3 中使用 createWebHistory
  routes,
});

// 路由守卫：检查用户是否登录
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log('Is Logged In:', isLoggedIn); // 调试信息

  // 如果访问的是需要验证身份的页面，且用户未登录，跳转到登录页
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ path: '/' }); // 如果未登录，跳转到首页（即登录页）
  } 
  // 如果访问的是登录页面，且用户已经登录，则跳转到管理后台
  else if (to.path === '/login' && isLoggedIn) {
    next({ path: '/dashboard' }); // 如果已经登录，访问登录页时直接跳转到后台
  } 
  // 继续访问
  else {
    next();
  }
});
export default router;
