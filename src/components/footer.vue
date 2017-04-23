<template>
  <el-row :span="24" :offset="0" class="footer">
    <p>技术栈：Vue2 + Vue-router + Webpack + ElementUI</p>
    <p>Code by Song , 651754835@qq.com</p>
  </el-row>
</template>

<script>
  export default {
    name: 'footer'
  }
</script>


<style scoped>
.footer{margin-top: 50px;text-align: center;border-top: 1px solid #eef1f6;padding-top: 20px}
.footer p{color: #adadad;font-size: 12px}
</style>
