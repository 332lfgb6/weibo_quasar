<template>
  <div class="common">
    <i @click="$router.back()" class="iconfont icon-back close-btn"/>
    <div class="content" v-html="reading"></div>
  </div>
</template>

<script>
import { getCommonApi } from 'src/api/user'

export default {
  name: 'index',
  data () {
    return {
      reading: '',
      userAgreement: '',
      privacyPolicy: ''
    }
  },
  created () {
    this.getCommon()
  },
  methods: {
    getCommon () {
      getCommonApi().then(res => {
        this.userAgreement = res.data.user_agreement
        this.privacyPolicy = res.data.privacy_policy
        if (this.$route.query.showUserAgreement) {
          this.reading = this.userAgreement
        } else {
          this.reading = this.privacyPolicy
        }
      })
    }
  },
  activated () {
    if (this.$route.query.showUserAgreement) {
      this.reading = this.userAgreement
    } else {
      this.reading = this.privacyPolicy
    }
  }
}
</script>

<style lang="scss" scoped>
  i {
    font-size: 8vw  /* 30/3.75 */;
    margin-left: 2.67vw  /* 10/3.75 */;
  }

  .content {
    padding: 2.13vw  /* 8/3.75 */;
  }
</style>
