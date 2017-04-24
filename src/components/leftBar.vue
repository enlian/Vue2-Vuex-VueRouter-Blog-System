<template>
  <el-col :lg="2">
    <el-menu mode="vertical">
      <el-menu-item-group title="操作">
        <el-menu-item index="1"><i class="el-icon-edit" @click="addBlog"></i>写博文</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-message"></i>我的博文</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-message"></i>所有博文</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-col>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'leftBar',
    computed: mapState([
      'userInfo'
    ]),
    methods : {
      addBlog:function () {
        if(this.userInfo.isLogin){

        }else{
          this.$store.commit('showLoginDialog')
        }
      }
    }
  }
</script>
