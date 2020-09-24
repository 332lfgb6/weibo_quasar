import { request } from 'src/utils/request'

export const agreeComment = data => {
  return request({
    url: '/api/v1/user_agree_comment/',
    method: 'post',
    data
  })
}
export const disagreeComment = userAgreeCommentID => {
  return request({
    url: `/api/v1/user_disagree_comment/${userAgreeCommentID}`,
    method: 'delete'
  })
}
