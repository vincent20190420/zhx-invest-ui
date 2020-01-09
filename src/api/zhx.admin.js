import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

export function page (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/sys/user/page',
        method: 'post',
        data
    })
}

