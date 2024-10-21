<template>
    <div>
      <!-- 自定义模态框的背景遮罩 -->
      <div v-if="showLogin" class="modal-overlay" @click="closeLogin"></div>
  
      <!-- 自定义模态框 -->
      <div v-if="showLogin" class="modal">
        <div class="modal-content">
          <h2>登录</h2>
          <form @submit.prevent="login">
            <label for="username">用户名</label>
            <input id="username" v-model="loginForm.username" type="text" required />
            
            <label for="password">密码</label>
            <input id="password" v-model="loginForm.password" type="password" required />
  
            <div class="modal-actions">
              <button type="button" @click="closeLogin">取消</button>
              <button type="submit" class="login-btn">登录</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showLogin: Boolean, // 父组件传递的状态
      onLoginSuccess: Function, // 父组件传递的回调函数
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
        this.onLoginSuccess(this.loginForm.username);
        this.closeLogin();
      },
      closeLogin() {
        this.$emit('update:showLogin', false); // 通知父组件关闭模态框
      }
    }
  };
  </script>
  
  <style scoped>
  /* 模态框背景遮罩 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  /* 模态框主体 */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 300px;
  }
  
  .modal-content h2 {
    margin: 0 0 15px 0;
  }
  
  /* 表单样式 */
  .modal-content input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .modal-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .modal-actions .login-btn {
    background-color: #007bff;
    color: white;
  }
  
  .modal-actions button:hover {
    opacity: 0.9;
  }
  </style>
  