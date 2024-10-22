<template>
    <v-container>
      <v-row>
        <v-col class="text-left">
          <v-btn color="primary" @click="addUser">添加人员</v-btn>
        </v-col>
      </v-row>
  
      <!-- 人员列表 -->
      <v-table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>权限</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.permissions.join(', ') }}</td>
            <td>
              <v-btn color="primary" small class="mx-2" @click="editUser(user)">编辑</v-btn>
              <v-btn color="error" small class="mx-2" @click="deleteUser(user)">删除</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
  
      <!-- 添加/编辑人员模态框 -->
      <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
          <v-card-title>{{ editMode ? '编辑人员' : '添加人员' }}</v-card-title>
          <v-card-text>
            <v-text-field label="姓名" v-model="currentUser.name"></v-text-field>
  
            <!-- 权限选择 -->
            <v-checkbox
              v-model="currentUser.permissions"
              value="栏目管理"
              label="栏目管理"
            ></v-checkbox>
            <v-checkbox
              v-model="currentUser.permissions"
              value="文章管理"
              label="文章管理"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeDialog">取消</v-btn>
            <v-btn color="primary" @click="saveUser">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [], // 存储人员列表
        showAddDialog: false,
        showEditDialog: false,
        currentUser: { id: null, name: '', permissions: [] },
        editMode: false,
        dialogVisible: false, // 控制模态框的可见性
      };
    },
    created() {
      this.fetchUsers(); // 页面加载时获取人员列表
    },
    methods: {
      // 获取所有人员
      async fetchUsers() {
        const response = await fetch('/api/users');
        const data = await response.json();
        this.users = data.users;
      },
      // 添加人员
      addUser() {
        this.currentUser = { id: null, name: '', permissions: [] };
        this.editMode = false;
        this.dialogVisible = true;
      },
      // 编辑人员
      editUser(user) {
        this.currentUser = { ...user }; // 克隆用户数据
        this.editMode = true;
        this.dialogVisible = true;
      },
      // 保存人员（新增或编辑）
      async saveUser() {
        if (this.editMode) {
          // 更新人员
          await fetch(`/api/users/${this.currentUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.currentUser),
          });
        } else {
          // 添加新人员
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.currentUser),
          });
        }
        this.dialogVisible = false;
        this.fetchUsers(); // 更新人员列表
      },
      // 删除人员
      async deleteUser(user) {
        await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
        this.fetchUsers(); // 删除后刷新列表
      },
      // 关闭模态框
      closeDialog() {
        this.dialogVisible = false;
      },
    },
  };
  </script>
  