<template>
<div class="login">
  <div class="login-form">
    <h1>{{ msg }}</h1>
    <el-form :model="checkData" ref="registerForm" :rules="registerRules" label-width="80px">
      <el-form-item label="注册账号" prop="name">
        <el-input v-model="checkData.name" placeholder="请输入注册账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册密码" prop="password">
        <el-input type="password" v-model="checkData.password" placeholder="请输入注册密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="checkData.confirmPassword" placeholder="请确认注册密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-in" @click="register">注册</el-button>
        <span>已有账号?</span>
        <el-button type="text" @click="()=>{this.$router.push('/')}">返回登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'regiser',
  data () {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.checkData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msg: '后台管理系统',
      checkData: {
        name: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        name: [{
          required: true,
          message: '请输入注册账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入注册密码',
          trigger: 'blur'
        }],
        confirmPassword: [{
          validator: validatePassword,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    register () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          let data = new FormData(this.checkData)
          this.axios.post(window.APIHOST + 'api/loginIn', data).then(res => {
            if (res.data.result === 1) {
              this.$message.success('注册成功')
            } else {
              this.$message.error('注册失败')
            }
          }).catch(() => {
            this.$message.error('注册失败')
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
