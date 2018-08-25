<template>
  <div class="personal-info">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="账号">
        <span>{{infoData.name}}</span>
      </el-form-item>
      <el-form-item label="头像">
        <div class="cus-form-item" v-if="infoData.avatar">
          <img class="avatar" :src="ROOTSERVER+infoData.avatar" />
          <el-upload
            action="/back_manage/api/upload_avatar"
            :data="userInfo"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            class="upload-item"
            >
            <el-button type="primary">更新头像</el-button>
          </el-upload>
        </div>
        <div class="cus-form-item" v-else>
          <img class="avatar" :src="ROOTSERVER+'public/img/no_avatar.png'"/>
          <el-upload
            action="/back_manage/api/upload_avatar"
            :data="userInfo"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            class="upload-item"
            >
            <el-button  type="primary">上传头像</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="密码">
        <el-button @click="changeStatus=true">修改密码</el-button>
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
import qs from 'qs'
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
      this.axios.get('/back_manage/api/getInfo').then(res => {
        if (res.data.result === 0) {
          this.$alert('你未登录或身份已过期！', '提示', {
            type: 'warning',
            callback: action => {
              this.$router.push('/')
            }
          })
        } else if (res.data.result === 1) {
          this.infoData = res.data.data
          this.userInfo.id = res.data.data._id
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('登录出错')
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
    successUpload (res, file, fileList) {
      if (res.result === 1) {
        this.$message.success('上传成功')
        this.infoData = Object.assign({}, this.infoData, {avatar: res.url})
        fileList = ''
        // this.$set(this.infoData, 'avatar', res.url)
      }
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
        this.axios.post('/back_manage/api/pwdUpdate', qs.stringify(data)).then(res => {
          if (res.data.result === 0) {
            this.$alert('你未登录或身份已过期！', '提示', {
              type: 'warning',
              callback: action => {
                this.$router.push('/')
              }
            })
          } else if (res.data.result === 1) {
            this.changeStatus = false
            this.$message.success('修改成功')
            this.cancel()
          } else {
            this.$message.warning(res.data.msg)
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
    font-size:18px;
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
