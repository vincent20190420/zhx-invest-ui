<template>
    <div>
        <el-form
                :inline="true"
                size="mini">
            <!--<el-form-item label="项目名" prop="project">-->
                <!--<el-input-->
                        <!--v-model="form.project"-->
                        <!--placeholder="项目名"-->
                        <!--style="width: 100px;"/>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="项目中文名" prop="projectCN">-->
                <!--<el-input-->
                        <!--v-model="form.projectCN"-->
                        <!--placeholder="项目中文名"-->
                        <!--style="width: 100px;"/>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="主包名" prop="mainPackage">-->
                <!--<el-input-->
                        <!--v-model="form.mainPackage"-->
                        <!--placeholder="主包名"-->
                        <!--style="width: 100px;"/>-->
            <!--</el-form-item>-->

            <el-form-item :label="`选中 [ ${multipleSelection.length} ]`">
                <el-button-group>
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="multipleSelection.length === 0"
                            @click="handleDownloadXlsx(multipleSelection)">
                        生成代码
                    </el-button>
                </el-button-group>
            </el-form-item>

        </el-form>

        <el-table
                :data="currentTableData"
                v-loading="loading"
                size="mini"
                stripe
                style="width: 100%;"
                @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column label="表名" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.tableName}}
                </template>
            </el-table-column>

            <el-table-column label="说明" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.tableComment}}
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    import BooleanControl from '../BooleanControl'
    import BooleanControlMini from '../BooleanControlMini'

    export default {
        components: {
            BooleanControl,
            BooleanControlMini
        },
        props: {
            tableData: {
                default: () => []
            },
            loading: {
                default: false
            }
        },
        data() {
            return {
                currentTableData: [],
                multipleSelection: [],
                downloadColumns: [
                    {label: '表名', prop: 'tableName'},
                    {label: '说明', prop: 'tableComment'}
                ]
            }
        },
        watch: {
            tableData: {
                handler(val) {
                    this.currentTableData = val
                },
                immediate: true
            }
        },
        methods: {
            handleSwitchChange(val, index) {
                const oldValue = this.currentTableData[index]
                this.$set(this.currentTableData, index, {
                    ...oldValue,
                    type: val
                })
                // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            downloadDataTranslate(data) {
                return data.map(row => ({
                    ...row,
                    type: row.type ? '禁用' : '正常',
                    used: row.used ? '已使用' : '未使用'
                }))
            },
            handleDownloadXlsx(data) {
                this.$export.excel({
                    title: 'D2Admin 表格示例',
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(data)
                })
                    .then(() => {
                        this.$message('导出表格成功')
                    })
            },
            handleDownloadCsv(data) {
                this.$export.csv({
                    title: 'D2Admin 表格示例',
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(data)
                })
                    .then(() => {
                        this.$message('导出CSV成功')
                    })
            }
        }
    }
</script>
