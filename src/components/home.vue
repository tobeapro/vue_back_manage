<template>
  <div class="home">
    <h2 class="title">这是博客后台管理页面</h2>
    <h3 class="text"><a href="https://github.com/tobeapro/blog-server" target="_blank">服务地址</a></h3>
    <h3 class="text"><a href="https://github.com/tobeapro/react-blog" target="_blank">前台地址</a></h3>
    <h3 class="text"><a href="http://www.amz715.com" target="_blank">线上效果预览</a></h3>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'this is home'
    }
  }
}
</script>
<style lang="less">
  .home{
    padding:20px;
    background: #fff;
    .title{
      line-height:40px;
    }
    .text{
      line-height:24px;
    }
    a{
      color:#409eff;
    }
  }
</style>
