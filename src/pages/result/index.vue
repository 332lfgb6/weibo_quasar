<template>
  <div class="result">
    <NavBar2 :shadow-to-border="true"/>
    <user-info v-if="returnData.user.id" :user-info="returnData.user"/>
    <a-weibo :weibo="weibo" v-for="weibo in returnData.weiboList" :key="weibo.id"/>
  </div>
</template>

<script>
import NavBar2 from '../../components/NavBar2'
import UserInfo from 'pages/result/UserInfo'
import { getWeiboList } from 'src/api/weibo'
import AWeibo from 'components/AWeibo'
export default {
  name: 'index',
  components: { AWeibo, UserInfo, NavBar2 },
  data () {
    return {
      keyword: '',
      returnData: {
        user: {},
        weiboList: []
      }
    }
  },
  activated () {
    this.getWeiboList()
  },
  methods: {
    getWeiboList () {
      this.keyword = this.$route.params.keyword
      getWeiboList({ keyword: this.keyword }).then(res => {
        this.returnData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    background: $color22;
    min-height: 100vh;
  }
</style>
