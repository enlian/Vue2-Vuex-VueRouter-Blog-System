<template>
  <div>
    <vHeader></vHeader>
    <div class="container">
        <el-col :span="22" :offset="1">
          <div class="grid-content bg-purple-dark">
            <el-table :data="data" stripe>
              <el-table-column prop="updateTime" label="日期"></el-table-column>
              <el-table-column prop="userInfo.userName" label="姓名"></el-table-column>
              <el-table-column prop="content" label="内容"></el-table-column>
              <el-table-column prop="content" label="操作">
                <template scope="scope">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" size="small" @click="edit(scope.$index,scope.row.content)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
    </div>

    <vFooter></vFooter>
  </div>
</template>

<script>
  import vHeader from './common/header.vue'
  import vFooter from './common/footer.vue'

  export default {
    name: 'index',
    components: {vHeader, vFooter},
    created: function () {
      var _this = this
      this.$http.get('/api')
        .then(function (res) {
          console.log(res.data)
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
      edit(index,value) {
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
            message: '编辑成功：'+value,
            type: 'success'
          });
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>


<style scoped>

</style>
