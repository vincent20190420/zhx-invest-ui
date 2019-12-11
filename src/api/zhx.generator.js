import request from '@/plugin/axios'

export function TableList (data) {
  return request({
    // baseURL: 'localhost:1000',
    url: 'http://localhost:1000/generator/list',
    method: 'post',
    data
  })
}
