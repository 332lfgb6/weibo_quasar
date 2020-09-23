<template>
  <div class="nav-bar">
    <i @click="$router.back()" class="iconfont icon-back"/>
    <span>微博正文</span>
    <copy-to-clipboard size="large" :weibo-i-d="$route.params.weiboID"/>
  </div>
</template>

<script>
import CopyToClipboard from 'components/CopyToClipboard'
export default {
  name: 'NavBar',
  components: { CopyToClipboard }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 11.73vw  /* 44/3.75 */;
    padding: 0 4.27vw  /* 16/3.75 */;
    font-size: 4.53vw  /* 17/3.75 */;
    color: $color20;
    background: $color21;
    border-bottom: 1px  /* 1/3.75 */ solid rgba(black, .1);
    position: sticky;
    top: 0;

    i {
      font-size: 5.6vw  /* 21/3.75 */;
    }
  }
</style>
