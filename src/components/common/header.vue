<template>
  <div class="top-nav">
    <el-menu theme="dark" default-active="/" class="el-menu-demo" mode="horizontal" :router=true>
      <el-menu-item index="/"><i class="fa fa-home"> 首页</i></el-menu-item>
      <el-submenu index="2" v-if="isLogin">
        <template slot="title"><i class="fa fa-user"> {{form.userName}}</i></template>
        <el-menu-item index="2-1"><i class="fa fa-sign-out"> 退出</i></el-menu-item>
      </el-submenu>

      <el-button class="login-btn" type="primary" @click="loginDialogVisible = true" v-if="!isLogin"><i class="fa fa-user"> 登录</i>
      </el-button>
    </el-menu>

    <!--登录弹窗-->
    <el-dialog title="登录" v-model="loginDialogVisible" size="tiny1">
      <el-form :model="form" :inline=true>
        <el-form-item label="用户名：">
          <el-input v-model="form.userName" auto-complete="off" placeholder="无需密码，随便输入" icon="edit"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">确 定</el-button>
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
        loginDialogVisible:false
      }
    },
    methods: {
      login: function () {
        this.loginDialogVisible = false
        this.isLogin = true
        console.log(this.form.userName)
      }
    }
  }
</script>


<style scoped>
  .top-nav{margin-bottom: 20px}
  a:-webkit-any-link {
    text-decoration: none
  }

  .login-btn {
    margin: 12px 20px 0 0;
    float: right
  }
</style>
