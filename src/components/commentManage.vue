<template>
  <div>
    <el-form inline size="small" label-width="80px">
      <el-form-item label="评论昵称">
        <el-input v-model.trim="filter.comment_name" @change="searchCommentList" maxlength="20" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="评论内容">
        <el-input v-model.trim="filter.content" @change="searchCommentList" maxlength="20" clearable>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <div v-if="commentList.length">
          <el-table ref="table" :data="commentList"  size="mini" border stripe align="right">
            <el-table-column type="index" width="50" fixed="left">
            </el-table-column>
            <el-table-column prop="article_name" width="200" label="文章标题">
            </el-table-column>
            <el-table-column prop="comment_name" width="200" label="评论昵称">
            </el-table-column>
            <el-table-column prop="comment_email" width="200" label="联系邮箱">
            </el-table-column>
            <el-table-column prop="comment_time" width="160" label="评论时间">
              <template slot-scope="props">
                {{$formatDate(props.row.comment_time,'yyyy-mm-dd HH:MM:SS')}}
              </template>
            </el-table-column>
            <el-table-column prop="content" min-width="200" label="评论内容">
            </el-table-column>
            <el-table-column prop="author_reply" min-width="300" label="我的回复">
              <template slot-scope="props">
                <div class="reply-content">
                  <el-button type='primary' size="mini" @click="toEdit(props.row)">修改</el-button>
                  <div>{{props.row.author_reply}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="80">
              <template slot-scope="props">
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteComment(props.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :total="pageOpt.total">
          </el-pagination>
      </div>
      <div v-else>
          <el-button type="text">暂无评论</el-button>
      </div>
    </div>
    <el-dialog title="修改回复" :close-on-click-modal="false" custom-class="reply-dialog" :visible.sync="replyVisible" width="600px">
      <el-input v-model.trim="replyForm.reply" type="textarea" autocomplete="off" maxlength="200" clearable></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editReply" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default{
  name: 'commentManage',
  data () {
    return {
      filter:{
        comment_name: '',
        content: ''
      },
      pageOpt:{
        pageSize:10,
        pageNo:1,
        total:0
      },
      commentList: [],
      replyVisible:false,
      replyForm:{
        id:'',
        reply:''
      }
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    getCommentList () {
      this.$http.postJSON(this.ROOTSERVER+'/back_manage/api/comment/list',{
        ...this.filter,
        pageOpt:this.pageOpt
      }).then(res => {
        if (res.result === 1) {
          this.commentList = res.data.list||[]
          this.pageOpt = Object.assign(this.pageOpt,res.data.pageOpt||{})
        }
      }).catch(() => {
        this.$message.error('获取失败')
      })
    },
    searchCommentList(){
      this.pageOpt.pageNo = 1;
      this.getCommentList()
    },
    handleCurrentChange(val){
      this.pageOpt.pageNo = val;
      this.getCommentList()
    },
    toEdit(item){
      this.replyForm = {
        id:item._id,
        reply:item.author_reply
      }
      this.replyVisible = true
    },
    editReply(){
      this.replyVisible = false;
      this.$http.postJSON(this.ROOTSERVER+'/back_manage/api/comment/edit',{
        id:this.replyForm.id,
        author_reply:this.replyForm.reply,
      }).then(res=>{
        const { result, msg } = res;
        if(result===1){
          this.getCommentList()
          this.$message.success('编辑成功')
        }else{
          this.$message.error(msg||'编辑失败')
        }
      })
    },
    deleteComment (val) {
      this.$confirm('此操作将永久删除该评论, 是否继续?','提示',{
        type:'warning'
      }).then(()=>{
        this.$http.postJSON(this.ROOTSERVER+'/back_manage/api/comment/delete',{
           id:val._id
        }).then(res => {
          if (res.result === 1) {
            this.$message.success('删除成功')
            if(this.commentList.length<=1){
              this.pageOpt.pageNo>1 && this.pageOpt.pageNo--
            }
            this.getCommentList()
          }
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
  }
}
</script>
<style lang = "less" scoped>
/deep/ .reply-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right:4px;
  }
}
/deep/ .el-pagination{
  padding:10px;
  background:#fff;
}
/deep/ .reply-dialog{
  .el-textarea__inner{
    height:100px;
    resize:none;
  }
}
</style>
