import { stockInfo } from '@api/im/stock.api'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      baseInfoForm: {
        name: '',
        code: '',
        price: '',
        increase: '',

      },
      countInfoForm: {
        days: '',
        upDays: '',
        downDays: '',
        flatDays: '',
        upRatio: '',
        downRatio: '',
        flatRatio: '',
        gt1days: '',
        gt2days: '',
        gt3days: '',
        gt998days: '',
        lt1days: '',
        lt2days: '',
        lt3days: '',
        lt998days: '',
      }
    }
  },
  methods: {
    // [业务逻辑] 重置表单
    resetFormData () {
      this.baseInfoForm = {}
      this.countInfoForm = {}
    },
    // [业务逻辑] 根据 id 获取数据
    getFormData (id) {
      return new Promise((resolve, reject) => {
        // 重置表单
        this.resetFormData()
        // 请求数据
        stockInfo(id)
          .then(res => {
            const { name, code } = res.stockInfo
            const { days, upDays, downDays, flatDays, upRatio, downRatio, flatRatio, gt1days, gt2days, gt3days, gt998days, lt1days, lt2days, lt3days, lt998days } = res.stockCount
            this.baseInfoForm = { name, code }
            this.countInfoForm = {
              days,
              upDays,
              downDays,
              flatDays,
              upRatio,
              downRatio,
              flatRatio,
              gt1days,
              gt2days,
              gt3days,
              gt998days,
              lt1days,
              lt2days,
              lt3days,
              lt998days
            }
            this.$message.success('获取股票明细：' + this.baseInfoForm.name)
            resolve()
          })
          .catch(err => {
            console.log('err', err)
            reject(err)
          })
      })
    }
  }
}
