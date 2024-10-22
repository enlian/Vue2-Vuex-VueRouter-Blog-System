<template>
    <v-container>
      <!-- 权限列表 -->
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
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [], // 存储人员列表
        loadingUser: null, // 存储正在加载的用户 ID
      };
    },
    created() {
      this.fetchUsers(); // 页面加载时获取用户列表
    },
    methods: {
      // 获取所有用户
      async fetchUsers() {
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          this.users = data.users;
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      },
      // 保存用户的权限分配
      async savePermissions(user) {
        this.loadingUser = user.id; // 设置正在加载的用户
        try {
          const response = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              permissions: user.permissions, // 更新用户的权限
            }),
          });
          if (response.ok) {
            this.$message.success('权限已成功更新');
          } else {
            this.$message.error('权限更新失败');
          }
        } catch (error) {
          console.error('Error saving permissions:', error);
          this.$message.error('权限更新时出错');
        } finally {
          this.loadingUser = null; // 清除加载状态
        }
      },
    },
  };
  </script>
  