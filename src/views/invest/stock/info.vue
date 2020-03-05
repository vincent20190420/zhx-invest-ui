<template>
    <d2-container
            type="card"
            class="page">
        <el-divider content-position="left">基本信息</el-divider>
        <el-form
                ref="form"
                :model="baseInfoForm"
                label-width="120px"
                class="page--form"
                disabled="disabled">
            <!-- span=6 4列 span=8 3列 span=12 2列 span=24 1列 -->
            <el-row>
                <el-col span="6">
                    <el-form-item label="股票名称">
                        <el-input v-model="baseInfoForm.name"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="股票编码">
                        <el-input v-model="baseInfoForm.code"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-divider content-position="left">统计数据</el-divider>
        <el-form
                ref="form"
                :model="countInfoForm"
                label-width="120px"
                class="page--form"
                disabled="disabled">
            <el-row>
                <el-col span="6">
                    <el-form-item label="交易天数">
                        <el-input v-model="countInfoForm.days"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="6">
                    <el-form-item label="上涨天数">
                        <el-input v-model="countInfoForm.upDays"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="下跌天数">
                        <el-input v-model="countInfoForm.downDays"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="平收天数">
                        <el-input v-model="countInfoForm.flatDays"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="6">
                    <el-form-item label="上涨概率">
                        <el-input v-model="countInfoForm.upRatio"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="下跌概率">
                        <el-input v-model="countInfoForm.downRatio"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="平收概率">
                        <el-input v-model="countInfoForm.flatRatio"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="6">
                    <el-form-item label="上涨超1%天数">
                        <el-input v-model="countInfoForm.gt1days"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="上涨超2%天数">
                        <el-input v-model="countInfoForm.gt2days"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="上涨超3%天数">
                        <el-input v-model="countInfoForm.gt3days"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="涨停天数">
                        <el-input v-model="countInfoForm.gt998days"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="6">
                    <el-form-item label="下跌超1%天数">
                        <el-input v-model="countInfoForm.lt1days"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="下跌超2%天数">
                        <el-input v-model="countInfoForm.lt2days"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="下跌超3%天数">
                        <el-input v-model="countInfoForm.lt3days"/>
                    </el-form-item>
                </el-col>
                <el-col span="6">
                    <el-form-item label="跌停天数">
                        <el-input v-model="countInfoForm.lt998days"/>
                    </el-form-item>
                </el-col>
            </el-row>
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
            max-width: 1000px;
        }
    }
</style>
