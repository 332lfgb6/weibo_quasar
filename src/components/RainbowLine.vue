<template>
  <div class="rainbow-line"></div>
</template>

<script>
export default {
  name: 'RainbowLine'
}
</script>

<style lang="scss" scoped>
  .rainbow-line {
    height: 100%;
    width: 4px;
    background: linear-gradient($negative, $accent);
  }
</style>
