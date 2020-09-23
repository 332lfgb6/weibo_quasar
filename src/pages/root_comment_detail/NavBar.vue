<template>
  <div class="nav-bar">
    <i @click="$router.back()" class="iconfont icon-back"/>
    <span>{{ childCommentNumber }}条回复</span>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['childCommentNumber']
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    height: 11.73vw  /* 44/3.75 */;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4.53vw  /* 17/3.75 */;
    color: $color20;
    border-bottom: 0.27vw  /* 1/3.75 */ solid $color30;

    i {
      font-size: 21px;
      margin-left: 4.27vw  /* 16/3.75 */;
    }

    .placeholder {
      width: 5.6vw  /* 21/3.75 */;
    }
  }
</style>
