<template>
  <div class="col-md-2">

    <ul class="nav nav-pills nav-stacked">
      <li role="presentation" @click="addBlog"><a><i class="fa fa-edit"></i> 写篇文章</a></li>
      <li role="presentation" @click="blogFilter('userName','my')"><a><i class="fa fa-user-o"></i> 我的博文</a></li>
      <li role="presentation" @click="blogFilter('userName','all')"><a><i class="fa fa-eye"></i> 所有博文</a></li>
    </ul>

    <!-- 新增博文 Modal -->
    <div class="modal fade" id="addBlogModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">新增博文</h4>
          </div>
          <form>
            <div class="modal-body">

              <div class="form-group">
                <label for="blogTitle">标题</label>
                <input v-model="form.blogTitle" type="text" class="form-control" id="blogTitle" placeholder="请输入标题"
                       required>
              </div>
              <div class="form-group">
                <label for="blogContent">内容</label>
                <textarea v-model="form.blogContent" class="form-control" rows="3" id="blogContent" placeholder="请输入内容"
                          required></textarea>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="submit" class="btn btn-primary" @click="addConfirm">提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'leftBar',
    computed: mapState([
      'userInfo'
    ]),
    data: function () {
      return {
        form: {
          blogTitle: '',
          blogContent: ''
        }
      }
    },
    methods: {
      addBlog: function () {
        if (this.userInfo.isLogin) {
          this.form.blogTitle = '';
          this.form.blogContent = '';
          $('#addBlogModal').modal('show')
        } else {
          $('#loginModal').modal('show')
        }
      },
      addConfirm: function () {
        if (this.form.blogTitle && this.form.blogContent) {
          $('#addBlogModal').modal('hide')
          this.$store.commit({
            type: 'addBlog',
            data: {
              userInfo: this.userInfo,
              title: this.form.blogTitle,
              content: this.form.blogContent,
              updateTime: new Date().getTime()
            }
          })
          toastr.info('已新增一条博文!', '消息')
        }
      },
      blogFilter: function (field, value) {
        if (field == 'userName') {
          if (value == 'my') {
            this.$store.commit({
              type: 'blogFilter',
              data: {
                field: field,
                value: value
              }
            })
          }

          if (value == 'all') {
            this.$store.dispatch('getBlogList')
          }

        }
      }
    }
  }
</script>
