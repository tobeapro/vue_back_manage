<template>
<div class="login">
  <div class="login-form" @keyup.enter="register">
    <h1>{{ msg }}</h1>
    <el-form :model="checkData" ref="registerForm" :rules="registerRules" label-width="80px">
      <el-form-item label="注册账号" prop="name">
        <el-input v-model.trim="checkData.name" autoComplete="off" placeholder="请输入注册账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册密码" prop="password">
        <el-input type="password" v-model.trim="checkData.password" autoComplete="off" placeholder="请输入注册密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model.trim="confirmPwd" placeholder="请确认注册密码" clearable></el-input>
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
      if (this.confirmPwd === '') {
        callback(new Error('请再次输入密码'))
      } else if (this.confirmPwd !== this.checkData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msg: '注册',
      checkData: {
        name: '',
        password: ''
      },
      confirmPwd: '',
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
        },
        {
          pattern: /^\S{5,20}$/,
          message: '密码长度为5-20位'
        }],
        confirmPassword: [{
          required: true,
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
          this.$http.postForm(this.ROOTSERVER+'/back_manage/api/register', this.checkData).then(res => {
            if (res.result === 1) {
              this.$message.success('注册成功')
              this.$router.push('/')
            } else if (res.result === 2) {
              this.$message.warning(res.msg)
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
