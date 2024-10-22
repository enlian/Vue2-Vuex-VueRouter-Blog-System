<template>
  <v-app-bar app>
    <!-- 左侧的 Logo -->
    <v-toolbar-title>
      <router-link to="/" class="logo">Light Blog</router-link>
    </v-toolbar-title>

    <!-- 导航链接 -->
    <v-spacer></v-spacer>
    <router-link
      to="/"
      class="nav-link"
      :class="{ active: $route.path === '/' }"
    >
      <v-btn text :color="$route.path === '/' ? 'primary' : ''">首页</v-btn>
    </router-link>
    <router-link
      to="/article-admin"
      class="nav-link"
      :class="{ active: $route.path === '/article-admin' }"
    >
      <v-btn text :color="$route.path === '/article-admin' ? 'primary' : ''">文章管理</v-btn>
    </router-link>
    <router-link
      to="/category-admin"
      class="nav-link"
      :class="{ active: $route.path === '/category-admin' }"
    >
      <v-btn text :color="$route.path === '/category-admin' ? 'primary' : ''">栏目管理</v-btn>
    </router-link>

    <!-- 登录/退出功能 -->
    <v-btn v-if="!isLoggedIn" @click="handleLoginClick" color="primary" outlined>登录</v-btn>
    <div v-else>
      <span>欢迎, {{ username }}</span>
      <v-btn color="error" @click="logout">退出</v-btn>
    </div>

    <!-- 登录模态框 -->
    <v-dialog v-model="showLogin" max-width="400px">
      <v-card>
        <v-card-title class="headline">登录</v-card-title>
        <v-card-text>
          <v-text-field label="用户名" v-model="loginForm.username"></v-text-field>
          <v-text-field label="密码" v-model="loginForm.password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeLogin">取消</v-btn>
          <v-btn color="primary" @click="login">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      showLogin: false,
      username: '', // 保存登录用户名
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLoginClick() {
      this.showLogin = true; // 点击登录按钮时显示模态框
    },
    login() {
      if (this.loginForm.username) {
        this.username = this.loginForm.username;
        this.isLoggedIn = true;
        this.showLogin = false; // 登录成功后隐藏模态框
      } else {
        this.$message.error('请输入用户名');
      }
    },
    closeLogin() {
      this.showLogin = false; // 关闭模态框
    },
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      this.$message.info('已退出登录');
    }
  }
};
</script>

<style scoped>
.logo {
  color: black;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
}

.nav-link {
  color: black;
  text-decoration: none;
  margin-left: 20px;
}

.nav-link.active .v-btn {
  font-weight: bold;
  color: blue;
}

.v-toolbar-title {
  margin-right: auto;
}
</style>
