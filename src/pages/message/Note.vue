<template>
  <router-link :to="{ name: 'Chat' }" class="section">
    <div class="container">
      <div class="left">
        <div class="avatar-container">
          <img class="avatar"
            src="https://tvax4.sinaimg.cn/crop.0.0.750.750.180/007i530dly8fvcz1s7pm5j30ku0kutai.jpg?KID=imgbed,tva&Expires=1598437270&ssig=pooYYErQYq"
            alt="">
          <img :src="'http://192.168.43.194:8000/media/weibo_images/v.blue.png'"
               v-if="computedWeibo.user.authentication === '蓝v认证'" class="v"/>
          <img :src="'http://192.168.43.194:8000/media/weibo_images/v.yellow.png'"
               v-else-if="computedWeibo.user.authentication === '黄v认证'" class="v"/>
          <img :src="'http://192.168.43.194:8000/media/weibo_images/v.gold.png'"
               v-else-if="computedWeibo.user.authentication === '金v认证'" class="v"/>
        </div>
        <div class="nickname-message">
          <span class="nickname">北美新吐槽君</span>
          <span class="message">谢谢关注，欢迎投稿。</span>
        </div>
      </div>
      <span class="message-time">2018-10-16</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Note',
  props: ['iconBackgroundColor', 'iconfont', 'text'],
  data () {
    return {
      computedWeibo: {
        user: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .section {
    display: block;
    border-bottom: 1px solid rgba(grey, .1);

    .container {
      height: 19.73vw  /* 74/3.75 */;
      padding: 3.2vw  /* 12/3.75 */;
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .avatar-container {
          display: inline-block;
          position: relative;
          margin-right: 2.67vw  /* 10/3.75 */;

          .avatar {
            width: 13.33vw  /* 50/3.75 */;
            height: 13.33vw  /* 50/3.75 */;
            border-radius: 6.67vw  /* 25/3.75 */;
          }

          .v {
            width: 3.73vw  /* 14/3.75 */;
            height: 3.73vw  /* 14/3.75 */;
            position: absolute;
            left: 6.4vw  /* 24/3.75 */;
            top: 7.47vw  /* 28/3.75 */;
          }
        }

        .nickname-message {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .nickname {
            color: $color1;
          }

          .message {
            font-size: 3.2vw  /* 12/3.75 */;
            color: $color3;
            margin-bottom: 0.53vw  /* 2/3.75 */;
          }
        }
      }

      .message-time {
        font-size: 3.2vw  /* 12/3.75 */;
        color: $color3;
      }
    }
  }
</style>
