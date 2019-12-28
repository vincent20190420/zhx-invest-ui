<template>
    <el-form
            :inline="true"
            :model="form"
            :rules="rules"
            ref="form"
            size="mini"
            style="margin-bottom: -18px;">

        <el-form-item label="数据库类型" prop="dbType">
            <el-select
                    v-model="form.type"
                    placeholder="数据库类型"
                    style="width: 80px;">
                <el-option label="mysql" value="mysql"/>
                <el-option label="oracle" value="oracle"/>
            </el-select>
        </el-form-item>

        <el-form-item label="数据库地址" prop="host">
            <el-input
                    v-model="form.host"
                    placeholder="数据库地址"
                    style="width: 120px;"/>
        </el-form-item>

        <el-form-item label="数据库名称" prop="service">
            <el-input
                    v-model="form.service"
                    placeholder="数据库名称"
                    style="width: 120px;"/>
        </el-form-item>

        <el-form-item label="用户名" prop="user">
            <el-input
                    v-model="form.user"
                    placeholder="用户名"
                    style="width: 60px;"/>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input
                    v-model="form.password"
                    placeholder="密码"
                    style="width: 60px;"/>
        </el-form-item>

        <el-form-item label="表名" prop="tableName">
            <el-input
                    v-model="form.tableName"
                    placeholder="表名"
                    style="width: 80px;"/>
        </el-form-item>

        <el-form-item>
            <el-button
                    type="primary"
                    @click="handleFormSubmit">
                <d2-icon name="search"/>
                查询
            </el-button>
        </el-form-item>

        <!--<el-form-item>-->
            <!--<el-button-->
                    <!--@click="handleFormReset">-->
                <!--<d2-icon name="refresh"/>-->
                <!--重置-->
            <!--</el-button>-->
        <!--</el-form-item>-->

    </el-form>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          type: 'mysql',
          host: 'localhost',
          service: 'es-admin',
          user: 'root',
          password: 'root'
        },
        rules: {
          type: [{ required: true, message: '请选择一个数据库类型', trigger: 'change' }],
          host: [{ required: true, message: '请输入数据库地址', trigger: 'change' }],
          user: [{ required: true, message: '请输入用户名', trigger: 'change' }],
          password: [{ required: true, message: '请输入密码', trigger: 'change' }]
        }
      }
    },
    methods: {
      handleFormSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('submit', this.form)
          } else {
            this.$notify.error({
              title: '错误',
              message: '表单校验失败'
            })
            return false
          }
        })
      },
      handleFormReset () {
        this.$refs.form.resetFields()
      }
    }
  }
</script>
