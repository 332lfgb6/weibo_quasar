import { request } from 'src/utils/request'

export const getCategoryList = () => {
  return request({
    url: '/api/v1/categories/'
  })
}
