<template>
  <router-link :to="{ name: 'Test' }" class="section">
    <div class="container">
      <div class="left">
        <div class="icon-background" :style="{ background: iconBackgroundColor }">
          <i class="iconfont" :class="iconfont"/>
        </div>
        <span class="text">{{ text }}</span>
      </div>
      <i class="iconfont icon-enter"/>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Section',
  props: ['iconBackgroundColor', 'iconfont', 'text']
}
</script>

<style lang="scss" scoped>
  .section {
    display: block;
    border-bottom: 0.27vw  /* 1/3.75 */ solid rgba(grey, .1);

    .container {
      height: 19.73vw  /* 74/3.75 */;
      padding: 0 3.2vw  /* 12/3.75 */;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .icon-background {
          width: 13.33vw  /* 50/3.75 */;
          height: 13.33vw  /* 50/3.75 */;
          border-radius: 6.67vw  /* 25/3.75 */;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            color: white;
            font-size: 7.47vw  /* 28/3.75 */;
          }
        }

        .text {
          margin-left: 2.67vw  /* 10/3.75 */;
        }
      }
    }
  }
</style>
