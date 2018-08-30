<template>
  <div>
    <el-form ref="form" :model="item" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model.trim="item.title" placeholder="标题长度不超过12字符" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" class="article-content">
        <mavon-editor ref="md" @change="changeContent" @imgAdd="uploadImg" v-model="item.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="addItem">确认</el-button>
        <el-button size="small" @click="()=>{this.$router.push('/articleManage')}">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'newArticle',
  data () {
    return {
      item: {
        title: '',
        content: '',
        contentHtml: '',
        create_time: ''
      }
    }
  },
  methods: {
    changeContent (content, contentHtml) {
      this.item.contentHtml = contentHtml
    },
    addItem () {
      this.item.create_time = new Date()
      this.$http.postForm('/back_manage/api/article/new', this.item).then(res => {
        if (res.result === 1) {
          this.$message.success('添加成功！')
          this.$router.push({path: '/articleDetail', query: {id: res.data._id}})
        } else {
          this.$message.error('添加失败')
        }
      }).catch(() => {
        this.$message.error('添加失败')
      })
    },
    uploadImg (name, file) {
      this.$http.postFile(this.ROOTSERVER+ 'back_manage/api/upload_img', {file}).then(res => {
        if (res.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: action => {
              this.$router.push('/')
            }
          })
        } else if (res.result === 1) {
          this.$message.success('上传成功')
          const $vm = this.$refs['md']
          $vm.$img2Url(name, res.url)
        } else {
          this.$message.error('上传失败')
        }
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  }
}
</script>
<style lang="scss">

</style>
