<template>
  <div class="actions">
    <div class="left">
      <i class="iconfont icon-share"/>
      <span>2.5万</span>
      <i class="iconfont icon-comment"/>
      <span>5.8万</span>
      <i class="iconfont icon-agree"/>
      <span>108万</span>
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

Vue.use(Popup)
export default {
  name: 'Actions',
  data () {
    return {
      showPopup: false
    }
  },
  methods: {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3.2vw  /* 12/3.75 */;
    background: white;

    i {
      font-size: 4.8vw  /* 18/3.75 */;
    }

    span {
      margin: 0 7.2vw  /* 27/3.75 */ 0 1.07vw  /* 4/3.75 */;
      color: $color25;
      font-size: 3.47vw  /* 13/3.75 */;
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
