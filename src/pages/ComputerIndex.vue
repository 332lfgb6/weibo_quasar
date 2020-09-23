<template>
  <div class="computer-index">
    <span>这是一个手机浏览器作品，你可以通过以下三种方式来预览：</span>
    <ol>
      <li>手机浏览器（推荐）</li>
      <li>电脑浏览器的手机模式</li>
      <li>手机模拟器</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'ComputerIndex'
}
</script>

<style lang="scss" scoped>
  .computer-index {
    font-size: 16px;
    padding: 16px;

    span {
      font-weight: bolder;
    }
  }
</style>
