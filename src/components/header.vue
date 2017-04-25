<template>
  <el-row :gutter="10">
    <nav class="navbar navbar-default">
      <div class="container-fluid">

        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mobile-nav" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">System</a>
        </div>

        <div class="collapse navbar-collapse" id="mobile-nav">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">首页 <span class="sr-only">(current)</span></a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" v-if="userInfo.isLogin">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> {{form.userName}} <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a @click="logout"><i class="fa fa-sign-out">退出</i></a></li>
              </ul>
            </li>
          </ul>

          <form class="navbar-form navbar-right" v-if="!userInfo.isLogin">
            <button type="button" class="btn btn-primary" @click="showLoginDialog">登录</button>
          </form>

        </div>
      </div>
    </nav>



    <!-- 登录Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">登录</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                  <input type="text" v-model="form.userName" class="form-control" id="inputEmail3" placeholder="无需密码">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="loginConfirm">登录</button>
          </div>
        </div>
      </div>
    </div>

  </el-row>


</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'header',
    data: function () {
      return {
        form: {
          userName: ''
        }
      }
    },
    computed: mapState([
      'userInfo'
    ]),
    methods: {
      showLoginDialog: function () {
        $('#loginModal').modal('show')
      },
      loginConfirm: function () {
        if (this.form.userName == '') {
          this.$notify.error({
            title: '错误',
            message: '请输入用户名！',
            offset: 70
          });
        } else {
          $('#loginModal').modal('hide')
          this.$store.commit({
            type: 'login',
            userName: this.form.userName
          })
          this.$notify.info({
            title: '消息',
            message: '登录成功！',
            offset: 70
          });
        }
      },
      logout: function () {
        this.$store.commit('logout')
        this.form.userName = ''
        this.$notify.info({
          title: '消息',
          message: '登出成功！',
          offset: 70
        });
      }
    }
  }
</script>


<style scoped>
  a:-webkit-any-link {
    text-decoration: none
  }

  .login-btn {
    margin: 12px 20px 0 0;
    float: right
  }
</style>
