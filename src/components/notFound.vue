<template>
  <div class="not-found">
    <h1>404</h1>
    <el-button type="primary" @click="()=>{this.$router.push('/home')}">返回首页</el-button>
  </div>
</template>
<script>
export default {
  name: 'notFound',
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
.not-found{
  margin-top:10vh;
  text-align:center;
  h1{
    line-height:60px;
  }
}
</style>
