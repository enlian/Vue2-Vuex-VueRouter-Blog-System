<template>
  <div>
    <vHeader></vHeader>
    <el-row :gutter="20" type="flex" justify="center">
      <vLeftBar></vLeftBar>
      <vBlogList></vBlogList>
    </el-row>
    <vFooter></vFooter>
  </div>
</template>

<script>
  import vHeader from './header.vue'
  import vFooter from './footer.vue'
  import vLeftBar from './leftBar.vue'
  import vBlogList from './blogList.vue'

  export default {
    name: 'index',
    components: {vHeader, vFooter, vLeftBar, vBlogList}
  }
</script>


<style scoped>

</style>
