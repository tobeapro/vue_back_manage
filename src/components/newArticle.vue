<template>
  <div>
    <el-form ref="form" :model="item" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model="item.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addItem">确认</el-button>
        <el-button @click="()=>{this.$router.push('/articleManage')}">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'newArticle',
  data () {
    return {
      item: {
        title: '',
        content: '',
        create_time: ''
      }
    }
  },
  methods: {
    addItem () {
      this.item.create_time = new Date()
      this.axios.post('/back_manage/api/article/new', qs.stringify(this.item)).then(res => {
        if (res.data.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: action => {
              this.$router.push('/')
            }
          })
        } else if (res.data.result === 1) {
          this.$message.success('添加成功！')
          this.$router.push({path: '/articleDetail', query: {id: res.data.data._id}})
        } else {
          this.$message.error('添加失败')
        }
      }).catch(() => {
        this.$message.error('添加失败')
      })
    }
  }
}
</script>
<style lang="scss">

</style>
