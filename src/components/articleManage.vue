<template>
  <div>
    <div class="header">
      <el-button type="primary" size="small" @click="()=>{this.$router.push('/newArticle')}">新增文章</el-button>
    </div>
    <el-form inline size="small" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model.trim="filter.title" @change="getArticles" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="filter.classify" @change="getArticles" clearable filterable>
          <el-option v-for="item in classifyList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <div v-if="articleList.length">
          <el-table ref="table" :data="articleList"  size="mini" border stripe align="right" :default-sort="defaultSort">
            <el-table-column type="index" width="50" fixed="left">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="classify" label="分类">
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
            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="props">
                  <el-button type="success" icon="el-icon-document" size="mini" circle @click="checkArticle(props.row)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteArticle(props.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div v-else>
          <el-button type="text" @click="()=>{this.$router.push('/newArticle')}">没有文章,去添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import businessData from '@/assets/businessData';
export default{
  name: 'articleManage',
  data () {
    return {
      msg: 'this is article',
      defaultSort: {prop: 'create_time', order: 'descending'},
      filter:{
        title: '',
        classify: ''
      },
      articleList: [],
      classifyList:businessData.classifyList
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    getArticles () {
      this.$http.postJSON(this.ROOTSERVER+'/back_manage/api/articles',{
        ...this.filter
      }).then(res => {
        if (res.result === 1) {
          this.articleList = res.data
        }
      }).catch(() => {
        this.$message.error('获取失败')
      })
    },
    checkArticle (val) {
      this.$router.push({path: 'articleDetail', query: {id: val._id}})
    },
    deleteArticle (val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
        type:'warning'
      }).then(()=>{
        this.$confirm('确认删除所选文章', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.get(this.ROOTSERVER+'/back_manage/api/article/delete?id=' + val._id).then(res => {
            if (res.result === 1) {
              this.$message.success('删除成功')
              this.getArticles()
            }
          }).catch(() => {
            this.$message.error('删除失败')
          })
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
