import { getWeiboListMockApi } from 'src/api/weibo'

export function getWeiboList ({ commit }, condition) {
  return new Promise((resolve, reject) => {
    getWeiboListMockApi().then(res => {
      const payload = {
        condition,
        weiboList: res.data
      }
      commit('SET_WEIBO_LIST', payload)
      resolve()
    })
  })
}

export function getWeiboList2 ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    getWeiboListMockApi().then(res => {
      const newPayload = {
        ...payload,
        weiboList: res.data
      }
      commit('SET_WEIBO_LIST2', newPayload)
      resolve()
    })
  })
}
