<template>
  <div class="actions">
    <div class="left">
      <i @click="shareWeibo(weibo.id)" class="iconfont icon-share"/>
      <span @click="shareWeibo(weibo.id)">{{ weibo.shareNumber }}</span>
      <i class="iconfont icon-comment"/>
      <span>{{ weibo.commentNumber }}</span>
      <span :class="{ 'agree-success': weibo.userAgreeWeiboID }">
        <i @click="userAgreeWeibo(weibo.id)" class="iconfont icon-agree"/>
        <span @click="userAgreeWeibo(weibo.id)">{{ weibo.agreeNumber }}</span>
      </span>
    </div>
    <i class="iconfont icon-more" @click="openPopup"/>
    <van-popup v-model="showPopup" position="bottom">
      <div class="actions-container">
        <div class="hide-btn">收藏</div>
        <div class="hide-btn">举报</div>
        <div class="hide-btn">复制链接</div>
        <div class="hide-btn">查看编辑记录</div>
        <div class="hide-btn" @click="closePopup">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popup } from 'vant'
import { userAgreeWeibo, userDisagreeWeibo } from 'src/api/user_agree_weibo'

Vue.use(Popup)
export default {
  name: 'Actions',
  props: ['weibo', 'index'],
  data () {
    return {
      showPopup: false
    }
  },
  methods: {
    shareWeibo (weiboID) {
      if (this.$store.state.user.isLogin) {
        this.$router.push({ name: 'Share', params: { weiboID } })
      } else {
        this.$router.push({ name: 'LoginByEmail' })
      }
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
    openPopup () {
      this.showPopup = true
    },
    closePopup () {
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .actions {
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

    .actions-container {
      background: $color26;

      .hide-btn {
        height: 12.8vw  /* 48/3.75 */;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color1;
        font-size: 4.8vw  /* 18/3.75 */;
        margin-bottom: 1px  /* 1/3.75 */;
        background: white;

        &:last-of-type {
          margin-bottom: 0;
          margin-top: 1.07vw  /* 4/3.75 */;
        }
      }
    }
  }
</style>
