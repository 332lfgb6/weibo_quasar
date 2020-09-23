<template>
  <div class="nav-bar">
    <i @click="$router.back()" class="iconfont icon-back"/>
    <span @click="$router.push({ name: 'Exit' })">设置</span>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    background: white;
    height: 11.73vw  /* 44/3.75 */;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.27vw  /* 8.5/3.75 */ 5.33vw  /* 20/3.75 */;

    i {
      font-size: 5.33vw  /* 20/3.75 */;
    }
  }
</style>
