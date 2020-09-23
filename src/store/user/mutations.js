import { serverHostPort } from 'src/utils/pure'

export function SET_TOKEN (state, token) {
  state.token = token
}
export function SET_NICKNAME (state, nickname) {
  state.nickname = nickname
}
export function SET_AVATAR (state, avatar) {
  state.avatar = serverHostPort.pro + avatar
}
export function SET_VIP_LEVEL (state, vipLevel) {
  state.vipLevel = vipLevel
}
export function SET_BRIEF (state, brief) {
  state.brief = brief
}
export function SET_GENDER (state, gender) {
  state.gender = gender
}
export function SET_AUTHENTICATION (state, authentication) {
  state.authentication = authentication
}
export function SET_IS_LOGIN (state, isLogin) {
  state.isLogin = isLogin
}
export function SET_ID (state, id) {
  state.id = id
}
export function SET_FANS_NUMBER (state, fansNumber) {
  state.fansNumber = fansNumber
}
export function SET_FOLLOWER_NUMBER (state, followerNumber) {
  state.followerNumber = followerNumber
}
