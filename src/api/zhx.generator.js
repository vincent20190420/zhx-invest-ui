import request from '@/plugin/axios'

export function TableList (data) {
  return request({
    url: '/api/generator/list',
    method: 'post',
    data
  })
}
