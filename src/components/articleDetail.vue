<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="80px">
      <el-form-item label="标题">
        <div v-text="item.title" v-if="!editStatus"></div>
        <el-input v-else v-model.trim="submitItem.title" placeholder="标题长度不超过12字符" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <div v-text="item.classify" v-if="!editStatus"></div>
        <el-select v-else v-model.trim="submitItem.classify" multiple placeholder="分类" filterable style="width:100%">
          <el-option
            v-for="child in classifyList"
            :key="child.id"
            :value="child.id"
            :label="child.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图">
        <img :src="ROOTSERVER+item.face_img" style="max-height:200px;" v-if="!editStatus" />
        <el-upload v-else
            :action="ROOTSERVER+'/back_manage/api/upload_img'"
            :with-credentials="true"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            class="upload-item"
            >
            <img :src="ROOTSERVER+submitItem.face_img"  style="max-height:200px;" v-if="submitItem.face_img" />
            <el-button type="primary" size="small">上传图片</el-button>
          </el-upload>
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
import businessData from '@/assets/businessData';
export default {
  name: 'articleDetail',
  data () {
    return {
      item: {},
      editStatus: false,
      submitItem: {},
      classifyList:businessData.classifyList
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      this.$http.get(this.ROOTSERVER+'/back_manage/api/article/detail?id=' + this.$route.query.id).then(res => {
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
      const classify = this.item.classify.split(',')
      this.submitItem = Object.assign({}, this.item,{classify})
    },
    changeContent (content, contentHtml) {
      this.submitItem.contentHtml = contentHtml
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG/PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过2MB!')
      }
      return isJPG && isLt2M
    },
    successUpload (res, file, fileList) {
      if (res.result === 0 ){
        this.$alert('你未登录或登录信息已失效', '提示', {
          type: 'warning',
          callback: () => {
            this.$router.push('/')
          }
        })
      }else if (res.result === 1) {
        this.$message.success('上传成功')
        this.submitItem.face_img = res.url
        fileList = ''
      }
    },
    uploadImg (name, file) {
      this.$http.postFile(this.ROOTSERVER+ '/back_manage/api/upload_img', {file}).then(res => {
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
      this.submitItem.update_time = new Date().getTime()
      this.$http.postForm(this.ROOTSERVER+'/back_manage/api/article/update', this.submitItem).then(res => {
        if (res.result === 1) {
          this.$message.success('更新成功')
          this.getItem()
          this.editStatus = false
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
