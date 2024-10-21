<template>
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
  </template>
  
  <script>
  export default {
    props: {
      showLogin: Boolean, // 从父组件传递的登录状态
      onLoginSuccess: Function, // 父组件传递的登录成功回调函数
    },
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
        // 模拟登录成功
        this.onLoginSuccess(this.loginForm.username);
        this.closeLogin();
      },
      closeLogin() {
        // 通知父组件关闭模态框
        this.$emit('update:showLogin', false);
      }
    }
  };
  </script>
  