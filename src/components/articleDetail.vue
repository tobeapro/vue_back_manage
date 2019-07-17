<template>
  <div class="container">
    <el-form ref="form" :model="submitItem" :rules="itemFormRules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <div v-text="item.title" v-if="!editStatus"></div>
        <el-input v-else v-model.trim="submitItem.title" placeholder="标题长度不超过20字符" maxlength="20"></el-input>
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
        <template v-if="!editStatus">
          <img :src="ROOTSERVER+item.face_img" style="max-height:200px;" v-if="item.face_img" />
          <span v-else>无</span>
        </template>
        <template v-else>
          <img :src="ROOTSERVER+submitItem.face_img"  style="max-height:200px;" v-if="submitItem.face_img" />
          <el-upload
            ref="upload"
            :action="ROOTSERVER+'/back_manage/api/upload_img'"
            :with-credentials="true"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            class="upload-item">
            <el-button type="primary" size="small">上传图片</el-button>
          </el-upload>
        </template>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" class="article-content">
        <div class="markdown-article" v-html="translateMarkdown(item.content)" v-if="!editStatus"></div>
        <mavon-editor v-else ref="md" fontSize="14px" codeStyle="atom-one-dark" @imgAdd="uploadImg" v-model="submitItem.content" />
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
import marked from 'marked';
import hljs from 'highlight.js';
export default {
  name: 'articleDetail',
  data () {
    return {
      item: {},
      editStatus: false,
      submitItem: {},
      classifyList:businessData.classifyList,
      itemFormRules:{
        title: [{required:true,message:'请输入标题'}],
        classify: [{required:true,message:'请选择分类标识'}],
        content: [{required:true,message:'请输入内容'}],
      }
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
    translateMarkdown(content){
      if(content){
        return marked(content, {
          renderer: new marked.Renderer(),
          highlight: function(code) {
              return hljs.highlightAuto(code).value;
          },
          pedantic: false,
          gfm: true,
          tables: true,
          breaks: true,
          sanitize: false,
          smartLists: true,
          smartypants: true
        })
      }else{
        return ''
      }
    },
    editItem () {
      this.editStatus = true
      const classify = this.item.classify.split(',')
      this.submitItem = Object.assign({face_img:''}, this.item,{classify})
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
    successUpload (res) {
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
      }else{
        this.$message.error(res.msg||'上传失败')
      }
      this.$refs.upload.clearFiles()
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
      this.$refs.form.validate(valid=>{
        if(valid){
          const submitItem = Object.assign({},this.submitItem,{classify:this.submitItem.classify?this.submitItem.classify.join(','):''})
          this.$http.postForm(this.ROOTSERVER+'/back_manage/api/article/update', submitItem).then(res => {
            if (res.result === 1) {
              this.$message.success('更新成功')
              this.getItem()
              this.editStatus = false
            }
          }).catch(() => {
            this.$message.error('更新失败')
          })
        }
      })
    }
  }
}
</script>
