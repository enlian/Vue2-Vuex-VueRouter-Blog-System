<template>
  <div>
    <vHeader></vHeader>
    page1 index
    <router-view></router-view>
    <vFooter></vFooter>
  </div>
</template>

<script>
  import vHeader from '../common/header.vue'
  import vFooter from '../common/footer.vue'

  export default {
    components: {vHeader, vFooter}
  }
</script>

