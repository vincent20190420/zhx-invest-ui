import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:1000'

export function TableList (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/api/generator/list',
    method: 'post',
    data
  })
}

export function genCode (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/api/generator/code',
    method: 'post',
    data
  })
}
