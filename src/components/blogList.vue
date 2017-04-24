<template>
  <el-col :lg="12">
    <div class="grid-content bg-purple-dark">
      <el-table :data="data" stripe>
        <el-table-column prop="updateTime" label="日期"></el-table-column>
        <el-table-column prop="userInfo.userName" label="姓名"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="content" label="操作">
          <template scope="scope">
            <el-button type="info" size="small" @click="edit(scope.$index,scope.row.content)"><i class="el-icon-edit">
              编辑</i></el-button>
            <el-button type="danger" size="small" @click="deleteBlog(scope.$index)"><i class="el-icon-delete2"> 删除</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-col>
</template>


<script>
  export default {
    name: 'blogList',
    created: function () {
      var _this = this
      this.$http.get('/api')
        .then(function (res) {
          _this.data = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    data () {
      return {
        data: null
      }
    },
    methods: {
      edit(index, value) {
        this.$prompt('编辑内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: value,
          inputPattern: '',
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          this.data[index].content = value
          this.$notify({
            title: '成功',
            message: '编辑成功：' + value,
            type: 'success',
            offset: 70
          });
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '取消输入',
            offset: 70
          });
        });
      },
      deleteBlog(index){
        this.data.splice(index, 1);
        this.$notify.info({
          title: '消息',
          message: '删除成功！',
          offset: 70
        });


        this.$store.commit('increment')
        console.log(this.$store.state.count)


      }
    }
  }
</script>
