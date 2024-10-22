<template>
  <v-container>
    <!-- 显示加载指示器，水平垂直居中 -->
    <v-row v-if="isLoading" justify="center" align="center" style="min-height: 100vh;">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="70" width="7"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- 加载完成后显示栏目管理 -->
    <v-btn v-else color="primary" @click="addCategory" style="position: fixed;right:40px;">添加栏目</v-btn>

    <!-- 栏目列表 -->
    <v-table v-if="categories.length > 0">
      <thead>
        <tr>
          <th>栏目名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="index">
          <td>{{ category.name }}</td>
          <td>
            <v-btn color="primary" small class="mx-2" @click="editCategory(category)">编辑</v-btn>
            <v-btn color="error" small class="mx-2" @click="deleteCategory(category)">删除</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- 当栏目为空时显示提示 -->
    <v-row v-if="!isLoading && categories.length === 0">
      <v-col class="text-center">
        <v-alert type="info">目前没有栏目。</v-alert>
      </v-col>
    </v-row>
  
    <!-- 添加/编辑栏目模态框 -->
    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-card-title>{{ editMode ? '编辑栏目' : '添加栏目' }}</v-card-title>
        <v-card-text>
          <v-text-field label="栏目名称" v-model="currentCategory.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">取消</v-btn>
          <v-btn color="primary" @click="saveCategory">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: [], // 存储栏目列表
      isLoading: true, // 加载状态
      showAddDialog: false,
      showEditDialog: false,
      currentCategory: { name: "" },
      editMode: false,
    };
  },
  computed: {
    dialogVisible() {
      return this.showAddDialog || this.showEditDialog;
    },
  },
  created() {
    this.fetchCategories(); // 加载栏目数据
  },
  methods: {
    // 模拟获取栏目列表数据
    async fetchCategories() {
      this.isLoading = true; // 开始加载
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        this.categories = data.categories;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        this.isLoading = false; // 加载完成
      }
    },
    // 添加栏目
    addCategory() {
      this.currentCategory = { name: "" };
      this.editMode = false;
      this.showAddDialog = true;
    },
    // 编辑栏目
    editCategory(category) {
      this.currentCategory = { ...category };
      this.editMode = true;
      this.showEditDialog = true;
    },
    // 保存栏目（新增或编辑）
    saveCategory() {
      if (this.editMode) {
        // 更新栏目
        const index = this.categories.findIndex(c => c.name === this.currentCategory.name);
        if (index !== -1) {
          this.categories.splice(index, 1, { ...this.currentCategory });
        }
      } else {
        // 添加新栏目
        this.categories.push({ ...this.currentCategory });
      }
      this.closeDialog();
    },
    // 删除栏目
    deleteCategory(category) {
      this.categories = this.categories.filter(c => c !== category);
    },
    // 关闭模态框
    closeDialog() {
      this.showAddDialog = false;
      this.showEditDialog = false;
    },
  },
};
</script>
