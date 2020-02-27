<template>
    <div>
        <d2-crud ref="d2Crud"
                 :columns="columns"
                 :data="data"
                 add-title="新增股票"
                 :add-template="addTemplate"
                 @row-add="handleRowAdd"
                 :add-rules="addRules"
                 :rowHandle="rowHandle"
                 edit-title="修改股票"
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
                 @selection-change="handleSelectionChange"
                 @custom-emit-1="gotoInfoPage">

            <el-row slot="header" style="margin-top: 15px;margin-bottom: 5px">
                <el-input size="mini"
                          v-model="queryform.name"
                          placeholder="股票名称"
                          style="width: 200px">
                    <template slot="prepend">股票名称</template>
                </el-input>

                <el-input size="mini"
                          v-model="queryform.code"
                          placeholder="股票代码"
                          style="width: 200px">
                    <template slot="prepend">股票代码</template>
                </el-input>

                <el-button-group>
                    <el-button size="mini" type="primary" @click="fetchData">
                        <d2-icon name="search"/>
                        查询
                    </el-button>
                    <el-button size="mini" @click="handleFormReset">
                        <d2-icon name="refresh"/>
                        重置
                    </el-button>
                </el-button-group>
                <el-button-group style="float:right;">
                    <el-button size="mini"
                               type="primary"
                               icon="el-icon-circle-plus-outline"
                               @click="addRow">新增
                    </el-button>

                    <el-button size="mini"
                               type="primary"
                               icon="el-icon-download"
                               @click="stockHistory">历史数据
                    </el-button>

                    <el-button size="mini"
                               type="danger"
                               icon="el-icon-delete"
                               @click="handleRowsRemove">删除
                    </el-button>


                </el-button-group>
            </el-row>
        </d2-crud>
    </div>
</template>

<script>
    import {stockPage, stockSave, stockUpdate, stockDelete, stockHistory} from '@api/zhx.invest'

    export default {
        data() {
            return {
                // 查询条件表单
                queryform: {
                    name: '',
                    code: ''
                },
                // 表格列定义
                columns: [
                    {
                        title: '股票名称',
                        key: 'name',
                        width: '100',
                        sortable: true // 排序
                    },
                    {
                        title: '股票代码',
                        key: 'code',
                        width: '100',
                        sortable: true // 排序
                    },
                    {
                        title: '昨收',
                        key: 'closePrice',
                        width: '100'
                    },
                    {
                        title: '今开',
                        key: 'openPrice',
                        width: '100'
                    },
                    {
                        title: '现价',
                        key: 'price',
                        width: '100'
                    },
                    {
                        title: '涨幅',
                        key: 'increase',
                        width: '100'
                    },
                    {
                        title: '换手率',
                        key: 'turnover',
                        width: '100'
                    },
                    {
                        title: '成交量（手）',
                        key: 'volume',
                        width: '100'
                    },
                    {
                        title: '成交额（万）',
                        key: 'amount',
                        width: '100'
                    },

                    {
                        title: '市盈率',
                        key: 'earnings',
                        width: '100'
                    },
                    {
                        title: '市净率',
                        key: 'pb',
                        width: '100'
                    },
                    {
                        title: '流通市值',
                        key: 'gmv',
                        width: '100'
                    }
                ],
                // 表格数据
                data: [],
                // 表格样式定义
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
                    code: {
                        title: '股票代码',
                        value: ''
                    },
                    market: {
                        title: '市场',
                        value: '',
                        component: {
                            name: 'el-select',
                            options: [
                                {
                                    value: 'sh',
                                    label: '上证'
                                },
                                {
                                    value: 'sz',
                                    label: '深圳'
                                }
                            ],
                            span: 12
                        }
                    },
                    remark: {
                        title: '备注',
                        value: '',
                        component: {
                            type: 'textarea'
                        }
                    }
                },
                // 编辑表单模板
                editTemplate: {
                    code: {
                        title: '股票代码',
                        value: ''
                    },
                    market: {
                        title: '市场',
                        value: '',
                        component: {
                            name: 'el-select',
                            options: [
                                {
                                    value: 'sh',
                                    label: '上证'
                                },
                                {
                                    value: 'sz',
                                    label: '深圳'
                                }
                            ],
                            span: 12
                        }
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
                    code: [{required: true, message: '请输入股票代码', trigger: 'blur'}],
                    market: [{required: true, message: '请选择市场', trigger: 'blur'}]
                },
                // 定义操作列
                rowHandle: {
                    columnHeader: '操作',
                    width: '100',
                    fixed: 'right',//固定列
                    //编辑按钮
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
                    //删除按钮
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
                    //自定义按钮
                    custom: [
                        //明细
                        {
                            icon: 'el-icon-view',
                            circle: true,
                            type: "warning",
                            text: ' ',
                            size: 'small',
                            emit: 'custom-emit-1'
                        }
                    ]
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
                stockPage({
                    ...this.queryform,
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
                stockSave(
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
                stockUpdate(
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
                this.queryform = {}
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
                        stockDelete(ids).then(res => {
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
            },
            // 下载历史数据
            stockHistory() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请至少选择一条记录',
                        type: 'error'
                    })
                    return false
                }
                this.$confirm('确定要下载历史数据吗', '下载历史数据', {
                    type: 'warning'
                }).then(() => {
                        var ids = []
                        for (var index in this.multipleSelection) {
                            ids.push(this.multipleSelection[index]['id'])
                        }
                        this.loading = true
                        stockHistory(ids).then(res => {
                            this.$message({
                                message: '下载成功',
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
            },
            // 跳转到明细页面
            gotoInfoPage({index, row}) {
                var name = 'zhx-invest-stock-info';//路由
                var id = row.id;//ID
                this.$router.push({
                    name,
                    params: {
                        id
                    }
                })
            }
        }
    }
</script>
