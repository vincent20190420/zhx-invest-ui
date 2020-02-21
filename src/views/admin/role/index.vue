<template>
    <div>
        <d2-crud ref="d2Crud"
                 :columns="columns"
                 :data="data"
                 add-title="新增角色"
                 :add-template="addTemplate"
                 :form-options="formOptions"
                 @dialog-open="handleDialogOpen"
                 @row-add="handleRowAdd"
                 @dialog-cancel="handleDialogCancel"
                 :loading="loading"
                 :loading-options="loadingOptions"
                 :pagination="pagination"
                 @pagination-current-change="paginationCurrentChange"
                 :options="options"
                 selection-row
                 @selection-change="handleSelectionChange">

            <el-input slot="header" size="mini"
                      v-model="queryform.roleName"
                      placeholder="角色名称"
                      style="width: 200px;margin-top: 15px;margin-bottom: 5px">
                <template slot="prepend">角色名称</template>
            </el-input>

            <el-input slot="header" size="mini"
                      v-model="queryform.roleCode"
                      placeholder="角色编码"
                      style="width: 200px;margin-top: 15px;margin-bottom: 5px">
                <template slot="prepend">角色编码</template>
            </el-input>

            <el-button slot="header" size="mini"
                       type="primary"
                       @click="fetchData">
                <d2-icon name="search"/>
                查询
            </el-button>

            <el-button slot="header" size="mini"
                       @click="handleFormReset">
                <d2-icon name="refresh"/>
                重置
            </el-button>

            <el-button slot="header" size="mini" style="float:right;margin-top: 15px;margin-bottom: 5px" type="danger"
                       icon="el-icon-delete"
                       @click="addRow">
                删除
            </el-button>
            <el-button slot="header" size="mini" style="float:right;margin-top: 15px;margin-bottom: 5px" type="primary"
                       icon="el-icon-edit"
                       @click="addRow">
                <d2-icon name="new"/>
                新增
            </el-button>
            <!--<el-button slot="header"  size="mini" style="margin-bottom: 5px" @click="addRowWithNewTemplate">使用自定义模板新增</el-button>-->
        </d2-crud>
    </div>
</template>

<script>
    import {rolePage, roleSave} from '@api/zhx.admin'

    export default {
        data() {
            return {
                queryform: {
                    roleName: '',
                    roleCode: ''
                },
                columns: [
                    {
                        title: '角色名称',
                        key: 'roleName',
                        sortable: true
                    },
                    {
                        title: '角色编码',
                        key: 'roleCode',
                        sortable: true
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data: [],
                loading: false,
                pagination: {
                    current: 1,
                    size: 5,
                    total: 0
                },
                addTemplate: {
                    roleName: {
                        title: '角色名称',
                        value: ''
                    },
                    roleCode: {
                        title: '角色编码',
                        value: ''
                    },
                    remark: {
                        title: '备注',
                        value: ''
                    }
                },
                formOptions: {
                    labelWidth: '80px',
                    labelPosition: 'left',
                    saveLoading: false
                },
                addRules: {
                    roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
                    roleCode: [{required: true, message: '请输入角色编码', trigger: 'blur'}]
                }
            }
        },
        mounted() {
            this.fetchData()
        },
        methods: {
            // 跳转到指定页
            paginationCurrentChange(current) {
                this.pagination.current = current
                this.fetchData()
            },
            // 查询数据
            fetchData() {
                this.loading = true
                rolePage({
                    ...this.queryform,
                    ...this.pagination
                }).then(res => {
                    this.data = res.records
                    // this.pagination.total = res.total
                    this.pagination.total = 1
                    this.loading = false
                }).catch(err => {
                    console.log('err', err)
                    this.loading = false
                })
            },
            // 打开模态窗
            handleDialogOpen({mode}) {
                this.$message({
                    message: '打开模态框，模式为：' + mode,
                    type: 'success'
                })
            },
            // 普通的新增
            addRow() {
                this.$refs.d2Crud.showDialog({
                    mode: 'add'
                })
            },
            // 保存
            handleRowAdd(row, done) {
                this.formOptions.saveLoading = true
                roleSave(
                    {
                        roleName: this.addTemplate.roleName.value,
                        roleCode: this.addTemplate.roleCode.value,
                        remark: this.addTemplate.remark.value
                    }).then(res => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                    done()
                    this.formOptions.saveLoading = false
                    this.fetchData();
                }).catch(err => {
                    console.log('err', err)
                    this.formOptions.saveLoading = false
                })
            },
            //  取消保存
            handleDialogCancel(done) {
                this.$message({
                    message: '取消保存',
                    type: 'warning'
                })
                done()
            },
            // 重置查询条件
            handleFormReset() {
                this.queryform = {}
            },
            handleSelectionChange(selection) {
                alert(selection)
            }
        }
    }
</script>
