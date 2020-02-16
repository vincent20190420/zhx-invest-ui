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
                      v-model="form.roleName"
                      placeholder="角色名称"
                      style="width: 120px;margin-top: 15px;margin-bottom: 5px"/>


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
  import { rolePage } from '@api/zhx.admin'

  export default {
    data () {
      return {
        form: {
          roleName: ''
        },
        columns: [
          {
            title: '角色名称',
            key: 'roleName',
            sortable: true
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        data: [],
        options: {
          stripe: true
        },
        loading: true,
        loadingOptions: {
            text: '拼命加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
        },
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
          remark: {
            title: '备注',
            value: ''
          }
        },
        formOptions: {
          labelWidth: '80px',
          labelPosition: 'left',
          saveLoading: false
        }
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      paginationCurrentChange (current) {
        this.pagination.current = current
        this.fetchData()
      },
      fetchData () {
        this.loading = true
        rolePage({
          ...this.form,
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
      // 传入自定义模板的新增
      addRowWithNewTemplate () {
        this.$refs.d2Crud.showDialog({
          mode: 'add',
          template: {
            roleName: {
              title: '角色名称',
              value: ''
            }
          }
        })
      },
      handleRowAdd (row, done) {
        this.formOptions.saveLoading = true
        setTimeout(() => {
          console.log(row)
          this.$message({
            message: '保存成功',
            type: 'success'
          })

          // done可以传入一个对象来修改提交的某个字段
          done({
            address: '我是通过done事件传入的数据！'
          })
          this.formOptions.saveLoading = false
        }, 300)
      },
      handleDialogCancel (done) {
        this.$message({
          message: '取消保存',
          type: 'warning'
        })
        done()
      },
      handleSelectionChange (selection) {
        alert(selection)
      }
    }
  }
</script>
