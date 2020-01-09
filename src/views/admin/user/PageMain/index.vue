<template>
    <div>
        <el-form
                :inline="true"
                size="mini">
            <el-form-item :label="`已选数据下载 [ ${currentTableData.length} ]`">
                <el-button-group>
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="currentTableData.length === 0"
                            @click="handleDownloadXlsx(currentTableData)">
                        xlsx
                    </el-button>
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="currentTableData.length === 0"
                            @click="handleDownloadCsv(currentTableData)">
                        csv
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

            <el-table-column label="用户名" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.username}}
                </template>
            </el-table-column>

            <el-table-column label="手机" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.mobile}}
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
    data () {
      return {
        rules2: {
          project: [{ required: true, message: '项目名不能为空', trigger: 'change' }],
          projectCN: [{ required: true, message: '项目中文名不能为空', trigger: 'change' }],
          mainPackage: [{ required: true, message: '主包名不能为空', trigger: 'change' }]
        },
        currentTableData: [],
        multipleSelection: [],
        columns: [
          { label: '表名', prop: 'tableName' },
          { label: '说明', prop: 'tableComment' }
        ]
      }
    },
    watch: {
      tableData: {
        handler (val) {
          this.currentTableData = val
        },
        immediate: true
      }
    },
    methods: {

      handleSwitchChange (val, index) {
        const oldValue = this.currentTableData[index]
        this.$set(this.currentTableData, index, {
          ...oldValue,
          type: val
        })
        // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },

    handleDownloadXlsx (data) {
        this.$export.excel({
            title: 'D2Admin 表格示例',
            columns: this.downloadColumns,
            data: this.downloadDataTranslate(data)
        })
            .then(() => {
                this.$message('导出表格成功')
            })
    },
    handleDownloadCsv (data) {
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
