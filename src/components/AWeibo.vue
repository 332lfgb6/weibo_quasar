<template>
  <div class="a-weibo">
    <div class="weibo">
      <div v-if="$route.name === 'Profile'" class="public-state">
        <template v-if="processedWeibo.public_state === '私密'">仅自己可见</template>
        <template v-else-if="processedWeibo.public_state === '公开'">所有人可见</template>
        <template v-else>朋友圈可见</template>
      </div>
      <div class="user">
        <div class="left"
             @click="$router.push({ name: 'User', params: { user: processedWeibo.user.nickname } })">
          <div class="avatar-authentication">
            <img class="avatar" :src="processedWeibo.user.avatar" alt="">
            <img src="../assets/authentication/blue.png"
                 v-if="processedWeibo.user.authentication === '蓝v认证'" class="v"/>
            <img src="../assets/authentication/yellow.png"
                 v-else-if="processedWeibo.user.authentication === '黄v认证'" class="v"/>
            <img src="../assets/authentication/gold.png"
                 v-else-if="processedWeibo.user.authentication === '金v认证'" class="v"/>
          </div>
          <div class="nickname-time">
              <span class="nickname">
                {{ processedWeibo.user.nickname }}
                <i class="iconfont vip-level" :class="'icon-' + processedWeibo.user.vip_level + '_round_solid'"/>
              </span>
            <span class="time">{{ processedWeibo.update_time | timeFilter }}
              <span v-if="processedWeibo.f">
                来自 {{ processedWeibo.f }}
              </span>
            </span>
          </div>
        </div>
        <div v-if="$route.name === 'Index' && $store.state.user.id !== processedWeibo.user.id"
             @click="follow(processedWeibo.user.id, processedWeibo.user.follow_id)">
          <div v-if="!processedWeibo.user.follow_id" class="right" >
            <i class="iconfont icon-add"/>关注
          </div>
          <div v-else class="right">已关注</div>
        </div>
      </div>
      <div @click="$router.push({ name: 'WeiboDetail', params: { weiboID: processedWeibo.id } })"
           class="content"
           v-html="processedWeibo.content"></div>
      <div class="img-list" :class="{ 'four-images': processedWeibo.images.length === 4 }">
        <img
          v-for="image in processedWeibo.images"
          :key="image.id"
          :src="serverHostPort.pro + image.uri" alt="">
      </div>
      <div v-if="processedWeibo.first_image"
           class="video-container">
        <div class="first-image"
             :style="{ 'background-image': 'url(' + processedWeibo.first_image + ')' }">
          <div class="play-btn"
               @click="$router.push({ name: 'PlayVideo', params: { videoURI: processedWeibo.video } })">
            <i class="iconfont icon-play"></i>
          </div>
        </div>
        <div class="view-time">
          <div class="view">{{ 3 }}次观看</div>
          <div class="time">{{ processedWeibo.video_time }}</div>
        </div>
      </div>
    </div>
    <div v-if="processedWeibo.related_weibo" class="share-weibo">
      <div class="content" v-html="processedWeibo.related_weibo.content"></div>
      <div class="img-list" :class="{ 'four-images': processedWeibo.related_weibo.images.length === 4 }">
        <img
          v-for="image in processedWeibo.related_weibo.images"
          :key="image.id"
          :src="image.uri" alt="">
      </div>
    </div>
    <div v-if="$route.name === 'Index'" class="index-actions">
      <div class="left">
        <i @click="shareWeibo(weibo.id)" class="iconfont icon-share"/>
        <span @click="shareWeibo(weibo.id)">{{ weibo.shareNumber }}</span>
        <i @click="$router.push({ name: 'WeiboDetail', params: { weiboID: processedWeibo.id } })" class="iconfont icon-comment"/>
        <span @click="$router.push({ name: 'WeiboDetail', params: { weiboID: processedWeibo.id } })">{{ weibo.commentNumber }}</span>
        <span :class="{ 'agree-success': weibo.userAgreeWeiboID }">
        <i @click="userAgreeWeibo(weibo.id)" class="iconfont icon-agree"/>
        <span @click="userAgreeWeibo(weibo.id)">{{ weibo.agreeNumber }}</span>
      </span>
      </div>
      <copy-to-clipboard :weibo-i-d="processedWeibo.id" size="small"/>
    </div>
    <div v-else-if="$route.name === 'Profile' || $route.name === 'User' || $route.name === 'Topic' || $route.name === 'Result'" class="user-actions">
      <div class="placeholder"></div>
      <div class="actions">
        <div class="hide-btn" @click="shareWeibo(weibo.id)">
          <i class="iconfont icon-share"/>
          {{ processedWeibo.shareNumber }}
        </div>
        <div class="hide-btn">
          <i class="iconfont icon-comment"/>
          {{ processedWeibo.commentNumber }}
        </div>
        <div class="hide-btn" @click="userAgreeWeibo(weibo.id)">
          <i class="iconfont icon-agree"/>
          {{ processedWeibo.agreeNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { vueHostPort, serverHostPort } from 'src/utils/pure'
import { Popup, Toast } from 'vant'
import { copyToClipboard } from 'quasar'
import { follow } from 'src/mixins/follow'
Vue.use(Popup)
import { formatTime } from 'src/utils/format.time'
import { parseWeibo } from 'src/utils/parse.weibo'
import { userAgreeWeibo, userDisagreeWeibo } from 'src/api/user_agree_weibo'
import CopyToClipboard from 'components/CopyToClipboard'

Vue.use(Toast)
export default {
  name: 'AWeibo',
  components: { CopyToClipboard },
  mixins: [follow],
  props: ['weibo'],
  data () {
    return {
      showPopup: false,
      serverHostPort
    }
  },
  computed: {
    processedWeibo () {
      const temp = JSON.stringify(this.weibo)
      const processedWeibo = JSON.parse(temp)
      processedWeibo.update_time = formatTime(processedWeibo.update_time)
      processedWeibo.content = parseWeibo(this, processedWeibo.content)
      if (processedWeibo.related_weibo) {
        processedWeibo.related_weibo.content = parseWeibo(this, '@' + processedWeibo.related_weibo.user.nickname + ' ' + processedWeibo.related_weibo.content)
        processedWeibo.related_weibo.images.map(item => {
          item.uri = serverHostPort.pro + item.uri
          return item
        })
      }
      return processedWeibo
    }
  },
  created () {
    window.forwardUserPage = this.forwardUserPage
    window.forwardTopicPage = this.forwardTopicPage
  },
  methods: {
    copyToClipboard (weiboID) {
      copyToClipboard(`${vueHostPort.pro}/detail/${weiboID}`).then(res => {
        Toast({
          message: '复制成功',
          icon: 'passed'
        })
        this.showPopup = false
      })
    },
    shareWeibo (weiboID) {
      this.$router.push({ name: 'Share', params: { weiboID } })
    },
    userAgreeWeibo (weiboID, userAgreeWeiboID) {
      if (this.$store.state.user.isLogin) {
        if (this.weibo.userAgreeWeiboID) {
          userDisagreeWeibo(this.weibo.userAgreeWeiboID).then(res => this.$parent.getWeiboList())
        } else {
          userAgreeWeibo({
            weibo: weiboID,
            user: this.$store.state.user.id
          }).then(res => {
            this.$parent.getWeiboList()
          })
        }
      } else {
        this.$router.push({ name: 'LoginByEmail' })
      }
    },
    forwardUserPage (e, user) {
      // 阻止冒泡
      e.stopPropagation()
      this.$router.push({ name: 'User', params: { user } })
    },
    forwardTopicPage (e, topicName) {
      e.stopPropagation()
      this.$router.push({ name: 'Topic', params: { topicName } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .weibo {
    padding: 0 3.2vw  /* 12/3.75 */;
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
      padding-top: 4vw  /* 15/3.75 */;

      .left {
        display: flex;
        align-items: flex-start;

        .avatar-authentication {
          position: relative;
          margin-right: 2.13vw  /* 8/3.75 */;

          .avatar {
            width: 8.53vw  /* 32/3.75 */;
            height: 8.53vw  /* 32/3.75 */;
            border-radius: 4.27vw  /* 16/3.75 */;
          }

          .v {
            width: 3.73vw  /* 14/3.75 */;
            height: 3.73vw  /* 14/3.75 */;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }

        .nickname-time {
          display: flex;
          flex-direction: column;

          .nickname {
            font-size: 3.73vw  /* 14/3.75 */;
            color: $color38;

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
      font-size: 4.53vw  /* 17/3.75 */;
      color: $color1;

      /deep/ {
        img {
          width: 4.27vw  /* 16/3.75 */;
          height: 4.27vw  /* 16/3.75 */;
          margin-right: 0.53vw  /* 2/3.75 */;
        }

        a {
          color: $color27;
        }
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

    .four-images {
      width: 70vw;

      img {
        &:nth-of-type(2n) {
          margin-right: 0
        }

        &:nth-of-type(3n) {
          margin-right: 1.8vw;
        }
      }
    }

    .video-container {
      position: relative;

      .first-image {
        position: relative;
        height: 52.53vw  /* 197/3.75 */;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;

        .play-btn {
          width: 54px;
          height: 54px;
          position: absolute;
          border-radius: 50%;
          background: rgba(0, 0, 0, .4);
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            color: white;
          }
        }
      }

      .view-time {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        font-size: 12px;
      }
    }

    .hide-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 3.2vw  /* 12/3.75 */;
      border-bottom: 1px solid rgba(black, .1);

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

  .share-weibo {
    padding: 3.2vw  /* 12/3.75 */;
    background: $color33;

    .content {
      /deep/ {
        img {
          width: 4.27vw  /* 16/3.75 */;
          height: 4.27vw  /* 16/3.75 */;
        }

        a {
          color: $color27;
        }
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

    .four-images {
      width: 70vw;

      img {
        &:nth-of-type(2n) {
          margin-right: 0
        }

        &:nth-of-type(3n) {
          margin-right: 1.8vw;
        }
      }
    }
  }

  .index-actions {
    height: 13.33vw  /* 50/3.75 */;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3.2vw  /* 12/3.75 */;
    color: $color25;

    i {
      font-size: 4.8vw  /* 18/3.75 */;
    }

    span {
      margin: 0 7.2vw  /* 27/3.75 */ 0 1.07vw  /* 4/3.75 */;
      font-size: 3.47vw  /* 13/3.75 */;
    }

    .agree-success {
      color: $color38 !important;
    }
  }

  .user-actions {
    .placeholder {
      height: 2.13vw  /* 8/3.75 */;
      background: white;
    }

    .actions {
      height: 9.33vw  /* 35/3.75 */;
      display: flex;
      color: $color3;
      justify-content: space-evenly;
      align-items: center;
      font-size: 3.47vw  /* 13/3.75 */;
      border-top: 0.27vw  /* 1/3.75 */ solid $color22;
      border-bottom: 0.27vw  /* 1/3.75 */ solid $color22;
      background: white;

      .hide-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          margin-right: 1.07vw  /* 4/3.75 */;
        }
      }
    }
  }
</style>
