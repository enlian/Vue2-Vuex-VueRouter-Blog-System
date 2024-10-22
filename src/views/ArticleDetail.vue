<template>
  <v-container>
    <!-- 显示加载指示器，水平垂直居中 -->
    <v-row v-if="isLoading" justify="center" align="center" style="min-height: 100vh;">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="70" width="7"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- 加载完成后显示文章内容 -->
    <v-row v-else>
      <v-col cols="12">
        <v-card v-if="article" class="pa-4">
          <v-card-title class="headline">{{ article.title }}</v-card-title>
          <v-card-text>
            <p>{{ article.content }}</p>
          </v-card-text>
        </v-card>
        <v-alert v-else type="error" dismissible>
          文章未找到。
        </v-alert>
      </v-col>
    </v-row>

    <!-- 返回文章列表 -->
    <v-row>
      <v-col class="text-center">
        <router-link to="/">
          <v-btn color="primary" outlined>返回文章列表</v-btn>
        </router-link>
      </v-col>
    </v-row>
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
