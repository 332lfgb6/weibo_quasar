<template>
    <div class="weibo-list" ref="weiboList">
      <a-weibo v-for="weibo in weiboList" :key="weibo.id" :weibo="weibo"/>
    </div>
</template>

<script>
import { bus } from 'src/utils/bus'
import AWeibo from '../AWeibo'

export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: { AWeibo },
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
  .weibo {
    padding: 0 3.2vw  /* 12/3.75 */;
    border-top: 1px solid $color4;
    background: white;

    .public-state {
      border-bottom: 1px solid $color4;
      font-size: 3.47vw  /* 13/3.75 */;
      color: $color3;
      padding: 2.13vw  /* 8/3.75 */ 0;
    }

    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding-top: 4vw  /* 15/3.75 */;

      .v {
        width: 3.73vw  /* 14/3.75 */;
        height: 3.73vw  /* 14/3.75 */;
        position: absolute;
        left: 6.4vw  /* 24/3.75 */;
        top: 7.47vw  /* 28/3.75 */;
      }

      .left {
        display: flex;

        .avatar {
          width: 8.53vw  /* 32/3.75 */;
          height: 8.53vw  /* 32/3.75 */;
          border-radius: 4.27vw  /* 16/3.75 */;
          margin-right: 2.13vw  /* 8/3.75 */;
        }

        .nickname-time {
          display: flex;
          flex-direction: column;

          .nickname {
            font-size: 3.73vw  /* 14/3.75 */;
            color: $color1;

            .vip-level {
              margin-left: 0.8vw  /* 3/3.75 */;
              color: orange;
            }
          }

          .time {
            font-size: 3.2vw  /* 12/3.75 */;
            color: $color3;
          }
        }
      }

      .right {
        width: 19.73vw  /* 74/3.75 */;
        height: 6.67vw  /* 25/3.75 */;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px  /* 1/3.75 */ solid rgba($follow-btn, .5);
        color: $follow-btn;
        font-size: 3.2vw  /* 12/3.75 */;
      }
    }

    .content {
      margin-top: 3.2vw  /* 12/3.75 */;
      color: $color1;

      /deep/ img {
        width: 4.27vw  /* 16/3.75 */;
        height: 4.27vw  /* 16/3.75 */;
        margin-right: 0.53vw  /* 2/3.75 */;
      }

      .tag {
        color: $color27;
      }
    }

    .img-list {
      display: flex;
      flex-wrap: wrap;

      img {
        width: 30vw;
        height: 30vw;
        object-fit: cover;
        margin-top: 1.6vw  /* 6/3.75 */;
        margin-right: 1.8vw;

        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }

    .hide-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 3.2vw  /* 12/3.75 */;

      .primary {
        span {
          color: $action;
          margin-right: 5.33vw  /* 20/3.75 */;

          i {
            font-size: 5.33vw  /* 20/3.75 */;
            color: $action;
          }
        }
      }
    }
  }
</style>
