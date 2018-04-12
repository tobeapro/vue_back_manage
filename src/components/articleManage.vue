<template>
  <div>
    {{msg}}
  </div>
</template>
<script>
export default{
  name: 'articleManage',
  data () {
    return {
      msg: 'this is article',
      articles: ''
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    getArticles () {
      this.axios.get('/back_manage/api/articles?name=', res => {
        if (res.data.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: action => {
              this.$router.push('/')
            }
          })
        } else if (res.data.result === 1) {
          this.$message.success('获取成功')
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
</style>
