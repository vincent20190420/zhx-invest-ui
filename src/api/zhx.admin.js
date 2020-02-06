import request from '@/plugin/axios'
// import util from '@/libs/util.js'

var ZHX_BASE_URL = 'http://localhost:8081'

// request.interceptors.request.use(
//     config => {
//         // 判断是否存在token，如果存在的话，则每个http header都加上token
//         if (util.cookies.get("token")) {
//             config.headers.Authorization = "bearer " + util.cookies.get("token");
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     })


export function page (data) {
    return request({
        baseURL: ZHX_BASE_URL,
        url: '/user/page',
        method: 'post',
        data
    })
}

