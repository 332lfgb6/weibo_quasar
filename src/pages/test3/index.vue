<template>
    <div @click="backTest1">替换test2</div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    backTest1 () {
      this.$router.replace({ name: 'Test1' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
