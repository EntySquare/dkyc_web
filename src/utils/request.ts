// 管理网络请求
import axios from 'axios'
// 创建 axios 副本对象
let request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
})
// 设置请求拦截器
request.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// 设置响应拦截器
request.interceptors.response.use(
    response => {
        return response
    },
    err => {
        return Promise.reject(err)
    }
)

// 创建 axios 副本对象
let fileRequest = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 300000
})
// 设置请求拦截器
fileRequest.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// 设置响应拦截器
fileRequest.interceptors.response.use(
    response => {
        return response
    },
    err => {
        return Promise.reject(err)
    }
)
// 暴露对象
export { request, fileRequest }

