<!--搜索结果列表、个人中心列表-->
<template>
    <div class="weibo-list" ref="weiboList">
      <div class="card" v-for="weibo in weiboList" :key="weibo.id">
        <a-weibo :weibo="weibo"/>
        <div class="placeholder"></div>
        <Actions/>
      </div>
    </div>
</template>

<script>
import { bus } from 'src/utils/bus'
import AWeibo from './AWeibo'
import Actions from '../components/Actions'

export default {
  name: 'WeiboList2',
  data () {
    return {
    }
  },
  components: { Actions, AWeibo },
  props: ['weiboList'],
  mounted () {
    bus.$on('scrollToZero', () => {
      this.$refs.weiboList.scrollTop = 0
      console.log(this.$refs.weiboList)
    })
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin-top: 1.6vw  /* 6/3.75 */;
    border-top: 0.27vw  /* 1/3.75 */ solid $color30;

    .placeholder {
      height: 3.2vw  /* 12/3.75 */;
      background: white;
    }

    &:last-of-type {
      margin-bottom: 3.2vw  /* 12/3.75 */;
    }

    &:first-of-type {
      margin-top: 3.2vw  /* 12/3.75 */;
    }
  }
</style>
