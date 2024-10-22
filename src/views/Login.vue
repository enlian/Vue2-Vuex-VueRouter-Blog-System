<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <!-- 大 Logo -->
        <v-card class="pa-5" elevation="10">
          <div class="text-center mb-5">
            <h1 class="text-center font-weight-bold logo">コンテンツ管理システム</h1>
          </div>

          <!-- 登录表单 -->
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="loginForm.username"
                label="用户名"
                prepend-icon="mdi-account"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="loginForm.password"
                label="密码"
                prepend-icon="mdi-lock"
                type="password"
                outlined
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <!-- 测试账户信息 -->
          <div class="text-center mb-2 test-account">
            Test Account: <strong>admin</strong>  Password: <strong>admin123</strong>
          </div>

          <!-- 登录按钮 -->
          <v-card-actions class="justify-center">
            <v-btn color="primary" rounded large @click="login">登录</v-btn>
          </v-card-actions>
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
      }
    };
  },
  methods: {
    login() {
      // 允许任何用户名和密码登录
      if (this.loginForm.username && this.loginForm.password) {
        localStorage.setItem('isLoggedIn', this.loginForm.username); // 存储登录状态
        this.$router.push('/dashboard'); // 登录成功后跳转到管理后台
      } else {
        this.$message.error('请输入用户名和密码');
      }
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.logo {
  font-size: 24px;
  color: #666;
}

.v-card {
  background-color: white;
  border-radius: 15px;
}

.v-card-actions {
}

.test-account {
  color: #888; /* 设置灰色字体 */
  font-size: 14px;
}
</style>
