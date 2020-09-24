import { request } from 'src/utils/request'

export const getCommentList = params => {
  return request({
    url: '/api/v1/get_comment_list/',
    params
  })
}
export const getCommentDetail = commentID => {
  return request({
    url: `/api/v1/get_comment_detail/${commentID}/`
  })
}

export const addComment = data => {
  return request({
    url: '/api/v1/new_comment/',
    data,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
