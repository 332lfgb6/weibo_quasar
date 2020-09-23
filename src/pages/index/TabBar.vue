<template>

</template>

<script>
import { getCategoryList } from 'src/api/category'

export default {
  name: 'TabBar',
  props: {
    currentTab: {
      type: String,
      default: '热门'
    }
  },
  data () {
    return {
      active: 2,
      currentCategory: '',
      categoryList: [],
      showAllCategories: false
    }
  },
  created () {
    this.getCategoryList()
  },
  activated () {
    const category = getCategoryID()
    if (category) {
      this.active = category.index
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
