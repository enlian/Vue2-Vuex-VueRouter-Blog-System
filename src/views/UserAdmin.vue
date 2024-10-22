<template>
    <v-container>
      <!-- 显示加载指示器 -->
      <v-row v-if="isLoading" justify="center" align="center" style="min-height: 80vh;">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="70" width="7"></v-progress-circular>
        </v-col>
      </v-row>
  
      <!-- 人员列表 -->
      <v-row v-else>
        <v-col class="text-left">
          <v-btn color="#E1F5FE" @click="addUser">
            <v-icon left>mdi-plus</v-icon> 添加人员
          </v-btn>
        </v-col>
      </v-row>
  
      <v-table v-if="!isLoading">
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
              <v-btn color="#E1F5FE" small class="mx-2" @click="editUser(user)">
                <v-icon left>mdi-pencil</v-icon> 编辑
              </v-btn>
              <v-btn color="#FFCCBC" small class="mx-2" @click="deleteUser(user)">
                <v-icon left>mdi-delete</v-icon> 删除
              </v-btn>
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
  
            <!-- 权限选择，横向排列 -->
            <v-row>
              <v-col cols="6">
                <v-checkbox v-model="currentUser.permissions" value="栏目管理" label="栏目管理"></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox v-model="currentUser.permissions" value="文章管理" label="文章管理"></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeDialog">
              <v-icon left>mdi-cancel</v-icon> 取消
            </v-btn>
            <v-btn color="primary" @click="saveUser">
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
        users: [], // 存储人员列表
        currentUser: { id: null, name: '', permissions: [] },
        editMode: false,
        dialogVisible: false, // 控制模态框的可见性
        isLoading: true, // 页面加载状态
        snackbar: {
          show: false, // 控制 snackbar 显示
          text: '', // 消息文本
          color: 'success', // snackbar 颜色 (success, error 等)
        },
      };
    },
    created() {
      this.fetchUsers(); // 页面加载时获取人员列表
    },
    methods: {
      // 获取所有人员
      async fetchUsers() {
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          this.users = data.users;
        } catch (error) {
          this.showMessage('获取人员数据失败', 'error');
          console.error('Failed to fetch users:', error);
        } finally {
          this.isLoading = false; // 加载完成
        }
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
        // this.isLoading = true; // 保存时启用加载指示器
        try {
          if (this.editMode) {
            // 更新人员
            await fetch(`/api/users/${this.currentUser.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(this.currentUser),
            });
            this.showMessage('人员更新成功', 'success');
          } else {
            // 添加新人员
            await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(this.currentUser),
            });
            this.showMessage('人员添加成功', 'success');
          }
        } catch (error) {
          console.error('Error saving user:', error);
          this.showMessage('保存人员时出错', 'error');
        } finally {
          this.dialogVisible = false;
          this.isLoading = false; // 操作完成后关闭加载指示器
          this.fetchUsers(); // 刷新人员列表
        }
      },
      // 删除人员
      async deleteUser(user) {
        this.isLoading = true; // 删除时启用加载指示器
        try {
          await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
          this.showMessage('人员删除成功', 'success');
        } catch (error) {
          console.error('Error deleting user:', error);
          this.showMessage('删除人员时出错', 'error');
        } finally {
          this.isLoading = false; // 操作完成后关闭加载指示器
          this.fetchUsers(); // 刷新人员列表
        }
      },
      // 显示消息的函数
      showMessage(message, color) {
        this.snackbar.text = message;
        this.snackbar.color = color;
        this.snackbar.show = true;
      },
      // 关闭模态框
      closeDialog() {
        this.dialogVisible = false;
      },
    },
  };
  </script>
  