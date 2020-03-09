<template>
    <div>
        <d2-crud ref="d2Crud"
                 :columns="columns"
                 :data="data"
                 add-title="生成代码"
                 :add-template="addTemplate"
                 @row-add="handleRowAdd"
                 :add-rules="addRules"
                 :rowHandle="rowHandle"
                 :form-options="formOptions"
                 @dialog-open="handleDialogOpen"
                 @dialog-cancel="handleDialogCancel"
                 :loading="loading"
                 :options="options"
                 :pagination="pagination"
                 @pagination-current-change="paginationCurrentChange"
                 selection-row
                 @selection-change="handleSelectionChange"
                 >

            <el-row slot="header" style="margin-top: 15px;margin-bottom: 5px">
                <el-input size="mini"
                          v-model="queryform.host"
                          placeholder="IP地址"
                          style="width: 200px">
                    <template slot="prepend">IP地址</template>
                </el-input>

                <el-input size="mini"
                          v-model="queryform.port"
                          placeholder="端口"
                          style="width: 200px">
                    <template slot="prepend">端口</template>
                </el-input>

                <el-input size="mini"
                          v-model="queryform.service"
                          placeholder="数据库名"
                          style="width: 200px">
                    <template slot="prepend">数据库名</template>
                </el-input>

                <el-input size="mini"
                          v-model="queryform.username"
                          placeholder="用户名"
                          style="width: 200px">
                    <template slot="prepend">用户名</template>
                </el-input>

                <el-input size="mini"
                          v-model="queryform.password"
                          placeholder="密码"
                          style="width: 200px">
                    <template slot="prepend">密码</template>
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
                               @click="addRow">生成代码
                    </el-button>
                </el-button-group>
            </el-row>
        </d2-crud>
    </div>
</template>

<script>
  import { tableList, genCode } from '@api/zhx.tools'

  export default {
    data () {
      return {
        // 查询条件表单
        queryform: {
          host: 'localhost',
          port: '3600',
          service: 'zhx-admin',
          username: 'root',
          password: 'root'

        },
        // 表格列定义
        columns: [
          {
            title: '表名',
            key: 'tableName',
            sortable: true // 排序
          },
          {
            title: '注释',
            key: 'tableComment',
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
          project: {
            title: '项目名称',
            value: ''
          },
          projectCN: {
            title: '项目中文名',
            value: ''
          },
          mainPackage: {
            title: '主包名',
            value: ''
          }
        },
        // 弹出窗样式定义
        formOptions: {
          labelWidth: '120px',
          labelPosition: 'left',
          saveLoading: false
        },
        // 表单验证
        addRules: {
          project: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
          projectCN: [{ required: true, message: '请输入项目中文名称', trigger: 'blur' }],
          mainPackage: [{ required: true, message: '请输入主包名', trigger: 'blur' }]
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
        tableList({
          ...this.queryform,
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
        genCode(
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
      handleRowEdit ({ index, row }, done) {
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
        this.queryform = {}
      },
      // 复选框勾选事件
      handleSelectionChange (selection) {
        this.multipleSelection = selection
      }
    }
  }
</script>
