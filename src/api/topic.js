import { request } from 'src/utils/request'

export const getTopicDetail = topicName => {
  return request({
    url: '/api/v1/get_topic_detail/',
    params: { topicName }
  })
}
