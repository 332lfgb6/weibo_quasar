import { request } from 'src/utils/request'

export const userAgreeWeibo = data => {
  return request({
    url: 'api/v1/user_agree_weibo/',
    data,
    method: 'post'
  })
}
export const userDisagreeWeibo = userAgreeWeiboID => {
  return request({
    url: `api/v1/user_agree_weibo/${userAgreeWeiboID}/`,
    method: 'delete'
  })
}
