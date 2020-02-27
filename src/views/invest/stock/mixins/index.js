import { stockInfo } from '@api/zhx.invest'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: ''
      }
    }
  },
  methods: {
    // [业务逻辑] 重置表单
    resetFormData () {
      this.form = {
        name: '',
        code: ''
      }
    },
    // [业务逻辑] 根据 id 获取数据
    getFormData (id) {
      return new Promise((resolve, reject) => {
        // 重置表单
        this.resetFormData()
        // 请求数据
        stockInfo(id)
          .then(res => {
            const { name, code } = res.baseInfo
            this.form = { name, code }
            this.$message.success('获取股票明细')
            resolve()
          })
          .catch(err => {
            console.log('err', err)
            reject(err)
          })
      })
    },
    // [业务逻辑] 提交
    // handleSubmit () {
    //   this.$notify({
    //     title: 'Submit',
    //     message: '提交了表单',
    //     type: 'info'
    //   })
    // }
  }
}
