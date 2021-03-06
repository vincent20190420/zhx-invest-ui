<template>
    <div>
        <d2-crud ref="d2Crud"
                 :columns="columns"
                 :data="data"
                 add-title="新增角色"
                 :add-template="addTemplate"
                 @row-add="handleRowAdd"
                 :add-rules="addRules"
                 :rowHandle="rowHandle"
                 edit-title="修改角色"
                 :edit-template="editTemplate"
                 @row-edit="handleRowEdit"
                 :form-options="formOptions"
                 @dialog-open="handleDialogOpen"
                 @dialog-cancel="handleDialogCancel"
                 :loading="loading"
                 :options="options"
                 :pagination="pagination"
                 @pagination-current-change="paginationCurrentChange"
                 selection-row
                 @selection-change="handleSelectionChange">

            <el-row slot="header" style="margin-top: 15px;margin-bottom: 5px">
                <el-input size="mini"
                          v-model="queryForm.roleName"
                          placeholder="角色名称"
                          style="width: 200px">
                    <template slot="prepend">角色名称</template>
                </el-input>

                <el-button-group>
                    <el-button size="mini" round="true" type="primary" @click="fetchData">
                        <d2-icon name="search"/>
                        查询
                    </el-button>
                    <el-button size="mini" round="true" @click="handleFormReset">
                        <d2-icon name="refresh"/>
                        重置
                    </el-button>
                </el-button-group>
                <el-button-group style="float:right;">
                    <el-button size="mini"
                               round="true"
                               type="primary"
                               icon="el-icon-circle-plus-outline" @click="addRow">
                        新增
                    </el-button>

                    <el-button size="mini"
                               round="true"
                               type="danger"
                               icon="el-icon-delete" @click="handleRowsRemove">删除
                    </el-button>

                </el-button-group>
            </el-row>
        </d2-crud>
    </div>
</template>

<script>
    import {rolePage, roleSave, roleUpdate, rolesDelete, roleDelete} from '@api/sys/role.api'

    export default {
        data() {
            return {
                // 查询条件表单
                queryForm: {
                    roleName: ''
                },
                // 表格列定义
                columns: [
                    {
                        title: '角色名称',
                        key: 'roleName',
                        sortable: true // 排序
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                // 表格数据
                data: [],
                // 表格斑马线
                options: {
                    stripe: true,//斑马线
                    height: 350 //固定表头，设置表格高度
                },
                // 加载状态
                loading: false,
                // 分页，字段命名不可修改
                pagination: {
                    currentPage: 1,
                    pageSize: 5,
                    total: 0,
                },
                // 新增表单
                addTemplate: {
                    roleName: {
                        title: '角色名称',
                        value: ''
                    },
                    remark: {
                        title: '备注',
                        value: '',
                        component: {
                            type: 'textarea'
                        }
                    }
                },
                // 定义操作列
                rowHandle: {
                    columnHeader: '操作',
                    width: '100',
                    fixed: 'right',//固定列
                    edit: {
                        icon: 'el-icon-edit',
                        circle: true,
                        type: "info",
                        text: ' ',
                        size: 'small',
                        //是否显示
                        show(index, row) {
                            if (row.showEditButton) {
                                return true
                            }
                            return true
                        },
                        // 是否禁用
                        disabled(index, row) {
                            if (row.forbidEdit) {
                                return true
                            }
                            return false
                        }
                    },
                    // remove: {
                    //     icon: 'el-icon-delete',
                    //     size: 'small',
                    //     fixed: 'right',
                    //     confirm: true,
                    //     show(index, row) {
                    //         if (row.showRemoveButton) {
                    //             return true
                    //         }
                    //         return true
                    //     },
                    //     disabled(index, row) {
                    //         if (row.forbidRemove) {
                    //             return true
                    //         }
                    //         return false
                    //     }
                    // }
                },
                // 编辑表单模板
                editTemplate: {
                    roleName: {
                        title: '角色名称',
                        value: ''
                    },
                    remark: {
                        title: '备注',
                        value: '',
                        component: {
                            type: 'textarea'
                        }
                    }
                },
                // 弹出窗样式定义
                formOptions: {
                    labelWidth: '80px',
                    labelPosition: 'left',
                    saveLoading: false
                },
                // 表单验证
                addRules: {
                    roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}]
                },
                // 选中行
                multipleSelection: []
            }
        },
        mounted() {
            this.fetchData()
        },
        methods: {
            // 跳转到指定页
            paginationCurrentChange(currentPage) {
                this.pagination.currentPage = currentPage
                this.fetchData()
            },
            // 查询数据
            fetchData() {
                this.loading = true
                rolePage({
                    ...this.queryForm,
                    ...this.pagination
                }).then(res => {
                    this.data = res.records
                    // this.pagination.total = res.total
                    this.pagination.total = res.total * 1
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
            // 新增
            handleRowAdd(row, done) {
                this.formOptions.saveLoading = true
                roleSave(
                    {
                        ...row
                    }).then(res => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                    done()
                    this.formOptions.saveLoading = false
                    this.fetchData()
                }).catch(err => {
                    console.log('err', err)
                    this.formOptions.saveLoading = false
                })
            },
            // 修改
            handleRowEdit({index, row}, done) {
                this.formOptions.saveLoading = true
                roleUpdate(
                    {
                        ...row
                    }).then(res => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                    done()
                    this.formOptions.saveLoading = false
                    this.fetchData()
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
                this.queryForm = {}
            },
            // 复选框勾选事件
            handleSelectionChange(selection) {
                this.multipleSelection = selection
            },
            // 删除
            // handleRowRemove({index, row}, done) {
            //     this.loading = true
            //     roleDelete(row.id).then(res => {
            //         this.$message({
            //             message: '删除成功',
            //             type: 'success'
            //         })
            //         done()
            //         this.fetchData()
            //         this.loading = false
            //     }).catch(err => {
            //         console.log('err', err)
            //         this.loading = false
            //     })
            // },
            // 批量删除
            handleRowsRemove() {

                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请至少选择一条记录',
                        type: 'error'
                    })
                    return false
                }
                this.$confirm('确定要删除数据吗', '删除角色', {
                    type: 'warning'
                }).then(() => {
                        var ids = []
                        for (var index in this.multipleSelection) {
                            ids.push(this.multipleSelection[index]['id'])
                        }
                        this.loading = true
                        rolesDelete(ids).then(res => {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            // done()
                            this.fetchData()
                            this.loading = false
                        }).catch(err => {
                            console.log('err', err)
                            this.loading = false
                        })
                    }
                )
            }
        }
    }
</script>
