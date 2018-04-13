<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
      background-color="#545c64"
      text-color="#fff"
      :default-active="activeIndex"
      router>
        <el-menu-item index="home">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="personalInfo">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="articleManage">
          <i class="el-icon-document"></i>
          <span slot="title">文章</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  computed: {
    name () {
      return sessionStorage.getItem('name') ? sessionStorage.getItem('name') : ''
    },
    activeIndex () {
      return this.$route.meta.group ? this.$route.meta.group : this.$route.path.split('/')[1]
    }
  },
  mounted () {
    if (!this.name) {
      this.$alert('请重新登录', '提示', {
        type: 'warning',
        callback: () => {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .el-container{
    position:fixed;
    width:100%;
    top:0;
    bottom:0;
    .el-aside{
      .el-menu{
        height:100%;
      }
    }
    .el-main{
      height:100%;
      overflow-y:auto;
    }
  }
</style>
