<template>
  <div class="copy-to-clipboard">
    <i class="iconfont icon-more" :class="{ 'small-icon': size === 'small', 'large-icon': size === 'large' }" @click="openPopup"/>
    <van-popup class="popup" v-model="showPopup" position="bottom">
      <div class="hide-btn" @click="copyToClipboard(weiboID)">复制链接</div>
      <div class="hide-btn" @click="closePopup">取消</div>
    </van-popup>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { vueHostPort } from 'src/utils/pure'
import { Toast } from 'vant'

export default {
  name: 'CopyToClipboard',
  props: ['weiboID', 'size'],
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
    },
    copyToClipboard (weiboID) {
      copyToClipboard(`${vueHostPort.dev}/detail/${weiboID}`).then(res => {
        Toast({
          message: '复制成功',
          icon: 'passed'
        })
        this.showPopup = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .small-icon {
    font-size: 4.27vw  /* 16/3.75 */;
  }

  .large-icon {
    font-size: 5.6vw  /* 21/3.75 */;
  }

  .popup {
    background: $color26;

    .hide-btn {
      height: 12.8vw  /* 48/3.75 */;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color1;
      font-size: 4.8vw  /* 18/3.75 */;
      background: white;

      &:last-of-type {
        margin-top: 1.33vw  /* 5/3.75 */;
      }
    }
  }
</style>
