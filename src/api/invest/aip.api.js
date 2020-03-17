import request from '@/plugin/axios'

var ZHX_BASE_URL = 'http://localhost:8081'

/**
 * 分页查询定投计划
 */
export function  AipPage (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/st/aip/page',
        method: 'post',
        data
    })
}

/**
 *  新增定投计划
 */
export function AipSave (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/st/aip/save',
        method: 'post',
        data
    })
}

/**
 *  修改定投计划
 */
export function AipUpdate (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/st/aip/update',
        method: 'post',
        data
    })
}

/**
 * 批量删除定投计划
 */
export function AipDelete (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/st/aip/deleteBatch',
        method: 'post',
        data
    })
}
