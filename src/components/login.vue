<template>
<div class="login">
  <div class="login-form" @keyup.enter="login">
    <h1>{{ msg }}</h1>
    <el-form :model="formData" :rules="loginRules" ref="loginForm" label-width="80px">
      <el-form-item label="登录账号" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入登录账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model.trim="captcha" placeholder="请输入验证码" clearable>
            <template slot="append"><div class="captcha" v-html="captchaImg" @click="getCaptcha"></div></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="login-in">登录</el-button>
        <span>没账号?</span>
        <el-button type="text" @click="()=>{this.$router.push('/register')}">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'login',
  data () {
    let validateCaptcha = (rule, value, callback) => {
      if (this.captcha === '') {
        callback(new Error('请输入验证码'))
      } else if (this.captcha.toLowerCase() !== this.captchaText) {
        callback(new Error('验证码错误!'))
      } else {
        callback()
      }
    }
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
        }],
        captcha: [{
          required: true,
          validator: validateCaptcha,
          trigger: 'blur'
        }]
      },
      captcha: '',
      captchaImg: '',
      captchaText: ''
    }
  },
  created () {
    if (sessionStorage.getItem('name')) {
      this.formData.name = sessionStorage.getItem('name')
    }
  },
  mounted () {
    this.getCaptcha()
    // if (document.domain !== 'localhost' && document.domain !== 'localhost:3000') {
    //   window.location.href = 'http://localhost:4000'
    // }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$http.postForm('/back_manage/api/login',this.formData).then(res => {
              if (res.result === 1) {
                this.$message.success(res.msg)
                sessionStorage.setItem('name', this.formData.name)
                this.$router.push('/home')
              } else if (res.result === 2) {
                this.$message.warning(res.msg)
                this.getCaptcha()
              } else {
                this.$message.error('登录失败')
                this.getCaptcha()
              }
            }).catch(() => {
              this.$message.error('登录失败')
              this.getCaptcha()
            })
          })
        } else {
          return false
        }
      })
    },
    getCaptcha () {
      this.axios.get('/back_manage/api/captcha').then(res => {
        if (res.data.result === 1) {
          this.captchaImg = res.data.data
          this.captchaText = res.data.text.toLowerCase()
        }
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.captcha{
  height:38px;
  overflow:hidden;
  cursor:pointer;
}
</style>
