import { request } from 'src/utils/request'

export const getCodeApi = data => {
  return request({
    url: '/api/v1/get_code/',
    method: 'post',
    data
  })
}
export const getCommonApi = () => {
  return request({
    url: '/api/v1/get_common/'
  })
}

export const loginApi = data => {
  return request({
    url: '/api/v1/login/',
    method: 'post',
    data
  })
}
// 获取任何用户的用户信息
export const getUserInfoByToken = () => {
  return request({
    url: '/api/v1/get_user_info_by_token/'
  })
}

export const registerAPI = data => {
  return request({
    url: '/api/v1/register/',
    method: 'post',
    data
  })
}
