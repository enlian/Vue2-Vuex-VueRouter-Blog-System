<template>
  <div>
    <vHeader></vHeader>
    <div v-for="x in data">
      {{ x }}
    </div>
    <vFooter></vFooter>
  </div>
</template>

<script>
  import vHeader from './common/header.vue'
  import vFooter from './common/footer.vue'

  export default {
    name: 'index',
    components: {vHeader, vFooter},
    created: function () {
      var _this = this;
      this.$http.get('/api')
        .then(function (res) {
            console.log(res.data.array)
          _this.data = res.data.array
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    data(){
      return {
        data: null
      }
    }
  }
</script>


<style scoped>

</style>
