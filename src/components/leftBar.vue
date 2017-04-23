<template>
  <el-col :lg="2">
    <el-menu mode="vertical">
      <el-menu-item-group title="操作">
        <el-menu-item index="1"><i class="el-icon-edit"></i>写博文</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-message"></i>我的博文</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-message"></i>所有博文</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    name:'leftBar'
  }
</script>
