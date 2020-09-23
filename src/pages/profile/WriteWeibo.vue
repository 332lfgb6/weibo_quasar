<template>
<i @click="$router.push({ name: 'Compose' })" class="iconfont icon-write write-weibo"/>
</template>

<script>
export default {
  name: 'WriteWeibo'
}
</script>

<style lang="scss" scoped>
  .write-weibo {
    position: fixed;
    right: 5.33vw  /* 20/3.75 */;
    bottom: 10.67vw  /* 40/3.75 */;
    width: 16vw  /* 60/3.75 */;
    height: 16vw  /* 60/3.75 */;
    border-radius: 8vw  /* 30/3.75 */;
    background: $color12;
    color: white;
    font-size: 6.4vw  /* 24/3.75 */;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
