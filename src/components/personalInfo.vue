<template>
  <div class="personal-info">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="账号">
        <span>{{infoData.name}}</span>
      </el-form-item>
      <el-form-item label="头像">
        <div class="cus-form-item">
          <img class="avatar" v-if="infoData.avatar" :src="ROOTSERVER+infoData.avatar" />
          <img class="avatar" v-else :src="ROOTSERVER+'/public/img/no_avatar.png'"/>
          <el-upload
            ref="upload"
            :action="ROOTSERVER+'/back_manage/api/upload_avatar'"
            :data="userInfo"
            :with-credentials="true"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            :on-error="errorUpload"
            class="upload-item"
            >
            <el-button type="primary" size="small">{{infoData.avatar?'更新头像':'上传头像'}}</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="密码">
        <el-button size="small" type="danger" @click="changeStatus=true">修改密码</el-button>
      </el-form-item>
      <el-form-item label="原密码" prop="oldPwd" class="cus-input-item" v-show="changeStatus">
        <el-input type="password" v-model.trim="form.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd" class="cus-input-item" v-show="changeStatus">
        <el-input type="password" v-model.trim="form.newPwd" v-show="!showStatus">
          <i slot="suffix" class="el-input__icon el-icon-question" @click="showStatus=!showStatus"></i>
        </el-input>
        <el-input v-model.trim="form.newPwd" v-show="showStatus">
          <i slot="suffix" class="el-input__icon el-icon-view" @click="showStatus=!showStatus"></i>
        </el-input>
      </el-form-item>
      <el-form-item v-show="changeStatus">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confirmPwd">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default{
  name: 'info',
  data () {
    return {
      infoData: '',
      userInfo: {
        id: ''
      },
      changeStatus: false,
      showStatus: false,
      form: {
        oldPwd: '',
        newPwd: ''
      },
      rules: {
        oldPwd: [
          {required: true, message: '请输入原密码', trigger: ['blur', 'change']}
        ],
        newPwd: [
          {required: true, message: '请输入新密码', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$http.get(this.ROOTSERVER + '/back_manage/api/getInfo').then(res => {
        if (res.result === 1) {
          this.infoData = res.data
          this.userInfo.id = res.data._id
        }
      })
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 3
      if (!isJPG) {
        this.$message.error('头像只能是JPG/PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('头像大小不能超过3MB!')
      }
      return isJPG&&isLt2M 
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
        this.infoData = Object.assign({}, this.infoData, {avatar: res.url})
      }else{
        this.$message.error(res.msg||'上传失败')
      }
      this.$refs.upload.clearFiles()
    },
    errorUpload(err){
      this.$message.error(err.toString()||'上传失败')
    },
    cancel () {
      this.changeStatus = false
      this.$refs.form.resetFields()
    },
    confirmPwd () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        const data = Object.assign({}, {id: this.userInfo.id}, this.form)
        this.$http.postForm(this.ROOTSERVER+'/back_manage/api/pwdUpdate', data).then(res => {
          if (res.result === 1) {
            this.changeStatus = false
            this.$message.success('修改成功')
            this.cancel()
          }
        }).catch(() => {
          this.$message.error('修改失败')
        })
      })
    }
  }
}
</script>
<style lang = "scss">
.personal-info{
  padding:20px 0;
  background-color:#fff;
  .el-form-item__label,.el-form-item__content{
    font-size:16px;
  }
  .cus-form-item{
    display:flex;
    .avatar{
      width:100px;
      height:100px;
      margin-right:10px;
    }
    .upload-item{
      display:flex;
      align-items: center;
    }
  }
  .cus-input-item{
    max-width:400px;
  }
}
</style>
