import { officialRequest } from 'src/utils/request'

export const getEmotions = () => {
  return officialRequest({
    url: '/2/emotions.json',
    params: {
      source: 1362404091
    }
  })
}
