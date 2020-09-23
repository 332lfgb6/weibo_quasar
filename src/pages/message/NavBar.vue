<template>
  <div class="nav-bar">
    <router-link :to="{ name: 'Index' }">
      <i class="iconfont icon-back"/>
    </router-link>
    <span>消息箱</span>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 11.73vw  /* 44/3.75 */;
    padding: 0 4.27vw  /* 16/3.75 */;
    font-size: 4.53vw  /* 17/3.75 */;
    color: $color20;
    background: $color21;
    border-bottom: 1px  /* 1/3.75 */ solid rgba(black, .1);

    i {
      font-size: 5.6vw  /* 21/3.75 */;
    }

    .placeholder {
      width: 5.6vw  /* 21/3.75 */;
    }
  }
</style>
