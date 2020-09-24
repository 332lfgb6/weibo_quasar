<template>
  <div class="topic">
    <div class="nav-bar2 shadow-to-border">
      <i class="iconfont icon-back" @click="$router.back()"/>
      <div class="input-container">
        <i class="iconfont icon-search"/>
        <input @keyup="startSearch" v-model="keyword" placeholder="搜索"/>
        <i class="iconfont icon-reset reset" @click="keyword = ''"/>
      </div>
    </div>
    <topic-introduction :topic-detail="topicDetail"/>
    <a-weibo :weibo="weibo" v-for="weibo in weiboListTopicInfo.weiboList" :key="weibo.id"/>
  </div>
</template>

<script>
import TopicIntroduction from 'pages/topic/TopicIntroduction'
import { getWeiboList } from 'src/api/weibo'
import AWeibo from 'components/AWeibo'
import { getTopicDetail } from 'src/api/topic'
import Mock from 'mockjs'
export default {
  name: 'index',
  components: { AWeibo, TopicIntroduction },
  data () {
    return {
      keyword: '',
      topicName: '',
      topicDetail: {},
      weiboList: [],
      weiboListTopicInfo: {
        topic: {},
        weiboList: []
      }
    }
  },
  activated () {
    this.topicName = this.$route.params.topicName
    this.getWeiboList()
    this.getTopicDetail()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.topicName = this.$route.params.topicName
    this.getWeiboList()
    this.getTopicDetail()
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
    getTopicDetail () {
      getTopicDetail(this.topicName).then(res => {
        this.topicDetail = res.data.data
        const topicImage = this.topicDetail.image
        if (!topicImage) {
          const Random = Mock.Random
          console.log('-------', this.topicName)
          const generatedImage = Random.image('70x70', '#4eb5ef', '#FFF', 'png', this.topicName.slice(0, 1))
          this.$set(this.topicDetail, 'image', generatedImage)
        }
      })
    },
    getWeiboList () {
      getWeiboList({ topic_name: this.$route.params.topicName }).then(res => {
        this.weiboListTopicInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .topic {
    background: $color22;
    min-height: 100vh;

    .nav-bar2 {
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
  }
</style>
