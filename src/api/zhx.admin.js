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

/**
 * 角色管理API
 */
// 分页查询
export function rolePage (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/role/page',
    method: 'post',
    data
  })
}

// 新增角色
export function roleSave (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/role/save',
    method: 'post',
    data
  })
}

// 修改角色
export function roleUpdate (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/role/update',
        method: 'post',
        data
    })
}

//批量删除角色
export function rolesDelete (data) {
  return request({
    baseURL: ZHX_BASE_URL,
    url: '/role/delete',
    method: 'post',
    data
  })
}

//删除角色
export function roleDelete (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/role/delete',
        method: 'post',
        data
    })
}
