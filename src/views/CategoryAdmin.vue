<template>
    <v-container>
      <v-row>
        <v-col>
          <h2>栏目管理</h2>
        </v-col>
        <v-col class="text-right">
          <v-btn color="primary" @click="addCategory">添加栏目</v-btn>
        </v-col>
      </v-row>
      
      <!-- 栏目列表 -->
      <v-table>
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
              <v-btn color="primary" small @click="editCategory(category)">编辑</v-btn>
              <v-btn color="error" small @click="deleteCategory(category)">删除</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
  
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
        categories: [
          { name: "科技" },
          { name: "生活" },
        ],
        showAddDialog: false,
        showEditDialog: false,
        currentCategory: { name: "" },
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
      addCategory() {
        this.currentCategory = { name: "" };
        this.editMode = false;
        this.showAddDialog = true;
      },
      editCategory(category) {
        this.currentCategory = { ...category };
        this.editMode = true;
        this.showEditDialog = true;
      },
      saveCategory() {
        if (this.editMode) {
          // 保存编辑的栏目
          const index = this.categories.findIndex(c => c.name === this.currentCategory.name);
          this.categories.splice(index, 1, { ...this.currentCategory });
        } else {
          // 添加新栏目
          this.categories.push({ ...this.currentCategory });
        }
        this.closeDialog();
      },
      deleteCategory(category) {
        this.categories = this.categories.filter(c => c !== category);
      },
      closeDialog() {
        this.showAddDialog = false;
        this.showEditDialog = false;
      },
    },
  };
  </script>
  
  