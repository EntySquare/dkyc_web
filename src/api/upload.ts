import { request, fileRequest } from '@/utils/request'

export const uploadImage = (data: any, headers: any) => {
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



// type UserInfoReq struct {
//  Hash          string  `json:"hash"` //hash
//  Name          string  `json:"name"` //姓名
//  IDCard        string  `json:"id_card"` //身份证号
//  Phone         string  `json:"phone"` //手机号
//  MailAddress   string  `json:"mail_address"` //通讯地址
//  Amount        float64 `json:"amount"` //金额
//  BuyOrSell     int     `json:"buy_or_sell"` //买/卖 number 买1/卖2
//  FundingSource int     `json:"funding_source"` //资金来源 活期存款1/储蓄存款2/借贷款3/股票4/债券5/其他6
//  WalletAddress string  `json:"wallet_address"` //接受者钱包地址(选填)
//  Political     int     `json:"political"`      // 是否有五级等以内为重要政治性职务人士 number 是1/否2
// }