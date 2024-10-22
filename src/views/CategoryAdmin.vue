<template>
  <v-container>
    <!-- 显示加载指示器，水平垂直居中 -->
    <v-row v-if="isLoading" justify="center" align="center" style="min-height: 80vh;">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="70" width="7"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- 加载完成后显示栏目管理 -->
    <v-row v-else>
      <v-col class="text-left">
        <v-btn color="#E1F5FE" @click="addCategory">
          <v-icon left>mdi-plus</v-icon> 添加栏目
        </v-btn>
      </v-col>
    </v-row>

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
            <v-btn color="#E1F5FE" small class="mx-2" @click="editCategory(category)">
              <v-icon left>mdi-pencil</v-icon> 编辑
            </v-btn>
            <v-btn color="#FFCCBC" small class="mx-2" @click="deleteCategory(category)">
              <v-icon left>mdi-delete</v-icon> 删除
            </v-btn>
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
          <v-btn text @click="closeDialog">
            <v-icon left>mdi-cancel</v-icon> 取消
          </v-btn>
          <v-btn color="primary" @click="saveCategory">
            <v-icon left>mdi-content-save</v-icon> 保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top right>
      {{ snackbar.text }}
    </v-snackbar>
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
      currentCategory: { id: null, name: "" }, // 新增和编辑时的当前栏目
      editMode: false,
      snackbar: {
        show: false, // 控制 snackbar 显示
        text: '', // 消息文本
        color: 'success', // snackbar 颜色
      },
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
    // 获取栏目列表
    async fetchCategories() {
      this.isLoading = true;
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        this.categories = data.categories;
      } catch (error) {
        this.showMessage('获取栏目失败', 'error');
        console.error('Failed to fetch categories:', error);
      } finally {
        this.isLoading = false;
      }
    },
    // 添加栏目
    addCategory() {
      this.currentCategory = { id: null, name: "" };
      this.editMode = false;
      this.showAddDialog = true;
    },
    // 编辑栏目
    editCategory(category) {
      this.currentCategory = { ...category }; // 克隆当前栏目对象
      this.editMode = true;
      this.showEditDialog = true;
    },
    // 保存栏目（新增或编辑）
    async saveCategory() {
      try {
        if (this.editMode) {
          // 更新栏目
          const response = await fetch(`/api/categories/${this.currentCategory.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.currentCategory),
          });
          if (response.ok) {
            const index = this.categories.findIndex((c) => c.id === this.currentCategory.id);
            if (index !== -1) {
              this.categories.splice(index, 1, { ...this.currentCategory });
            }
            this.showMessage('栏目更新成功', 'success');
          } else {
            this.showMessage('栏目更新失败', 'error');
          }
        } else {
          // 添加新栏目
          const response = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.currentCategory),
          });
          if (response.ok) {
            this.categories.push({ ...this.currentCategory });
            this.showMessage('栏目添加成功', 'success');
          } else {
            this.showMessage('栏目添加失败', 'error');
          }
        }
      } catch (error) {
        this.showMessage('保存栏目时出错', 'error');
        console.error('Error saving category:', error);
      } finally {
        this.closeDialog();
      }
    },
    // 删除栏目
    async deleteCategory(category) {
      try {
        const response = await fetch(`/api/categories/${category.id}`, { method: 'DELETE' });
        if (response.ok) {
          this.categories = this.categories.filter((c) => c.id !== category.id);
          this.showMessage('栏目删除成功', 'success');
        } else {
          this.showMessage('栏目删除失败', 'error');
        }
      } catch (error) {
        this.showMessage('删除栏目时出错', 'error');
        console.error('Error deleting category:', error);
      }
    },
    // 关闭模态框
    closeDialog() {
      this.showAddDialog = false;
      this.showEditDialog = false;
    },
    // 显示消息的函数
    showMessage(message, color) {
      this.snackbar.text = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.logo {
  font-size: 24px;
  color: #666;
}

.v-card {
  background-color: white;
  border-radius: 15px;
}

.test-account {
  color: #888;
  font-size: 14px;
}
</style>
