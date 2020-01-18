import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

export function AccountLogin (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/login?username=admin&password=admin',
    method: 'post',
    data
  })
}
