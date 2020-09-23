import { cancelFollowSB, followSB } from 'src/api/user.vt.user'

export const follow = {
  data () {
    return {}
  },
  methods: {
    follow (object, followID) {
      const subject = this.$store.state.user.id
      if (!subject) {
        this.$store.commit('app/SET_REDIRECT_ROUTE', this.$route.path)
        this.$router.push({ name: 'LoginByEmail' })
      } else if (!followID) {
        followSB({ subject, object }).then(res => {
          const followerNumber = this.$store.state.user.followerNumber
          this.$store.commit('user/SET_FOLLOWER_NUMBER', followerNumber + 1)
          if (this.$route.name === 'Index' || this.$route.name === 'Result') {
            this.$parent.getWeiboList()
          } else if (this.$route.name === 'User') {
            this.getWeiboList()
          }
        })
      } else {
        // 如果有follow_id，代表当前用户关注了该用户，点击则取消关注
        cancelFollowSB(followID).then(res => {
          const followerNumber = this.$store.state.user.followerNumber
          this.$store.commit('user/SET_FOLLOWER_NUMBER', followerNumber - 1)
          if (this.$route.name === 'Index' || this.$route.name === 'Result') {
            this.$parent.getWeiboList()
          } else if (this.$route.name === 'User') {
            this.getWeiboList()
          }
        })
      }
    }
  }
}
