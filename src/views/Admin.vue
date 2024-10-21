<template>
    <v-container>
      <v-row>
        <v-col>
          <h2>文章管理</h2>
        </v-col>
        <v-col class="text-right">
          <v-btn color="primary" @click="addArticle">添加文章</v-btn>
        </v-col>
      </v-row>
      
      <!-- 文章列表 -->
      <v-table>
        <thead>
          <tr>
            <th>标题</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="index">
            <td>{{ article.title }}</td>
            <td>
              <v-btn color="primary" small @click="editArticle(article)">编辑</v-btn>
              <v-btn color="error" small @click="deleteArticle(article)">删除</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
  
      <!-- 添加/编辑文章模态框 -->
      <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
          <v-card-title>{{ editMode ? '编辑文章' : '添加文章' }}</v-card-title>
          <v-card-text>
            <v-text-field label="文章标题" v-model="currentArticle.title"></v-text-field>
            <v-textarea label="文章内容" v-model="currentArticle.content"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeDialog">取消</v-btn>
            <v-btn color="primary" @click="saveArticle">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        articles: [
          { title: "第一篇文章", content: "文章内容" },
          { title: "第二篇文章", content: "文章内容" },
        ],
        showAddDialog: false,
        showEditDialog: false,
        currentArticle: { title: "", content: "" },
        editMode: false,
      };
    },
    computed: {
      dialogVisible() {
        // 计算属性控制模态框的可见性
        return this.showAddDialog || this.showEditDialog;
      },
    },
    methods: {
      addArticle() {
        this.currentArticle = { title: "", content: "" };
        this.editMode = false;
        this.showAddDialog = true;
      },
      editArticle(article) {
        this.currentArticle = { ...article };
        this.editMode = true;
        this.showEditDialog = true;
      },
      saveArticle() {
        if (this.editMode) {
          // 保存编辑的文章
          const index = this.articles.findIndex(a => a.title === this.currentArticle.title);
          this.articles.splice(index, 1, { ...this.currentArticle });
        } else {
          // 添加新文章
          this.articles.push({ ...this.currentArticle });
        }
        this.closeDialog();
      },
      deleteArticle(article) {
        this.articles = this.articles.filter(a => a !== article);
      },
      closeDialog() {
        this.showAddDialog = false;
        this.showEditDialog = false;
      },
    },
  };
  </script>
  