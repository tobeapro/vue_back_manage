<template>
    <div class="user-manage">
        <ul class="user-list">
            <li class="user-item" v-for="item in userList" :key="item._id">
                <h3>{{item.name}}</h3>
                <img class="avatar" :src="item.avatar?ROOTSERVER+item.avatar:ROOTSERVER+'/public/img/no_avatar.png'" >
                <div>
                    <el-button type="danger" size="small" @click="deleteItem(item)" :disabled="item.name==='admin'">删除</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'userManage',
        data() {
            return {
                userList:[]
            }
        },
        created() {
            this.getUserList();
        },
        methods:{
            getUserList () {
                this.$http.get(this.ROOTSERVER + '/back_manage/api/user/list').then(res => {
                    if (res.result === 1) {
                        this.userList = res.data || []
                    }
                })
            },
            deleteItem(item){
                this.$confirm('删除用户将无法还原请确认？','提示',{
                    type:'warning'
                }).then(()=>{
                    this.$http.postForm(this.ROOTSERVER + '/back_manage/api/user/delete',{name:item.name}).then(res=>{
                        if(res.result===1){
                            this.$message.success('删除成功')
                            this.getUserList()
                        }else{
                            this.$message.error(res.msg||'删除失败')
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less">
.user-manage{
  .user-list{
      display:flex;
      flex-wrap: wrap;
      .user-item{
          margin:10px;
          padding:20px 40px;
          text-align: center;
          background-color:#fff;
          border-radius: 6px;
          .avatar{
              margin:10px 0;
              width:80px;
              height:80px;
          }
      }
  }
}
</style>