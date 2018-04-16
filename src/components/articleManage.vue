<template>
  <div>
    <div class="header">
      <el-button type="primary" size="small" @click="()=>{this.$router.push('/newArticle')}">新增文章</el-button>
    </div>
    <div>
      <div v-if="articleList.length">
          <el-table ref="table" :data="articleList"  size="mini" border stripe align="center" :default-sort="defaultSort">
            <el-table-column type="index" width="50" fixed="left">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="create_time" label="发布时间" sortable>
              <template slot-scope="props">
                {{new Date(props.row.create_time).toLocaleString()}}
              </template>
            </el-table-column>
            <el-table-column prop="update_time" label="最后更新" sortable>
              <template slot-scope="props">
                {{$countTime(props.row.update_time)}}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300">
              <template slot-scope="props">
                  <el-button type="success" icon="el-icon-document" size="mini" round @click="checkArticle(props.row)">查看</el-button>
                  <el-button type="primary" icon="el-icon-edit" size="mini" round @click="checkArticle(props.row)">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" round @click="deleteArticle(props.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div v-else>
          <el-button type="text">没有文章,去添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'articleManage',
  data () {
    return {
      msg: 'this is article',
      defaultSort: {prop: 'create_time', order: 'descending'},
      articleList: []
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    getArticles () {
      this.axios.get('/back_manage/api/articles').then(res => {
        if (res.data.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: action => {
              this.$router.push('/')
            }
          })
        } else if (res.data.result === 1) {
          this.articleList = res.data.data
        } else {
          this.$message.error('获取失败')
        }
      }).catch(() => {
        this.$message.error('获取失败')
      })
    },
    checkArticle (val) {
      this.$router.push({path: 'articleDetail', query: {id: val._id}})
    },
    deleteArticle (val) {
      this.$confirm('确认删除所选文章', '提示', {
        type: 'warning'
      }).then(() => {
        this.axios('/back_manage/api/article/delete?id=' + val._id).then(res => {
          if (res.data.result === 0) {
            this.$alert('你未登录或身份已过期！', '提示', {
              type: 'warning',
              callback: action => {
                this.$router.push('/')
              }
            })
          } else if (res.data.result === 1) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    }
  }
}
</script>
<style lang = "scss">
  .header{
    margin-bottom:20px;
  }
  .article-list{
    li{
      display:flex;
      flex-direction: column;
    }
  }
</style>
