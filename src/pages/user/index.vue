<template>
  <div class="user">
    <span class="overlay">
      <div class="shadow">
        <div @click="$router.back()" class="back">
        <i class="iconfont icon-back"/>
        <span>返回</span>
      </div>
        <div class="avatar-part">
          <div class="avatar-container">
          <img :src="serverHostPort.pro + userInfo.avatar" alt="" class="avatar">
        </div>
        </div>
        <div class="user-info-container">
      <div class="user-info">
      <div class="nickname-gender-level">
        <span class="nickname" v-text="userInfo.nickname"></span>
        <span class="gender">{{ userInfo.gender }}</span>
        <span class="level" v-if="userInfo.vip_level === 0">未开通会员</span>
        <span class="level" v-else>会员{{ userInfo.vip_level }}级</span>
      </div>
      <div class="follow-fans">
        <span>关注</span>
        <span class="follower_number">{{ userInfo.follower_number }}</span>
        <span class="line">|</span>
        <span>粉丝</span>
        <span class="fans">{{ userInfo.fans_number }}</span>
      </div>
      <span class="brief ellipsis">{{ userInfo.brief }}</span>
    </div>
    </div>
      </div>
    </span>
    <a-weibo v-for="weibo in weiboList" :key="weibo.id" :weibo="weibo"/>
    <div v-if="!userInfo.follow_id" @click="follow(userInfo.id, userInfo.follow_id)" class="follow"><i class="iconfont icon-add"/>关注</div>
    <div v-else @click="follow(userInfo.id, userInfo.follow_id)" class="followed">已关注</div>
  </div>
</template>

<script>
import { getWeiboList } from 'src/api/weibo'
import AWeibo from 'components/AWeibo'
import { follow } from 'src/mixins/follow'
import { serverHostPort } from 'src/utils/pure'

export default {
  name: 'index',
  components: { AWeibo },
  mixins: [follow],
  data () {
    return {
      userInfo: {},
      weiboList: [],
      serverHostPort
    }
  },
  activated () {
    this.getWeiboList()
  },
  methods: {
    getWeiboList () {
      const nickname = this.$route.params.user
      getWeiboList({ nickname }).then(res => {
        this.userInfo = res.data.user
        this.weiboList = res.data.weiboList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
    background: $color6;
    margin-bottom: 12vw  /* 45/3.75 */;

    .follow {
      height: 12vw  /* 45/3.75 */;
      background: $color40;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color18;
      font-size: 4vw  /* 15/3.75 */;
    }

    .followed {
      height: 12vw  /* 45/3.75 */;
      background: $color40;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color3;
      font-size: 4vw  /* 15/3.75 */;
    }

    .overlay {
      height: 56vw /* 210/3.75 */;
      background: url("https://tva1.sinaimg.cn/mw690/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg");
      background-size: cover;
      background-position: 50%;
      display: block;

      .shadow {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.5));

        .back {
          color: white;
          padding-left: 2.67vw /* 10/3.75 */
        ;
          height: 11.73vw /* 44/3.75 */
        ;
          display: flex;
          align-items: center;
          font-size: 4vw /* 15/3.75 */
        ;

          i {
            font-size: 5.33vw /* 20/3.75 */
          ;
          }
        }

        .avatar-part {
          height: 20.8vw /* 78/3.75 */
        ;
          display: flex;
          align-items: center;
          justify-content: center;

          .avatar-container {
            position: relative;

            .avatar {
              width: 18.67vw /* 70/3.75 */
            ;
              height: 18.67vw /* 70/3.75 */
            ;
              border-radius: 9.33vw /* 35/3.75 */
            ;
            }

            .v {
              width: 3.73vw /* 14/3.75 */
            ;
              height: 3.73vw /* 14/3.75 */
            ;
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }

        .user-info {
          height: 23.47vw /* 88/3.75 */;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          line-height: 1;
          background: linear-gradient(180deg,rgba(0,0,0,.01) 40%,rgba(0,0,0,.95));
          color: white;
          text-shadow: 0 1px 1px rgba(0, 0, 0, .5);

          .nickname-gender-level {
            font-size: 4.8vw /* 18/3.75 */
          ;
            color: white;

            .gender {
              margin: 0 1.33vw  /* 5/3.75 */;
              font-size: 3.73vw  /* 14/3.75 */;
            }

            .level {
              font-size: 3.2vw  /* 12/3.75 */;
            }
          }

          .follow-fans {
            font-size: 3.2vw  /* 12/3.75 */;

            .follower_number, .fans {
              margin-left: 1.33vw  /* 5/3.75 */;
            }

            .line {
              margin: 2.67vw  /* 10/3.75 */;
            }
          }

          .brief {
            text-align: center;
            width: 100%;
            font-size: 3.2vw  /* 12/3.75 */;
            padding: 0 3.2vw  /* 12/3.75 */;
          }
        }
      }
    }
  }
</style>
