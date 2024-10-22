<template>
    <v-app>
      <!-- 侧边栏 -->
      <Sidebar />
      <!-- 主内容区域 -->
      <v-main>
        <router-view></router-view> <!-- 显示后台子页面的内容 -->
      </v-main>
    </v-app>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue'; // 导入侧边栏
  
  export default {
    name: 'Dashboard',
    components: {
      Sidebar,
    },
  };
  </script>
  