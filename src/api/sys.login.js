import request from '@/plugin/axios'
import querystring from 'querystring'

var ZHX_BASE_URL = 'http://localhost:8081'

export function AccountLogin (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/oauth/token?grant_type=password&client_id=client&client_secret=secret&' + querystring.stringify(data),
    method: 'post'
  })
}
