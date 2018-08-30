<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="80px">
      <el-form-item label="标题">
        <div v-text="item.title" v-if="!editStatus"></div>
        <el-input v-else v-model.trim="submitItem.title" placeholder="标题长度不超过12字符" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" class="article-content">
        <div class="markdown-body" v-html="item.contentHtml" v-if="!editStatus"></div>
        <!-- <el-input v-else type="textarea" v-model="submitItem.content"></el-input> -->
        <mavon-editor v-else ref="md" @change="changeContent" @imgAdd="uploadImg" v-model="submitItem.content" />
      </el-form-item>
      <el-form-item>
        <div v-if="editStatus">
          <el-button type="primary" size="small" @click="saveItem">保存</el-button>
          <el-button size="small" @click="editStatus=!editStatus">取消</el-button>
        </div>
        <div v-else>
          <el-button type="primary" size="small" @click="editItem">编辑</el-button>
          <el-button size="small" @click="()=>{this.$router.push('/articleManage')}">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'articleDetail',
  data () {
    return {
      item: {},
      editStatus: false,
      submitItem: {}
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      this.$http.get(this.ROOTSERVER+'back_manage/api/article/detail?id=' + this.$route.query.id).then(res => {
      if (res.result === 1) {
          this.item = res.data
        } else {
          this.$message.error('查看失败')
        }
      }).catch(() => {
        this.$message.error('查看失败')
      })
    },
    editItem () {
      this.editStatus = true
      this.submitItem = Object.assign({}, this.item)
    },
    changeContent (content, contentHtml) {
      this.submitItem.contentHtml = contentHtml
    },
    uploadImg (name, file) {
      this.$http.postFile(this.ROOTSERVER+ 'back_manage/api/upload_img', {file}).then(res => {
        if (res.result === 1) {
          this.$message.success('上传成功')
          const $vm = this.$refs['md']
          $vm.$img2Url(name, res.url)
        } else {
          this.$message.error('上传失败')
        }
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    saveItem () {
      this.submitItem.update_time = new Date()
      this.$http.postForm(this.ROOTSERVER+'back_manage/api/article/update', this.submitItem).then(res => {
        if (res.result === 1) {
          this.$message.success('更新成功')
          this.getItem()
          this.editStatus = false
        } else {
          this.$message.error('更新失败')
        }
      }).catch(() => {
        this.$message.error('更新失败')
      })
    }
  }
}
</script>
<style>
</style>
