import { getUserInfoByToken, loginApi, registerAPI } from 'src/api/user'
import { setToken } from 'src/utils/token'

export function login ({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    if (payload.loginWay === 'email') {
      payload.email = state.email
    }
    loginApi(payload).then(res => {
      const { code } = res.data
      if (code === 20) {
        const { token } = res.data.data
        commit('SET_TOKEN', token)
        setToken(token)
      }
      resolve(res)
    })
  })
}

export function getInfo ({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    getUserInfoByToken().then(res => {
      const {
        gender,
        // eslint-disable-next-line camelcase
        vip_level,
        nickname,
        avatar,
        brief,
        authentication,
        id,
        // eslint-disable-next-line camelcase
        fans_number,
        // eslint-disable-next-line camelcase
        follower_number
      } = res.data
      commit('SET_NICKNAME', nickname)
      commit('SET_GENDER', gender)
      commit('SET_AVATAR', avatar)
      commit('SET_VIP_LEVEL', vip_level)
      commit('SET_BRIEF', brief)
      commit('SET_AUTHENTICATION', authentication)
      commit('SET_IS_LOGIN', true)
      commit('SET_ID', id)
      commit('SET_FANS_NUMBER', fans_number)
      commit('SET_FOLLOWER_NUMBER', follower_number)
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
export function register ({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    registerAPI(payload).then(res => {
      if (res.data.code === 700) {
        const { token } = res.data
        commit('SET_TOKEN', token)
        setToken(token)
      }
      resolve(res)
    })
  })
}
