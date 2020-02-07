import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

export function page(data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/user/page',
        method: 'post',
        data
    })
}

/**
 * 角色管理API
 */
export function rolePage(data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/role/page',
        method: 'post',
        data
    })
}

