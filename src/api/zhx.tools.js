import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

export function tableList (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/generator/list',
    method: 'post',
    data
  })
}

export function genCode (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/generator/code',
    method: 'post',
    data
  })
}
