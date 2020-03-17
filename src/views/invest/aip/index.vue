<template>
    <div>
        <d2-crud ref="d2Crud"
                 :columns="columns"
                 :data="data"
                 add-title="新增定投计划"
                 :add-template="addTemplate"
                 @row-add="handleRowAdd"
                 :add-rules="addRules"
                 :rowHandle="rowHandle"
                 edit-title="修改定投计划"
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
                          v-model="queryForm.remark"
                          placeholder="备注"
                          style="width: 200px">
                    <template slot="prepend">备注</template>
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
  import { AipSave, AipDelete, AipUpdate, AipPage } from '@api/invest/aip.api'

  export default {
    data () {
      return {
        // 查询条件表单
        queryForm: {
          remark: ''
        },
        // 表格列定义
        columns: [
          {
            title: '投资标的名称',
            key: 'name',
            sortable: true // 排序
          },
          {
            title: '投资标的代码',
            key: 'code',
            sortable: true // 排序
          },
          {
            title: '最高价',
            key: 'highestPrice',
            sortable: true // 排序
          },
          {
            title: '定投跌幅',
            key: 'downRatio',
            sortable: true // 排序
          },
          {
            title: '定投价格',
            key: 'aipPrice',
            sortable: true // 排序
          },
          {
            title: '本金',
            key: 'capital',
            sortable: true // 排序
          },
          {
            title: '定投次数',
            key: 'times',
            sortable: true // 排序
          },
          {
            title: '备注',
            key: 'remark',
            sortable: true // 排序
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
        // 定义操作列
        rowHandle: {
          columnHeader: '操作',
          width: '100',
          fixed: 'right',//固定列
          edit: {
            icon: 'el-icon-edit',
            circle: true,
            type: 'info',
            text: ' ',
            size: 'small',
            //是否显示
            show (index, row) {
              if (row.showEditButton) {
                return true
              }
              return true
            },
            // 是否禁用
            disabled (index, row) {
              if (row.forbidEdit) {
                return true
              }
              return false
            }
          },
        },
        // 新增表单
        addTemplate: {
          name: {
            title: '投资标的名称',
            value: ''
          },
          code: {
            title: '投资标的代码',
            value: ''
          },
          highestPrice: {
            title: '最高价',
            value: ''
          },
          downRatio: {
            title: '定投跌幅',
            value: ''
          },
          aipPrice: {
            title: '定投价格',
            value: ''
          },
          capital: {
            title: '本金',
            value: ''
          },
          times: {
            title: '定投次数',
            value: ''
          },
          remark: {
            title: '备注',
            value: ''
          },
        },

        // 编辑表单模板
        editTemplate: {
          name: {
            title: '投资标的名称',
            value: ''
          },
          code: {
            title: '投资标的代码',
            value: ''
          },
          highestPrice: {
            title: '最高价',
            value: ''
          },
          downRatio: {
            title: '定投跌幅',
            value: ''
          },
          aipPrice: {
            title: '定投价格',
            value: ''
          },
          capital: {
            title: '本金',
            value: ''
          },
          times: {
            title: '定投次数',
            value: ''
          },
          remark: {
            title: '备注',
            value: ''
          },
        },
        // 弹出窗样式定义
        formOptions: {
          labelWidth: '80px',
          labelPosition: 'left',
          saveLoading: false
        },
        // 表单验证
        addRules: {
          remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
        },
        // 选中行
        multipleSelection: []
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      // 跳转到指定页
      paginationCurrentChange (currentPage) {
        this.pagination.currentPage = currentPage
        this.fetchData()
      },
      // 查询数据
      fetchData () {
        this.loading = true
        AipPage({
          ...this.queryForm,
          ...this.pagination
        }).then(res => {
          this.data = res.records
          this.pagination.total = res.total * 1
          this.loading = false
        }).catch(err => {
          console.log('err', err)
          this.loading = false
        })
      },
      // 打开模态窗
      handleDialogOpen ({ mode }) {
        this.$message({
          message: '打开模态框，模式为：' + mode,
          type: 'success'
        })
      },
      // 普通的新增
      addRow () {
        this.$refs.d2Crud.showDialog({
          mode: 'add'
        })
      },
      // 新增
      handleRowAdd (row, done) {
        this.formOptions.saveLoading = true
        AipSave({
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
      handleRowEdit ({ index, row }, done) {
        this.formOptions.saveLoading = true
        AipUpdate({
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
      handleDialogCancel (done) {
        this.$message({
          message: '取消保存',
          type: 'warning'
        })
        done()
      },
      // 重置查询条件
      handleFormReset () {
        this.queryForm = {}
      },
      // 复选框勾选事件
      handleSelectionChange (selection) {
        this.multipleSelection = selection
      },
      // 批量删除
      handleRowsRemove () {
        if (this.multipleSelection.length == 0) {
          this.$message({
            message: '请至少选择一条记录',
            type: 'error'
          })
          return false
        }
        this.$confirm('确定要删除数据吗', '删除定投计划', {
          type: 'warning'
        }).then(() => {
          var ids = []
          for (var index in this.multipleSelection) {
            ids.push(this.multipleSelection[index]['id'])
          }
          this.loading = true
          AipDelete(ids).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
            this.loading = false
          }).catch(err => {
            console.log('err', err)
            this.loading = false
          })
        })
      }
    }
  }
</script>
