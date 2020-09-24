<template>
  <div class="profile">
    <nav-bar/>
    <user-info :weibo-number="returnData.weiboList.length"/>
    <!--<weibo-list :weibo-list="weiboList"/>-->
    <a-weibo :weibo="weibo" v-for="weibo in returnData.weiboList" :key="weibo.id"></a-weibo>
    <show-all-weibo/>
    <write-weibo/>
  </div>
</template>

<script>
import NavBar from 'pages/profile/NavBar'
import UserInfo from 'pages/profile/UserInfo'
import WriteWeibo from 'pages/profile/WriteWeibo'
// import WeiboList from '../../components/weibo_list'
import { getWeiboList } from 'src/api/weibo'
import ShowAllWeibo from 'pages/profile/ShowAllWeibo'
import AWeibo from 'components/AWeibo'
export default {
  name: 'index',
  components: { ShowAllWeibo, WriteWeibo, UserInfo, NavBar, AWeibo },
  data () {
    return {
      returnData: {
        weiboList: [],
        userInfo: {}
      }
    }
  },
  activated () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.getWeiboList()
  },
  methods: {
    getWeiboList () {
      getWeiboList({
        user: this.$route.params.userID
      }).then(res => { this.returnData = res.data })
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: $color6;
  }
</style>
