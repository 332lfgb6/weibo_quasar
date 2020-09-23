import { getToken } from 'src/utils/token'

export default function () {
  return {
    //
    token: getToken(),
    isLogin: false,
    gender: '',
    vipLevel: '',
    nickname: '',
    avatar: '',
    brief: '',
    authentication: '',
    id: 0,
    fansNumber: 0,
    followerNumber: 0
  }
}
