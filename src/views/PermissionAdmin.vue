<template>
    <v-container>
      <!-- 显示全局加载指示器，水平垂直居中 -->
      <v-row v-if="isLoading" justify="center" align="center" style="min-height: 80vh;">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="70" width="7"></v-progress-circular>
        </v-col>
      </v-row>
  
      <!-- 权限列表（加载完成后显示） -->
      <v-row v-else>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>栏目管理权限</th>
                <th>文章管理权限</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.name }}</td>
  
                <!-- 栏目管理权限复选框 -->
                <td>
                  <v-checkbox
                    v-model="user.permissions"
                    value="栏目管理"
                    label="栏目管理"
                    dense
                    hide-details="auto"
                  ></v-checkbox>
                </td>
  
                <!-- 文章管理权限复选框 -->
                <td>
                  <v-checkbox
                    v-model="user.permissions"
                    value="文章管理"
                    label="文章管理"
                    dense
                    hide-details="auto"
                  ></v-checkbox>
                </td>
  
                <td>
                  <v-btn
                    color="#E1F5FE"
                    small
                    :loading="loadingUser === user.id"
                    @click="savePermissions(user)"
                  >
                    <v-icon left>mdi-content-save</v-icon> 保存权限
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
  
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
        users: [], // 存储用户列表
        loadingUser: null, // 正在处理的用户ID（用于局部加载指示器）
        isLoading: true, // 页面加载状态
        snackbar: {
          show: false, // 控制 snackbar 显示
          text: '', // 消息文本
          color: 'success', // snackbar 颜色 (success, error 等)
        },
      };
    },
    created() {
      this.fetchUsers(); // 页面加载时获取用户列表
    },
    methods: {
      // 获取所有用户
      async fetchUsers() {
        this.isLoading = true; // 开始全局加载
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          this.users = data.users;
        } catch (error) {
          this.showMessage('获取用户数据失败', 'error');
          console.error('Failed to fetch users:', error);
        } finally {
          this.isLoading = false; // 加载完成，关闭全局加载指示器
        }
      },
      // 保存用户权限
      async savePermissions(user) {
        this.loadingUser = user.id; // 设置当前正在保存的用户
        try {
          const response = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              permissions: user.permissions,
            }),
          });
          if (response.ok) {
            this.showMessage('权限已成功更新', 'success');
          } else {
            this.showMessage('权限更新失败', 'error');
          }
        } catch (error) {
          console.error('Error saving permissions:', error);
          this.showMessage('权限更新时出错', 'error');
        } finally {
          this.loadingUser = null; // 清除按钮加载状态
        }
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
  