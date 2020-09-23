<template>
  <div class="test1">
    test1组件
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
  .test1 {
    background: green;
    width: 300px;
  }
</style>
