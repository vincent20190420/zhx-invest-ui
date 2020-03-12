<template>
    <div>
        <d2-crud ref="d2Crud"
                 :columns="columns"
                 :data="data"
                 :loading="loading"
                 :options="options"
                 :pagination="pagination"
                 @pagination-current-change="paginationCurrentChange"
                 @pagination-size-change="paginationSizeChange"
                 selection-row
                 @selection-change="handleSelectionChange">

            <el-row slot="header" style="margin-top: 15px;margin-bottom: 5px">

                <el-input size="mini"
                          v-model="queryForm.service"
                          placeholder="数据库名"
                          style="width: 200px">
                    <template slot="prepend">数据库名</template>
                </el-input>


                <el-input size="mini"
                          v-model="queryForm.tableName"
                          placeholder="表名"
                          style="width: 200px">
                    <template slot="prepend">表名</template>
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
            </el-row>

            <el-row slot="header" style="margin-top: 15px;margin-bottom: 5px">

                <el-input size="mini"
                          v-model="genForm.project"
                          placeholder="项目命名"
                          style="width: 200px">
                    <template slot="prepend">项目命名</template>
                </el-input>


                <el-input size="mini"
                          v-model="genForm.mainPath"
                          placeholder="主包名"
                          style="width: 200px">
                    <template slot="prepend">主包名</template>
                </el-input>

                <el-button-group>
                    <el-button size="mini"
                               type="primary"
                               icon="el-icon-circle-plus-outline"
                               @click="genCode">生成代码
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
        queryForm: {
          service: 'zhx-admin',
          tableName: 'st_'
        },
        // 生成代码参数表单
        genForm: {
          service: '',
          project: 'admin',
          mainPath: 'com.zhxsoft',
          tables: ''
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
          },
          {
            title: '引擎',
            key: 'engine',
          },
          {
            title: '创建时间',
            key: 'createTime',
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
          total: 0
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
      // 切换每页条数
      paginationSizeChange (pageSize) {
        this.pagination.pageSize = pageSize
        this.fetchData()
      },
      // 查询数据
      fetchData () {
        this.loading = true
        tableList({
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
      // 生成代码
      genCode () {

        if (this.multipleSelection.length == 0) {
          this.$message({
            message: '请至少选择一条记录',
            type: 'error'
          })
          return false
        }
        this.loading = true
        var tables = []
        for (var index in this.multipleSelection) {
          tables.push(this.multipleSelection[index]['tableName'])
        }
        this.genForm.tables = tables
        this.genForm.service = this.queryForm.service

        genCode(
          {
            ...this.genForm
          }).then(res => {
          this.$message({
            message: '生成代码成功',
            type: 'success'
          })
          this.loading = false

          console.log("===>"+res)

          const blob = new Blob([res], { type: 'application/zip;charset=utf-8' })

          // const fileName = res.headers["Content-Disposition"].split(";")[1].split("=")[1];//下载的文件名称及其后缀，后缀要和后台保持的一致
          const fileName = 'code.zip'//下载的文件名称及其后缀，后缀要和后台保持的一致
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          // const url = window.URL.createObjectURL(blob)
          // window.location.href = url

        }).catch(err => {
          console.log('err', err)
          this.loading = false
        })
      },
      // 重置查询条件
      handleFormReset () {
        this.queryForm = {}
      },
      // 复选框勾选事件
      handleSelectionChange (selection) {
        this.multipleSelection = selection
      }
    }
  }
</script>
