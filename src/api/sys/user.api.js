import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

/**
 * 用户管理API
 * @param data
 */
export function page (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/user/page',
    method: 'post',
    data
  })
}
