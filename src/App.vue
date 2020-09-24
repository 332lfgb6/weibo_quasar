<template>
  <div id="q-app" ref="root" class="root">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name: 'App',
  methods: {
    logout () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style lang="scss"></style>
