<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="账号">
        <span>{{infoData.name}}</span>
      </el-form-item>
      <el-form-item label="头像">
        <div class="cus-form-item" v-if="infoData.avatar">
          <img class="avatar" :src="infoData.avatar" />
          <el-button type="primary">更新头像</el-button>
        </div>
        <div class="cus-form-item" v-else>
          <img class="avatar" src="http://localhost:4000/public/img/no_avatar.png"/>
          <el-upload
            action="/back_manage/api/upload_avatar"
            :data="userInfo"
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
          this.$message(res.data.msg)
        }
      }).catch(() => {
        this.$message('登录出错')
      })
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
