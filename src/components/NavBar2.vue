<!--搜索结果NavBar-->
<template>
    <div class="nav-bar2" :class="{ 'shadow-to-border': shadowToBorder }">
      <i class="iconfont icon-back" @click="$router.back()"/>
      <div class="input-container">
        <i class="iconfont icon-search"/>
        <input v-model="keyword" placeholder="搜索"/>
        <i class="iconfont icon-reset reset"/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    shadowToBorder: {
      default: false
    }
  },
  data () {
    return {
      keyword: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar2 {
    height: 11.73vw  /* 44/3.75 */;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: white;

    .input-container {
      width: 87.2vw  /* 327/3.75 */;
      height: 7.47vw  /* 28/3.75 */;
      border-radius: 4vw  /* 15/3.75 */;
      background: $color31;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      font-size: 3.73vw  /* 14/3.75 */;

      input {
        width: 69.6vw  /* 261/3.75 */;
        height: 4.8vw  /* 18/3.75 */;
        border: none;
        outline: none;
        background: $color31;
      }

      .reset {
        color: $color32;
      }
    }
  }

  .shadow-to-border {
    box-shadow: none;
    border-bottom: 0.27vw  /* 1/3.75 */ solid $color30;
  }

</style>
