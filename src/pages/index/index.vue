<template>
  <div class="index" ref="index">
    <nav-bar/>
    <!--<tab-bar @switchTab="switchTab"/>-->
    <div class="tab-bar">
      <div class="tab-bar-container">
        <van-tabs v-model="activeTabIndex"
                  duration="0"
                  class="container"
                  color="#282f3c"
                  line-width="3.73vw"
                  line-height="0.53vw"
                  @click="switchTab(activeTabIndex)"
                  title-active-color="black"
                  title-inactive-color="#a5adb5"
                  ref="tabs">
          <van-tab :title="category.name" v-for="category in categoryList" :key="category.id"></van-tab>
        </van-tabs>
        <div v-if="!showAllCategories" @click="openClose" class="show-more">
          <i class="iconfont icon-bottom"/>
        </div>
        <div v-else @click="openClose" class="show-more">
          <i class="iconfont icon-top"/>
        </div>
      </div>
      <div class="tab-bar-for-all">
        <div v-if="showAllCategories" class="all-category">
          <div
            @click="switchTabBottom(index)"
            class="category-container"
            :class="{ 'active-category': activeTabIndex ===  index}"
            v-for="(category, index) in categoryList"
            :key="category.id">
            <div class="category" v-text="category.name" ></div>
          </div>
        </div>
      </div>
    </div>
    <a-weibo :weibo="weibo" v-for="weibo in weiboList" :key="weibo.id"/>
    <login-register/>
  </div>
</template>

<script>
import NavBar from 'pages/index/NavBar'
// import WeiboList from '../../components/weibo_list'
import { getWeiboList } from 'src/api/weibo'
// import { getCategory } from 'src/utils/category'
import LoginRegister from 'pages/index/LoginRegister'
import AWeibo from 'components/AWeibo'
import { getCategoryList } from 'src/api/category'
import { Tabs, Tab } from 'vant'
import Vue from 'vue'
import { getCategoryID, setCategoryID } from 'src/utils/category'
// import { getCategory, setCategory } from 'src/utils/category'
Vue.use(Tabs)
Vue.use(Tab)
// import { setCategory } from 'src/utils/category'
// import { bus } from 'src/utils/bus'

export default {
  name: 'index',
  components: {
    LoginRegister,
    NavBar,
    AWeibo
    // WeiboList
  },
  data () {
    return {
      showAllCategories: false,
      activeTabIndex: 0,
      getWeiboListParams: {
        // ID为1的类别是“热门”
        category_id: 3
      },
      operation: '切换标签',
      weiboList: [],
      scrollBarHeight: 0,
      categoryList: []
    }
  },
  activated () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      getCategoryList().then(res => {
        if (!this.$store.state.user.id) {
          res.data.shift()
        }
        this.categoryList = res.data

        // 第一次访问该网站时，需要读取本地存储，切换到对应的类别
        const categoryID = getCategoryID()
        if (categoryID) {
          this.categoryList.forEach((item, index) => {
            if (item.id === categoryID) {
              this.activeTabIndex = index
            }
          })
          this.getWeiboListParams.category_id = categoryID
        }
        this.getWeiboList()
      })
    },
    changeWeiboAgreeNumber (payload) {
      if (payload.addOne) {
        const currentWeibo = this.weiboList[payload.weiboIndex]
        this.$set(this.weiboList[payload.weiboIndex], 'agreeNumber', currentWeibo.agreeNumber + 1)
      }
    },
    switchTab (activeTabIndex) {
      const categoryID = this.categoryList[activeTabIndex].id
      this.getWeiboListParams.category_id = categoryID
      setCategoryID(categoryID)
      document.querySelector('body').scrollTop = 0
      document.querySelector('html').scrollTop = 0
      this.getWeiboList()
    },
    getWeiboList () {
      getWeiboList(this.getWeiboListParams).then(res => {
        this.weiboList = res.data.weiboList
      })
    },
    switchTabBottom (activeTabIndex) {
      this.$refs.tabs.scrollTo(activeTabIndex)
      this.showAllCategories = false
      this.switchTab(activeTabIndex)
    },
    openClose () {
      this.showAllCategories = !this.showAllCategories
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-bar {
    position: sticky;
    top: 11.73vw  /* 44/3.75 */;
    z-index: 5;
    background: $color21;

    .tab-bar-container {
      display: flex;

      .container {
        flex: 1;

        /deep/ .van-hairline--top-bottom::after {
          border: none;
        }

        /deep/ .van-tabs__wrap {
          height:  10.13vw  /* 38/3.75 */;
        }

        /deep/ .van-hairline--top-bottom::after {
          border-top: none;
        }

        /deep/ .van-tabs__nav {
          background: $color21;
        }

        /deep/ .van-tabs__nav--line {
          height: 90%;
        }

        /deep/ .van-tab {
          font-size: 4.27vw  /* 16/3.75 */;
        }
      }

      .show-more {
        width: 11.73vw  /* 44/3.75 */;
        height: 11.73vw  /* 44/3.75 */;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 1.6vw  /* 6/3.75 */;
      }
    }

    .tab-bar-for-all {
      position: relative;
      background: $color21;

      .all-category {
        padding: 1.07vw  /* 4/3.75 */ 2.13vw  /* 8/3.75 */ 4.27vw  /* 16/3.75 */ 2.13vw  /* 8/3.75 */;
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        background: $color21;
        z-index: 5;
        top: 0;
        left: 0;
        right: 0;

        .category-container {
          width: 25%;
          height: 11.73vw  /* 44/3.75 */;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.73vw  /* 14/3.75 */;

          .category {
            width: 21.8vw  /* 81.75/3.75 */;
            height: 9.07vw  /* 34/3.75 */;
            display: flex;
            align-items: center;
            justify-content: center;
            background: $background2;
            border-radius: 0.8vw  /* 3/3.75 */;
          }
        }

        .active-category {
          color: $color18;
        }
      }
    }
  }
</style>
