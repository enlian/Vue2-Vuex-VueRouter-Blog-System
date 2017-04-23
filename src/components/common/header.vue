<template>
  <div class="top-nav">
    <el-menu default-active="/" mode="horizontal" :router=true>
      <el-menu-item index="/"><i class="fa fa-home"> 首页</i></el-menu-item>
      <el-submenu index="" v-if="isLogin" class="pull-right">
        <template slot="title"><i class="fa fa-user"> {{form.userName}}</i></template>
        <el-menu-item index="" @click="logout"><i class="fa fa-sign-out"> 退出</i></el-menu-item>
      </el-submenu>
      <el-button class="login-btn" type="primary" @click="loginDialogVisible = true" v-if="!isLogin"><i
        class="fa fa-user"> 登录</i>
      </el-button>
    </el-menu>

    <!--登录弹窗-->
    <el-dialog title="登录" v-model="loginDialogVisible" size="tiny1" top="15%">
      <el-form :model="form" :inline=true>
        <el-form-item label="用户名：">
          <el-input v-model="form.userName" auto-complete="off" placeholder="无需密码，随便输入" icon="edit"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登 录</el-button>
      </el-form>
    </el-dialog>
  </div>


</template>

<script>
  export default {
    name: 'header',
    data: function () {
      return {
        isLogin: false,
        form: {
          userName: ''
        },
        loginDialogVisible: false
      }
    },
    methods: {
      login: function () {
        if (this.form.userName == '') {
          this.$notify.error({
            title: '错误',
            message: '请输入用户名！',
            offset: 80
          });
        } else {
          this.loginDialogVisible = false
          this.isLogin = true
          this.$notify.info({
            title: '消息',
            message: '登录成功！',
            offset: 80
          });
        }
      },
      logout: function () {
        this.isLogin = false
        this.form.userName = ''
        this.$notify.info({
          title: '消息',
          message: '登出成功！',
          offset: 80
        });
      }
    }
  }
</script>


<style scoped>
  .top-nav {
    margin-bottom: 20px
  }

  a:-webkit-any-link {
    text-decoration: none
  }

  .login-btn {
    margin: 12px 20px 0 0;
    float: right
  }
</style>
