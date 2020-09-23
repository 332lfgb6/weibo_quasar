<template>
  <div class="topic">
    <NavBar2/>
    <topic-introduction :topic-detail="topicDetail"/>
    <a-weibo :weibo="weibo" v-for="weibo in weiboListTopicInfo.weiboList" :key="weibo.id"/>
  </div>
</template>

<script>
import NavBar2 from '../../components/NavBar2'
import TopicIntroduction from 'pages/topic/TopicIntroduction'
import { getWeiboList } from 'src/api/weibo'
import AWeibo from 'components/AWeibo'
import { getTopicDetail } from 'src/api/topic'
import Mock from 'mockjs'
export default {
  name: 'index',
  components: { AWeibo, TopicIntroduction, NavBar2 },
  data () {
    return {
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
  methods: {
    getTopicDetail () {
      getTopicDetail(this.topicName).then(res => {
        this.topicDetail = res.data.data
        const topicImage = this.topicDetail.image
        if (!topicImage) {
          const Random = Mock.Random
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
  }
</style>
