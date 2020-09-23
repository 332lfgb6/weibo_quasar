<template>
  <div class="search">
    <div class="nav-bar">
      <i @click="$router.back()" class="iconfont icon-back"/>
      <div class="search-icon-container">
        <i class="iconfont icon-search"></i>
      </div>
      <input @keyup="searchByKeyword" placeholder="江苏卫视大剧片单" type="text" v-model="keyword">
      <div class="placeholder"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    searchByKeyword (e) {
      // 如果按的不是回车键，那就什么都不做
      if (e.keyCode !== 13) {
        return
      }

      // 如果关键字以#开始结束，那么跳转到话题页
      const regExp = /^#(.*)#$/
      const keyword = this.keyword
      if (regExp.test(keyword)) {
        const topicName = regExp.exec(this.keyword)[1]
        this.$router.push({ name: 'Topic', params: { topicName } })
        return
      }

      // 如果关键字不以#开始结束，那么跳转到结果页
      this.$router.push({ name: 'Result', params: { keyword } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    height: 11.73vw  /* 44/3.75 */;
    background: white;
    display: flex;
    align-items: center;
    padding: 0 3.2vw  /* 12/3.75 */;

    .icon-back {
      margin-right: 3.2vw  /* 12/3.75 */;
    }

    .search-icon-container {
      height: 7.47vw  /* 28/3.75 */;
      width: 9.6vw  /* 36/3.75 */;
      background: $color31;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4vw  /* 15/3.75 */ 0 0 4vw  /* 15/3.75 */;
    }

    input {
      background: $color31;
      border: none;
      outline: none;
      height: 7.47vw  /* 28/3.75 */;
      flex: 1;
      font-size: 3.73vw  /* 14/3.75 */;
    }

    .placeholder {
      height: 7.47vw  /* 28/3.75 */;
      width: 9.6vw  /* 36/3.75 */;
      background: $color31;
      border-radius:  0 4vw  /* 15/3.75 */4vw 0  /* 15/3.75 */;
    }
  }
</style>
