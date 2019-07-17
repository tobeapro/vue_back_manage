<template>
  <div class="container">
    <el-form ref="form" :model="itemForm" :rules="itemFormRules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="itemForm.title" placeholder="标题长度不超过20字符" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-select v-model.trim="itemForm.classify" multiple placeholder="分类" filterable style="width:100%">
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图">
        <img :src="ROOTSERVER+itemForm.face_img" v-if="itemForm.face_img" style="max-height:200px;" />
        <el-upload
            ref="upload"
            :action="ROOTSERVER+'/back_manage/api/upload_img'"
            :with-credentials="true"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            class="upload-item">
            <el-button type="primary" size="small">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" class="article-content">
        <mavon-editor ref="md" fontSize="14px" codeStyle="atom-one-dark" @imgAdd="uploadImg" v-model.trim="itemForm.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="addItem">确认</el-button>
        <el-button size="small" @click="()=>{this.$router.push('/articleManage')}">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import businessData from '@/assets/businessData';
export default {
  name: 'newArticle',
  data () {
    return {
      itemForm: {
        title: '',
        classify: '',
        face_img:'',
        content: '',
      },
      itemFormRules:{
        title: [{required:true,message:'请输入标题'}],
        classify: [{required:true,message:'请选择分类标识'}],
        content: [{required:true,message:'请输入内容'}],
      },
      classifyList:businessData.classifyList
    }
  },
  methods: {
    addItem () {
      this.$refs.form.validate(valid=>{
        if(valid){
          const itemForm = Object.assign({},this.itemForm,{classify:this.itemForm.classify?this.itemForm.classify.join(','):''}) 
          this.$http.postForm(this.ROOTSERVER + '/back_manage/api/article/new', itemForm).then(res => {
            if (res.result === 1) {
              this.$message.success('添加成功！')
              this.$router.push({path: '/articleDetail', query: {id: res.data._id}})
            } else {
              this.$message.error('添加失败')
            }
          }).catch(() => {
            this.$message.error('添加失败')
          })
        }
      })
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
        this.itemForm.face_img = res.url
      }
      this.$refs.upload.clearFiles()
    },
    uploadImg (name, file) {
      this.$http.postFile(this.ROOTSERVER + '/back_manage/api/upload_img', {file}).then(res => {
        if (res.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: () => {
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
