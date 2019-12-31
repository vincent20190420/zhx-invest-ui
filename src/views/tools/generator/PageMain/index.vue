<template>
    <div>
        <el-form
                :model="form2"
                :rules="rules2"
                :inline="true"
                ref="form2"
                size="mini">
            <el-form-item label="项目名" prop="project">
                <el-input
                        v-model="form2.project"
                        placeholder="项目名"
                        style="width: 100px;"/>
            </el-form-item>
            <el-form-item label="项目中文名" prop="projectCN">
                <el-input
                        v-model="form2.projectCN"
                        placeholder="项目中文名"
                        style="width: 100px;"/>
            </el-form-item>
            <el-form-item label="主包名" prop="mainPackage">
                <el-input
                        v-model="form2.mainPackage"
                        placeholder="主包名"
                        style="width: 160px;"/>
            </el-form-item>

            <el-form-item :label="`选中 [ ${multipleSelection.length} ]`">
                <el-button-group>
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="multipleSelection.length === 0"
                            @click="genCode(multipleSelection)">
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
                form2: {
                    project: "admin",
                    projectCN: "系统管理",
                    mainPackage: "com.zhxsoft",
                    tables: ""
                },
                rules2: {
                    project: [{required: true, message: '项目名不能为空', trigger: 'change'}],
                    projectCN: [{required: true, message: '项目中文名不能为空', trigger: 'change'}],
                    mainPackage: [{required: true, message: '主包名不能为空', trigger: 'change'}]
                },
                currentTableData: [],
                multipleSelection: [],
                columns: [
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
            genCode(data) {
                this.$refs.form2.validate((valid) => {
                    if (valid) {
                        this.form2.tables = data;
                        console.debug("form2:"+JSON.stringify(this.form2));
                        this.$emit('submit', this.form2)
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '表单校验失败'
                        })
                        return false
                    }
                })
            },

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
            }
        }
    }
</script>
