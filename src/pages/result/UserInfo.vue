<template>
  <div class="user-info">
    <div class="left">
      <img
        :src="serverHostPort.pro + userInfo.avatar"
        alt="" class="avatar">
      <div class="text-user-info">
        <div class="nickname-level">
          <span class="nickname">{{ userInfo.nickname }}</span>
          <span class="level">{{ userInfo.vip_level }}</span>
        </div>
        <div class="brief ellipsis">{{ userInfo.brief }}</div>
        <div class="fans">{{ userInfo.fans }}</div>
      </div>
    </div>
    <div @click="follow(userInfo.id, userInfo.follow_id)" v-if="!userInfo.follow_id" class="right">
      <i class="iconfont icon-follow"/>
      <span class="follow-me">加关注</span>
    </div>
    <div @click="follow(userInfo.id, userInfo.follow_id)" v-else class="right">
      <span class="follow-me">已关注</span>
    </div>
  </div>
</template>

<script>
import { follow } from 'src/mixins/follow'
import { serverHostPort } from 'src/utils/pure'

export default {
  name: 'UserInfo',
  props: ['userInfo'],
  mixins: [follow],
  data () {
    return {
      serverHostPort
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-info {
    height: 24.53vw  /* 92/3.75 */;
    padding: 2.67vw  /* 10/3.75 */ 3.2vw  /* 12/3.75 */;
    margin-top: 2.67vw  /* 10/3.75 */;
    background: white;
    border-top: 0.27vw  /* 1/3.75 */ solid $color30;
    border-bottom: 0.27vw  /* 1/3.75 */ solid $color30;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;

      .avatar {
        width: 18.67vw  /* 70/3.75 */;
        height: 18.67vw  /* 70/3.75 */;
        border-radius: 50%;
        margin-right: 2.67vw  /* 10/3.75 */;
      }

      .text-user-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .nickname-level {
          .nickname {
            color: $color18;
          }

          .level {
            font-size: 3.2vw  /* 12/3.75 */;
          }
        }

        .brief {
          color: $color5;
          width: 55.2vw  /* 207/3.75 */;
          font-size: 3.2vw  /* 12/3.75 */;
        }

        .fans {
          font-size: 3.2vw  /* 12/3.75 */;
          color: $color3;
        }
      }
    }

    .right {
      color: $color18;
      width: 13.87vw  /* 52/3.75 */;
      height: 18.67vw  /* 70/3.75 */;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      i {
        font-size: 7.47vw  /* 28/3.75 */;
        height: 8.53vw  /* 32/3.75 */;
      }

      .follow-me {
        font-size: 3.2vw  /* 12/3.75 */;
      }
    }
  }
</style>
