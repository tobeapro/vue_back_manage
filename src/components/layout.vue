<template>
  <el-container>
    <el-header height="40px">
      <div class="collapse" @click="isCollapse=!isCollapse" :class="{'active':isCollapse}">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="header-info">
          <span>{{name}}</span>
      </div>
    </el-header>
    <el-container style="background-color:#f4f4f5;">
      <el-aside width="200px">
        <el-menu
        background-color="#545c64"
        text-color="#fff"
        :default-active="activeIndex"
        :collapse="isCollapse"
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
      <el-main :style="{'left':isCollapse?'60px':'200px'}">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      isCollapse: false
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
  .el-header{
    height:40px;
    font-size:16px;
    line-height:40px;
    color:#fff;
    background-color:#555;
    .collapse{
      float:left;
      margin-top:12px;
      margin-left:6px;
      transition: all .2s linear;
      &.active{
        transform: rotate(90deg);
      }
      i{
        display:block;
        width:16px;
        height:2px;
        background-color:#fff;
        &:not(:first-child){
          margin-top:4px;
        }
      }
    }
    .header-info{
      float:right;
    }
  }
  .el-aside{
    position:absolute;
    width:200px;
    top:40px;
    bottom:0;
    overflow-y:auto;
    .el-menu{
      height:100%;
      border:none;
    }
  }
  .el-main{
    position:absolute;
    top:40px;
    bottom:0;
    left:200px;
    right:0;
    overflow-y:auto;
    background-color:#ecf5ff;
  }
  .article-content{
    .el-textarea__inner{
      height:400px;
    }
  }
</style>
