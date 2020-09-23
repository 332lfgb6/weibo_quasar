import { request } from 'src/utils/request'

export const newWeiboApi = weiboID => {
  return request({
    url: 'api/v1/weibo_images/',
    params: {
      weibo: weiboID
    }
  })
}
