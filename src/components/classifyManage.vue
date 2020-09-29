<template>
    <div>
        <div class="header">
            <el-button type="primary" size="small" @click="dialogVisible=true;dialogTitle='新增分类'">新增分类</el-button>
        </div>
        <el-table ref="table" :data="dataList"  size="mini" border stripe align="right">
            <el-table-column type="index" width="50" fixed="left">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="isFix" label="是否固定">
                <template slot-scope="props">
                    <el-tag>{{props.row.isFix===1?'是':'否'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
                <template slot-scope="props">
                    <el-button type="primary" size="mini" @click="toEdit(props.row)">编辑</el-button>
                    <el-button type="danger" size="mini" :disabled="props.row.isFix===1" @click="deleteItem(props.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" width="400px" :title="dialogTitle" @close="resetFormItem">
            <el-form ref="formItem" label-position="left" label-width="80px" :model="formItem" :rules="formItemRules">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model.trim="formItem.name" size="small" maxlength="10" clearable></el-input>
                </el-form-item>
                <el-form-item label="固定" prop="isFix">
                    <el-radio v-model="formItem.isFix" :label="1">是(不可删除)</el-radio>
                    <el-radio v-model="formItem.isFix" :label="2">否(可删除)</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="saveItem" size="small">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'classifyManage',
        data(){
            return {
                dataList:[],
                dialogVisible:false,
                dialogTitle:'新增分类',
                formItem:{
                    _id:null,
                    name:'',
                    isFix:''
                },
                formItemRules:{
                    name:{
                        required:true,message:'请输入分类名称'
                    },
                    isFix:{
                        required:true,message:'请选择是否固定'
                    }
                }
            }
        },
        created(){
            this.getList()
        },
        methods:{
            getList(){
                this.$http.postJSON(this.ROOTSERVER+'/front_manage/api/classify/list').then(res => {
                    if (res.result === 1) {
                    this.dataList = res.data
                    }
                }).catch(() => {
                    this.$message.error('获取失败')
                })
            },
            toEdit(item){
                this.formItem = Object.assign({},item)
                this.dialogVisible = true
                this.dialogTitle = '编辑分类'
            },
            saveItem(){
                this.$refs['formItem'].validate(valid=>{
                    if(valid){
                        const formItem = Object.assign({},this.formItem)
                        let operateName = '新增'
                        this.formItem._id&&(operateName='修改')
                        this.$http.postJSON(this.ROOTSERVER+'/back_manage/api/classify/operate',formItem).then(res => {
                            this.dialogVisible = false
                            if (res.result === 1) {
                                this.$message.success(`${operateName}成功`)
                                this.getList()
                            }else{
                                this.$message.warning(res.msg||`${operateName}失败`)
                            }
                        }).catch(() => {
                            this.$message.error(`${operateName}失败`)
                        })
                    }
                })
            },
            resetFormItem(){
                this.formItem = {
                    _id:null,
                    name:'',
                    isFix:''
                }
                this.$refs['formItem'].clearValidate()
            },
            deleteItem(id){
                this.$confirm('确认要删除该项吗？','提示',{
                    type:'warning'
                }).then(()=>{
                    this.$http.postJSON(this.ROOTSERVER+'/back_manage/api/classify/delete',{id}).then(res=>{
                        if(res.result===1){
                            this.getList()
                            this.$message.success('删除成功')
                        }else{
                            this.$message.warning(res.msg||'删除失败')
                        }
                    }).catch(() => {
                        this.$message.error('删除失败')
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>