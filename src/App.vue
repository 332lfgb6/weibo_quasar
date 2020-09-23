<template>
  <div id="q-app" ref="root" class="root">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { bus } from 'src/utils/bus'

export default {
  name: 'App',
  mounted () {
    bus.$on('scrollToZero', () => {
      this.$refs.root.scrollTop = 0
      console.log(this.$refs.root)
    })
  },
  methods: {
    logout () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style lang="scss"></style>
