<template>
  <div class="col-md-9">

    <div class="media" v-for="x in blogList">
      <div class="media-body">
        <h4 class="media-heading">{{x.title}}
          <small class="pull-right">{{x.userInfo.userName}} {{x.updateTime}}</small>
        </h4>
        <p>
          {{x.content}}
          <template v-if="userInfo.isLogin">
            <button type="button" class="btn btn-primary btn-xs" @click="edit(x.$index,x.content)">编辑</button>
            <button type="button" class="btn btn-danger btn-xs" @click="deleteBlog(x.$index)">删除</button>
          </template>
        </p>
      </div>
    </div>

    <p></p>

  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    name: 'blogList',
    created: function () {
      var _this = this
      this.$http.get('/api')
        .then(function (res) {
          _this.blogList = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    computed: mapState([
      'userInfo'
    ]),
    data () {
      return {
        blogList: null
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
        this.blogList.splice(index, 1);
        this.$notify.info({
          title: '消息',
          message: '删除成功！',
          offset: 70
        });

      }
    }
  }
</script>
