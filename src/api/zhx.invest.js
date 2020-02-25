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
    url: '/invest/stock/page',
    method: 'post',
    data
  })
}

// 新增
export function stockSave (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/invest/stock/save',
    method: 'post',
    data
  })
}

// 修改
export function stockUpdate(data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/invest/stock/update',
    method: 'post',
    data
  })
}

// 删除
export function stockDelete(data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/invest/stock/deleteBatch',
    method: 'post',
    data
  })
}

// 下载历史数据
export function importHistoryData(data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/invest/stockHistory/importHistoryData',
    method: 'post',
    data
  })
}

