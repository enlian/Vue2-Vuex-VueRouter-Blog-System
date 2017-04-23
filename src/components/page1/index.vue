<template>
  <div>
    <vHeader></vHeader>
    page1 index
    <router-view></router-view>
    <vFooter></vFooter>
  </div>
</template>

<script>
  import vHeader from '../header.vue'
  import vFooter from '../footer.vue'

  export default {
    components: {vHeader, vFooter}
  }
</script>

