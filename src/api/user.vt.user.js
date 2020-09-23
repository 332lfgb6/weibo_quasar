import { request } from 'src/utils/request'

export const followSB = data => {
  return request({
    url: 'api/v1/follows/',
    method: 'post',
    data
  })
}
export const cancelFollowSB = followID => {
  return request({
    url: `api/v1/follows/${followID}/`,
    method: 'delete'
  })
}
