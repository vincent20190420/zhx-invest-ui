import request from '@/plugin/axios'

var zhx_base_url = 'http://localhost:1000'

export function TableList (data) {
  return request({
    baseURL: zhx_base_url,
    url: '/api/generator/list',
    method: 'post',
    data
  })
}

export function genCode (data) {
  return request({
    baseURL: zhx_base_url,
    url: '/api/generator/code',
    method: 'get',
    data
  })
}
