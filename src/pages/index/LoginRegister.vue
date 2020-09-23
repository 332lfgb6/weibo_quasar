<template>
  <router-link v-if="!$store.state.user.isLogin"
               :to="{ name: 'LoginByEmail' }"
               v-show="showBtn" class="login-register">
    登录/注册
  </router-link>
</template>

<script>
export default {
  name: 'LoginRegister',
  data () {
    return {
      showBtn: true
    }
  },
  // 鼠标上下滚动时，控制登录注册按钮的显示和隐藏。
  created () {
    document.onmousewheel = e => {
      this.showBtn = e.wheelDelta > 0
    }
    // 兼容火狐浏览器
    document.addEventListener('DOMMouseScroll', e => {
      this.showBtn = e.detail < 0
    }, false)
  }
}
</script>

<style lang="scss" scoped>
  .login-register {
    width: 34.67vw  /* 130/3.75 */;
    height: 10.13vw  /* 38/3.75 */;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: fixed;
    bottom: 10.67vw  /* 40/3.75 */;
    background: $color7;
    margin: 0 32.67vw;
    z-index: 5;
    border-radius: 10.67vw  /* 40/3.75 */;
  }
</style>
