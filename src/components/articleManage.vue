<template>
  <div>
    <div>
      <el-button type="primary" size="small" @click="()=>{this.$router.push('/newArticle')}">新增文章</el-button>
    </div>
    <div>
      <ul class="article-list" v-if="articleList.length">
          <li v-for="(item,index) in articleList" :key="index" >
            <span>发布于:{{item.create_time}} 最后更新:{{$countTime(item.update_time)}}</span>
            <span>{{item.title}}</span>
            <span><el-button type="text" @click="()=>{this.$router.push({path: '/articleDetail', query: {id: item._id}})}">查看</el-button></span>
          </li>
      </ul>
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
    }
  }
}
</script>
<style lang = "scss">
  .article-list{
    li{
      display:flex;
      flex-direction: column;
    }
  }
</style>
