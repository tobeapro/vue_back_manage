<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="账号">
        <span>{{infoData.name}}</span>
      </el-form-item>
      <el-form-item label="头像">
        <div class="cus-form-item" v-if="infoData.avatar">
          <img class="avatar" :src="infoData.avatar" />
          <el-upload
            action="/back_manage/api/upload_avatar"
            :data="userInfo"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            >
            <el-button size="small" type="primary">更新头像</el-button>
          </el-upload>
        </div>
        <div class="cus-form-item" v-else>
          <img class="avatar" src="http://localhost:4000/public/img/no_avatar.png"/>
          <el-upload
            action="/back_manage/api/upload_avatar"
            :data="userInfo"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            >
            <el-button size="small" type="primary">上传头像</el-button>
          </el-upload>
        </div>
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
    }
  }
}
</script>
<style lang = "scss">
.cus-form-item{
  display:flex;
  .avatar{
    width:40px;
    height:40px;
    margin-right:10px;
  }
}
</style>
