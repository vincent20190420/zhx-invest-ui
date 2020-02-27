<template>
    <d2-container
            type="card"
            class="page">
        <el-divider content-position="left">基本信息</el-divider>
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
                class="page--form"
                disabled="disabled">
            <el-row>
                <el-col span="10">
                    <el-form-item label="股票名称">
                        <el-input v-model="form.name"/>
                    </el-form-item>
                </el-col>
                <el-col span="10">
                    <el-form-item label="股票编码">
                        <el-input v-model="form.code"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="handleSubmit">修改</el-button>-->
            <!--</el-form-item>-->
        </el-form>
    </d2-container>
</template>

<script>
  import base from './mixins/index'

  export default {
    mixins: [
      base
    ],
    // 第一次进入或从其他组件对应路由进入时触发
    beforeRouteEnter (to, from, next) {
      const id = to.params.id
      if (id) {
        next(instance => {
          instance.resetFormData()
          instance.getFormData(id)
        })
      } else {
        next(new Error('未指定ID'))
      }
    },
    // 在同一组件对应的多个路由间切换时触发
    beforeRouteUpdate (to, from, next) {
      const id = to.params.id
      if (id) {
        this.resetFormData()
        this.getFormData(id)
        next()
      } else {
        next(new Error('未指定ID'))
      }
    }
  }
</script>

<style lang="scss">
    .page {
        .page--form {
            max-width: 460px;
        }
    }
</style>
