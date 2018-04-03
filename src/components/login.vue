<template>
<div class="login">
  <div class="login-form">
    <h1>{{ msg }}</h1>
    <el-form :model="formData" :rules="loginRules" ref="loginForm" label-width="80px">
      <el-form-item label="登录账号" prop="name">
        <el-input v-model="formData.name" placeholder="请输入登录账号" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginIn" class="login-in">登录</el-button>
        <span>没账号?</span>
        <el-button type="text" @click="()=>{this.$router.push('/register')}">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: '后台管理系统',
      formData: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    loginIn () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let data = new FormData(this.formData)
          this.axios.post(window.APIHOST + 'api/loginIn', data).then(res => {
            if (res.data.result === 1) {
              this.$message.success('登陆成功')
              this.$router.push('/home')
            } else {
              this.$message.error('登录失败')
            }
          }).catch(() => {
            this.$message.error('登录失败')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
</style>
