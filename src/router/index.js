import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '../views/ArticleList.vue';
import Admin from '../views/Admin.vue';
import CategoryAdmin from '../views/CategoryAdmin.vue';
import ArticleDetail from '../views/ArticleDetail.vue';

const routes = [
  {
    path: '/',
    name: 'ArticleList',
    component: ArticleList,
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true, // 将 id 作为 prop 传递给 ArticleDetail 组件
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/category-admin',
    name: 'CategoryAdmin',
    component: CategoryAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
