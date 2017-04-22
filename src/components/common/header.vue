<template>
  <div>
    <router-link to="/">/home</router-link>&emsp;
    <router-link to="/page1">/page1</router-link>&emsp;
    <router-link to="/page1/hello">/page1/hello</router-link>&emsp;
    <router-link to="/whatever">404</router-link>
    <hr>
  </div>
</template>

<script>
  export default {
    name: 'header'
  }
</script>


<style scoped>
</style>
