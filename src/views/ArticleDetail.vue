<template>
    <v-container>
      <!-- 判断是否在加载数据 -->
      <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
  
      <!-- 加载完成后显示文章内容 -->
      <div v-if="!isLoading">
        <h2 v-if="article">{{ article.title }}</h2>
        <p v-if="article">{{ article.content }}</p>
        <p v-else>文章未找到。</p>
      </div>
  
      <!-- 返回文章列表 -->
      <router-link to="/">返回文章列表</router-link>
    </v-container>
  </template>
  
  <script>
  export default {
    props: ['id'], // 接收文章的 id
    data() {
      return {
        article: null,
        isLoading: true, // 添加 isLoading 状态
      };
    },
    mounted() {
      // 模拟数据加载
      fetch(`/api/articles/${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.article = data.article;
        })
        .finally(() => {
          // 数据加载完成，设置 isLoading 为 false
          this.isLoading = false;
        });
    },
  };
  </script>
  