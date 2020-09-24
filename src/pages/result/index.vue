<template>
  <div class="result">
    <div class="nav-bar shadow-to-border">
      <i class="iconfont icon-back" @click="$router.back()"/>
      <div class="input-container">
        <i class="iconfont icon-search"/>
        <input @keyup="startSearch" v-model="keyword" placeholder="搜索"/>
        <i @click="keyword = ''" class="iconfont icon-reset reset"/>
      </div>
    </div>
    <div class="no-result" v-if="noResult">抱歉，未找到相关结果。</div>
    <user-info v-if="returnData.user.id" :user-info="returnData.user"/>
    <a-weibo :weibo="weibo" v-for="weibo in returnData.weiboList" :key="weibo.id"/>
  </div>
</template>

<script>
import UserInfo from 'pages/result/UserInfo'
import { getWeiboList } from 'src/api/weibo'
import AWeibo from 'components/AWeibo'
export default {
  name: 'index',
  components: { AWeibo, UserInfo },
  data () {
    return {
      keyword: '',
      returnData: {
        user: {},
        weiboList: []
      },
      noResult: false
    }
  },
  activated () {
    this.getWeiboList()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.getWeiboList()
  },
  methods: {
    startSearch (e) {
      // 如果按的不是回车键，那就什么都不做
      if (e.keyCode !== 13) {
        return
      }

      // 如果关键字以#开始结束，那么跳转到话题页
      const regExp = /^#(.*)#$/
      const keyword = this.keyword
      if (regExp.test(keyword)) {
        const topicName = regExp.exec(this.keyword)[1]
        this.$router.push({ name: 'Topic', params: { topicName } })
        return
      }

      // 如果关键字不以#开始结束，那么跳转到结果页
      this.$router.push({ name: 'Result', params: { keyword } })
    },
    getWeiboList () {
      this.noResult = false
      this.keyword = this.$route.params.keyword
      getWeiboList({ keyword: this.keyword }).then(res => {
        this.returnData = res.data
        const returnData = this.returnData

        // 如果没有结果，给用户友情提示
        if (returnData.weiboList.length === 0 && !returnData.user.id) {
          this.noResult = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    background: $color22;
    min-height: 100vh;

    .nav-bar {
      height: 11.73vw  /* 44/3.75 */;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background: white;

      .input-container {
        width: 87.2vw  /* 327/3.75 */;
        height: 7.47vw  /* 28/3.75 */;
        border-radius: 4vw  /* 15/3.75 */;
        background: $color31;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: 3.73vw  /* 14/3.75 */;

        input {
          width: 69.6vw  /* 261/3.75 */;
          height: 4.8vw  /* 18/3.75 */;
          border: none;
          outline: none;
          background: $color31;
        }

        .reset {
          color: $color32;
        }
      }
    }

    .shadow-to-border {
      box-shadow: none;
      border-bottom: 0.27vw  /* 1/3.75 */ solid $color30;
    }

    .no-result {
      height: 11.73vw  /* 44/3.75 */;
      background: white;
      padding-left: 3.47vw  /* 13/3.75 */;
      display: flex;
      align-items: center;
      border: 0.27vw  /* 1/3.75 */ solid $color30;
      border-left: none;
      border-right: none;
      margin-top: 2.4vw  /* 9/3.75 */;
    }
  }
</style>
