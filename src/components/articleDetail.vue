<template>
  <div>
    <el-form ref="form" :model="item" label-width="80px">
      <el-form-item label="标题">
        <div v-text="item.title"></div>
      </el-form-item>
      <el-form-item label="文章内容">
        <div v-text="item.content"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">编辑</el-button>
        <el-button @click="()=>{this.$router.push('/articleManage')}">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'articleDetail',
  data () {
    return {
      item: ''
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      this.axios.get('/back_manage/api/article/detail?id=' + this.$route.params.id).then(res => {
        if (res.data.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: action => {
              this.$router.push('/')
            }
          })
        } else if (res.data.result === 1) {
          this.item = res.data.data
        } else {
          this.$message.error('查看失败')
        }
      }).catch(() => {
        this.$message.error('查看失败')
      })
    },
    editItem () {
    }
  }
}
</script>
<style lang="scss">
</style>
