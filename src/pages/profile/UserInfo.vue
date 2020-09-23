<template>
  <div class="user-info">
    <div class="top">
      <img class="avatar" :src="$store.state.user.avatar" alt="">
      <div class="right">
        <div class="nickname-gender">
          <span class="nickname" v-text="$store.state.user.nickname"></span>
          <i v-if="$store.state.user.gender === '男'" class="iconfont icon-male"/>
          <i v-else class="iconfont icon-female"/>
        </div>
        <span class="brief" v-text="$store.state.user.brief"></span>
      </div>
    </div>
    <div class="center">
      <div>
        <span class="number">{{ weiboNumber }}</span>
        <div class="text">微博</div>
      </div>
      <div>
        <span class="number">{{ $store.state.user.followerNumber }}</span>
        <div class="text">关注</div>
      </div>
      <div>
        <span class="number">{{ $store.state.user.fansNumber }}</span>
        <div class="text">粉丝</div>
      </div>
      <div class="edit" @click="editProfile">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: ['weiboNumber'],
  data () {
    return {
      text: '编辑个人资料'
    }
  },
  methods: {
    editProfile () {
      if (this.text === '编辑个人资料') {
        this.text = '微博该功能在维护'
      } else {
        this.text = '编辑个人资料'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    background: white;
    padding: 4vw  /* 15/3.75 */;
    display: flex;

    .avatar {
      width: 17.07vw  /* 64/3.75 */;
      height: 17.07vw  /* 64/3.75 */;
      border-radius: 8.53vw  /* 32/3.75 */;
      margin-right: 4vw  /* 15/3.75 */;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .nickname-gender {
        .nickname {
          color: $color1;
          font-size: 5.6vw  /* 21/3.75 */;
          margin-right: 1.33vw  /* 5/3.75 */;
        }
      }

      .brief {
        color: $brief;
        font-size: 3.47vw  /* 13/3.75 */;
        margin-bottom: 1.33vw  /* 5/3.75 */;
      }
    }
  }

  .center {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 7.2vw  /* 27/3.75 */;
    background: white;

    .number {
      font-size: 4vw  /* 15/3.75 */;
    }

    .text {
      font-size: 3.47vw  /* 13/3.75 */;
    }

    .edit {
      width: 49.07vw  /* 184/3.75 */;
      height: 8.8vw  /* 33/3.75 */;
      border: 1px  /* 1/3.75 */ solid rgba($color23, .5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color23;
      font-size: 3.73vw  /* 14/3.75 */;
    }
  }
</style>
