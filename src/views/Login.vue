<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <!-- 大 Logo -->
        <v-card class="pa-5" elevation="10">
          <div class="text-center mb-5">
            <h1 class="text-center font-weight-bold logo">VUEコンテンツ管理システム</h1>
          </div>

          <!-- 登录表单 -->
          <v-card-text>
            <v-form @keydown.enter="login"> <!-- 监听回车键 -->
              <v-text-field v-model="loginForm.username" label="用户名" prepend-icon="mdi-account" outlined
                required></v-text-field>
              <v-text-field v-model="loginForm.password" label="密码" prepend-icon="mdi-lock" type="password" outlined
                required></v-text-field>
            </v-form>
          </v-card-text>

          <!-- 测试账户信息 -->
          <div class="text-center mb-2 test-account">
            <i v-if="errorMessage" style="color: red;font-size: smaller;">
              {{ errorMessage + " " }}
            </i>
            User: <strong>admin</strong>&nbsp;&nbsp;&nbsp;&nbsp;Password: <strong>admin123</strong>
          </div>

          <!-- 登录按钮 -->
          <v-row justify="center" align="center" class="btn">
            <v-btn @click="login">登录</v-btn>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      errorMessage: '' // 用于存储错误提示信息
    };
  },
  created() {
    const token = localStorage.getItem('isLoggedIn');
    if (token) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    login() {
      // 去除用户名和密码前后的空格
      const username = this.loginForm.username.trim();
      const password = this.loginForm.password.trim();

      // 检查用户名和密码是否完整
      if (!username || !password) {
        this.errorMessage = '请输入用户名和密码';
        return;
      }

      // 模拟登录逻辑
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', username); // 存储登录状态
        this.errorMessage = '';
        this.$router.push('/dashboard'); // 登录成功后跳转到管理后台
      } else {
        this.errorMessage = '用户名或密码错误'; // 显示错误信息
      }
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 20px 0 15px 0;
}

.fill-height {
  height: 100vh;
  margin-top: 60px;
}

.logo {
  font-size: 24px;
  color: #666;
}

.v-card {
  background-color: white;
  border-radius: 15px;
}

.test-account {
  color: #888;
  font-size: 14px;
  margin-top: -20px;
}
</style>
