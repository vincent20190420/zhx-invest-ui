import request from '@/plugin/axios'

export function TableList (data) {
  return request({
    // baseURL: 'localhost:1000',
    url: '/generator/list',
    method: 'post',
    data
  })
}
