import { request, fileRequest } from '@/utils/request'

export const uploadFile = (data: any, headers: any) => {
    return fileRequest({
        url: '/upload',
        method: 'post',
        data,
        headers,
    })
}

export const FormUpload = (data: any) => {
    return request({
        url: '/uploadUserInfo',
        method: 'post',
        data,

    })
}
export const SubmitAddress= (data: any) => {
    return request({
        url: '/submitAddress',
        method: 'post',
        data,

    })
}

