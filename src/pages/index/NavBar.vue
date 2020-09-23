<template>
  <div class="nav-bar">
    <div class="nav-bar-child">
      <img v-if="!$store.state.user.isLogin" class="logo" src="../../assets/logo.svg" alt="">
      <i v-if="$store.state.user.isLogin"
        @click="$router.push({ name: 'Profile', params: { userID: $store.state.user.id } })"
        class="iconfont icon-mine profile"/>
      <div @click="$router.push({ name: 'Search' })" class="hot-search ellipsis no-login">
        <i class="iconfont icon-search"/>网易云回应网抑云
      </div>
      <i @click="navigateToCompose" class="iconfont icon-xiugai"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    navigateToCompose () {
      this.$router.push({ name: 'Compose' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    position: sticky;
    top: 0;
    z-index: 5;

    .logo {
      width: 6.93vw  /* 26/3.75 */;
    }

    .nav-bar-child {
      height: 11.73vw /* 44/3.75 */
    ;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: relative;
      background: $color21;

      .hot-search {
        width: 61.07vw /* 229/3.75 */
      ;
        height: 7.47vw /* 28/3.75 */
      ;
        line-height: 7.47vw /* 28/3.75 */
      ;
        background: #ebebec;
        border-radius: 4.27vw /* 16/3.75 */
      ;
        font-size: 3.73vw /* 14/3.75 */
      ;
        color: $hot-search;
        padding: 0 2.13vw /* 8/3.75 */
      ;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        i {
          font-size: 4.27vw /* 16/3.75 */
        ;
          color: $hot-search;
          margin-left: 0 !important;
        }
      }

      .no-login {
        width: 72.27vw  /* 271/3.75 */;
      }

      .message-number {
        background: #ff5b36;
        padding: 0 1.07vw /* 4/3.75 */
      ;
        color: white;
        border-radius: .625rem;
        position: absolute;
        top: 0.53vw /* 2/3.75 */
      ;
        right: 11.73vw /* 44/3.75 */
      ;
        font-size: 3.2vw /* 12/3.75 */
      ;
      }

      i {
        color: $color20;
        font-size: 6.13vw  /* 23/3.75 */;
      }
    }
  }
</style>
