// eslint-disable-next-line
import { getToken } from '../utils/token'
import { Platform } from 'quasar'
const whiteList = [
  'LoginByEmail',
  'LoginByEmailCode',
  'LoginByUsername',
  'Compose',
  'Common',
  'Topic',
  'Register',
  'User',
  'Test',
  'PlayVideo',
  'Share',
  'Index',
  'WeiboDetail',
  'Search',
  'Result',
  'RootCommentDetail',
  'ReplyRootComment',
  'ReplyChildComment'
]
export default async ({ app, router, Vue, store }) => {
  if (Platform.is.mobile) {
    router.beforeEach((to, from, next) => {
      const token = store.state.user.token
      // 如果有token
      if (token) {
        // 如果已经通过token获取用户信息，则直接访问
        const userID = store.state.user.id
        if (userID) {
          next()
          return
        }

        // 如果还未通过token获取用户信息，则先获取用户信息再访问
        if (!userID) {
          store.dispatch('user/getInfo').then(result => next())
          return
        }
      }

      // 如果没有token
      if (!token) {
        // 如果在白名单中，直接允许访问
        if (whiteList.includes(to.name)) {
          next()
          return
        }

        // 如果不在白名单中，跳转到登录页
        if (!whiteList.includes(to.name)) {
          next({ name: 'LoginByEmail' })
        }
      }
    })
  }
}
