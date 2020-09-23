<template>
  <div class="exit">
    <div class="nav-bar">
      <i @click="$router.back()" class="iconfont icon-back"/>
      <span>设置</span>
      <div class="placeholder"></div>
    </div>
    <div @click="logout" class="exit-btn">退出登录</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import { removeToken } from 'src/utils/token'

Vue.use(Toast)
export default {
  name: 'Exit',
  methods: {
    logout () {
      this.$store.commit('user/SET_TOKEN', null)
      this.$store.commit('user/SET_ID', 0)
      removeToken()
      Toast.success('退出登录成功')
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    height: 44px;
    background: $color40;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 7px;

    i {
      font-size: 27px;
    }

    span {
      font-size: 18px;
      color: $color1;
    }

    div {
      width: 27px;
    }
  }

  .exit-btn {
    height: 13.33vw  /* 50/3.75 */;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $negative;
    background: $color40;
    border: 1px solid rgba(black, .1);
    border-left: none;
    border-right: none;
  }
</style>
