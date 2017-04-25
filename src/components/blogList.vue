<template>
  <div class="col-md-9">

    <div class="media" v-for="(x,index) in blogList">
      <div class="media-body">
        <h4 class="media-heading">{{x.title}}

          <small class="pull-right">{{x.userInfo.userName}} {{x.updateTime}}</small>
        </h4>
        <p>
          {{x.content}}


          <template v-if="userInfo.isLogin">
            <button type="button" class="btn btn-primary btn-xs" @click="edit(index)">编辑</button>
            <button type="button" class="btn btn-danger btn-xs" @click="deleteBlog(index)">删除</button>
          </template>
        </p>
      </div>
    </div>


    <!-- 编辑博文 Modal -->
    <div class="modal fade" id="editBlogModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">修改博文</h4>
          </div>
          <form>
            <div class="modal-body">

              <div class="form-group">
                <label for="blogTitle">标题</label>
                <input v-model="title" type="text" class="form-control" id="blogTitle" placeholder="请输入标题"
                       required>
              </div>
              <div class="form-group">
                <label for="blogContent">内容</label>
                <textarea v-model="content" class="form-control" rows="3" id="blogContent" placeholder="请输入内容"
                          required></textarea>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="submit" class="btn btn-primary" @click="editConfirm()">确认修改</button>
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
    name: 'blogList',
    computed: mapState([
      'userInfo',
      'blogList'
    ]),
    data: function () {
      return {
        title: '',
        content: '',
        index: ''
      }
    },
    methods: {
      edit(index) {
        this.title = this.blogList[index].title;
        this.content = this.blogList[index].content;
        this.index = index;
        $('#editBlogModal').modal('show')
      },
      editConfirm(){
        if (this.title && this.content) {
          this.blogList[this.index].title = this.title
          this.blogList[this.index].content = this.content
          $('#editBlogModal').modal('hide')
          toastr.info('编辑成功!', '消息')
        }
      },
      deleteBlog(index){
        this.blogList.splice(index, 1);
        toastr.info('删除成功!', '消息')
      }
    }
  }
</script>
