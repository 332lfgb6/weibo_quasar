import { request } from 'src/utils/request'
import oldRequest from 'axios'

export const newWeibo = data => {
  return request({
    url: '/api/v1/new_weibo/',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getWeiboList = params => {
  return request({
    url: '/api/v1/get_weibo_list/',
    params
  })
}

export const getWeiboListMockApi = () => {
  return oldRequest({
    url: '//weibo'
  })
}

export const getWeiboDetail = weiboID => {
  return request({
    url: `/api/v1/get_weibo_detail/${weiboID}/`
  })
}
