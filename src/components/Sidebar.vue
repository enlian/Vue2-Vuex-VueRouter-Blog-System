<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    permanent
    class="navigation-drawer"
  >
    <!-- 侧边栏 Logo -->
    <v-list-item class="px-2">
      <template v-slot:title>
        <router-link to="/dashboard" class="logo">管理システム</router-link>
      </template>
    </v-list-item>

    <!-- 欢迎用户 -->
    <v-list-item class="welcome">
      <template v-slot:title>
        欢迎, {{ username }}
      </template>
    </v-list-item>

    <!-- 导航链接 -->
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in navItems"
        :key="i"
        :to="item.to"
        router
        exact
        class="nav-item"
        active-class="v-list-item--active"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <template v-slot:title>
          {{ item.title }}
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- 登录/退出功能 -->
    <v-btn @click="logout" variant="text" v-if="isLoggedIn" class="logout-bth">
        <v-icon left>mdi-logout</v-icon> 退出
      </v-btn>
    
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true, // 控制侧边栏的开关
      isLoggedIn: localStorage.getItem('isLoggedIn'), // 检查登录状态
      username: localStorage.getItem('isLoggedIn') || '用户', // 获取用户名
      navItems: [
        { title: '文章管理', to: '/dashboard/article-admin', icon: 'mdi-file-document-outline' },
        { title: '栏目管理', to: '/dashboard/category-admin', icon: 'mdi-view-list-outline' },
        { title: '人员管理', to: '/dashboard/user-admin', icon: 'mdi-account-outline' },
        { title: '权限分配', to: '/dashboard/permission-admin', icon: 'mdi-shield-outline' },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('isLoggedIn'); // 清除登录状态
      localStorage.removeItem('username'); // 清除用户名
      this.$router.push('/login'); // 跳转到登录页面
    },
  },
};
</script>

<style scoped>
.navigation-drawer {
  background-color: #f8f9fa;
}

.logo {
  color: #333;
  text-decoration: none;
  font-size: 24px;
  text-align: left;
  width: 100%;
  display: block;
  margin-left: 8px;
}
.welcome{
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
  div{
    font-size: 15px;
  }
}

.nav-item {
  transition: background-color 0.3s;
  font-size:1em !important;
}
.v-list-item--active {
  background-color: #f1f1f1 !important; /* 激活状态背景色 */
  font-weight: bold;
}

.logout-bth{
  margin: 15px 0 0 5px;
  i{
    margin-right: 5px;
  }
}
</style>
