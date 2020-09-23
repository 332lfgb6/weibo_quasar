export const getPhoneRoutes = store => {
  return [
    {
      path: '/',
      name: 'Index',
      component: () => import('../pages/index/index'),
      beforeEnter (to, from, next) {
        // // 没有token
        // if (!store.state.user.token) {
        //   next()
        //   return
        // }
        // // 有token，并且有用户信息
        // if (store.state.user.isLogin) {
        //   next()
        //   return
        // }
        // // 有token，但是无用户信息
        // store.dispatch('user/getInfo').then(res => next())
        next()
      }
    },
    {
      path: '/profile/:userID',
      name: 'Profile',
      component: () => import('../pages/profile'),
      beforeEnter (to, from, next) {
        if (store.state.user.id === parseInt(to.params.userID)) {
          next()
        }
      }
    },
    {
      path: '/root_comment_detail/:weiboID/:rootCommentID',
      name: 'RootCommentDetail',
      component: () => import('../pages/root_comment_detail')
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../pages/message')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('../pages/chat')
    },
    {
      path: '/topic/:topicName',
      name: 'Topic',
      component: () => import('../pages/topic')
    },
    {
      path: '/result/:keyword',
      name: 'Result',
      component: () => import('../pages/result')
    },
    {
      path: '/user/:user',
      name: 'User',
      component: () => import('../pages/user')
    },
    {
      path: '/detail/:weiboID',
      name: 'WeiboDetail',
      component: () => import('../pages/weibo_detail')
    },
    {
      path: '/login_by_email',
      name: 'LoginByEmail',
      component: () => import('../pages/login_by_email')
    },
    {
      path: '/login_by_email_code',
      name: 'LoginByEmailCode',
      component: () => import('../pages/login_by_email_code'),
      // 如果一个人想直接从地址栏访问输入验证码页，那么页面会重定向到输入邮箱页。
      beforeEnter (to, from, next) {
        if (store.state.user.email.length > 0) {
          next()
        } else {
          next({ name: 'LoginByEmail' })
        }
      }
    },
    {
      path: '/login_by_username',
      name: 'LoginByUsername',
      component: () => import('../pages/login_by_username')
    },
    {
      path: '/common',
      name: 'Common',
      component: () => import('../pages/common')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../pages/test')
    },
    {
      path: '/compose',
      name: 'Compose',
      component: () => import('../pages/compose')
    },
    {
      path: '/share/:weiboID',
      name: 'Share',
      component: () => import('../pages/share')
    },
    {
      path: '/reply_root_comment/:weiboID/:rootCommentID',
      name: 'ReplyRootComment',
      component: () => import('../pages/ReplyRootComment')
    },
    {
      path: '/reply_child_comment/:weiboID/:rootCommentID/:childCommentID',
      name: 'ReplyChildComment',
      component: () => import('../pages/ReplyChildComment')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Register')
    },
    {
      path: '/play_video/:videoURI',
      name: 'PlayVideo',
      component: () => import('../pages/PlayVideo')
    },
    {
      path: '/exit',
      name: 'Exit',
      component: () => import('../pages/Exit')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../pages/Search')
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
  ]
}
