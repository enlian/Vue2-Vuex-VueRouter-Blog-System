<template>
  <v-container>
    <!-- 显示加载指示器，水平垂直居中 -->
    <v-row v-if="isLoading" justify="center" align="center" style="min-height: 100vh;">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="70" width="7"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- 加载完成后显示文章列表 -->
    <v-table v-if="!isLoading && articles.length > 0">
      <thead>
        <tr>
          <th>标题</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>
            <!-- 通过 router-link 传递文章 id -->
            <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }">查看详情</router-link>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- 当数据为空时显示提示 -->
    <p v-if="!isLoading && articles.length === 0">没有文章。</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      isLoading: true, // 初始化 isLoading 状态
    };
  },
  mounted() {
    // 获取文章列表
    fetch('/api/articles')
      .then((response) => response.json())
      .then((data) => {
        this.articles = data.articles;
      })
      .finally(() => {
        // 数据加载完成，设置 isLoading 为 false
        this.isLoading = false;
      });
  },
};
</script>
