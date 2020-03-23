import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

/**
 * 股票信息API
 * @param data
 * @constructor
 */
// 分页查询
export function stockPage (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/im/stock/page',
    method: 'post',
    data
  })
}

// 新增
export function stockSave (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/im/stock/saveStock',
    method: 'post',
    data
  })
}

// 删除
export function stockDelete(data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/im/stock/deleteBatch',
    method: 'post',
    data
  })
}

// 下载历史数据
export function stockHistory(data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/im/stockHistory/importHistoryData',
    method: 'post',
    data
  })
}

// 获取股票明细
export function stockInfo(data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/im/stock/getStockInfo/'+data,
    method: 'get',
    data
  })
}

