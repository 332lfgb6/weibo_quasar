<template>
  <div>
    <div @click="openPopup(comment.parent)" class="a-comment" :class="{ 'a-grey-comment': background === 'grey' }">
      <div class="avatar-authentication"
           @click.stop="$router.push({ name: 'User', params: { user: comment.user.nickname } })">
        <img class="avatar" :src="comment.user.avatar" alt="">
        <img src="../assets/authentication/blue.png"
             v-if="comment.user.authentication === '蓝v认证'" class="v"/>
        <img src="../assets/authentication/yellow.png"
             v-else-if="comment.user.authentication === '黄v认证'" class="v"/>
        <img src="../assets/authentication/gold.png"
             v-else-if="comment.user.authentication === '金v认证'" class="v"/>
      </div>
      <div class="main">
        <div class="nickname"
             @click.stop="$router.push({ name: 'User', params: { user: comment.user.nickname } })">
          {{ comment.user.nickname }}
        </div>
        <div class="content" v-html="finalComment.content"></div>
        <img v-if="comment.image" :src="comment.image" alt="">
        <div v-if="comment.child_comment_number"
             class="child-comment-number">
          <span @click="showDetail(comment.id, comment.weibo.id)">
            共{{ comment.child_comment_number }}条回复<i class="iconfont icon-enter"/>
          </span>
        </div>
        <div class="time-actions">
          <div class="time">{{ finalComment.pub_time }}</div>
          <div class="actions">
            <span :class="{ 'before-agree': !finalComment.user_agree_comment_id, 'agreed': finalComment.user_agree_comment_id }" @click.stop="agreeComment(finalComment.id, finalComment.user_agree_comment_id)">
              <i class="iconfont icon-agree"/>
              <span class="agree-number">{{ comment.agree_number }}</span>
            </span>
            <i @click.stop="reply(comment.id, comment.parent)" class="iconfont icon-comment"/>
          </div>
        </div>
        <div v-if="$route.name !== 'WeiboDetail' && !finalComment.parent"
             @click="$router.push({ name: 'WeiboDetail', params: { weiboID: $route.params.weiboID } })"
             class="show-origin-weibo">查看原微博</div>
      </div>
      <div class="line"></div>
    </div>

    <!--回复举报popup-->
    <van-popup class="popup" v-model="showPopup" position="bottom">
      <div class="hide-btn" @click.stop="reply(comment.id, comment.parent)">回复</div>
      <div class="hide-btn" @click.stop="report">举报</div>
      <div class="hide-btn" @click.stop="closePopup">取消</div>
    </van-popup>

  </div>
</template>

<script>
import { formatTime } from 'src/utils/format.time'
import { parseWeibo } from 'src/utils/parse.weibo'
import Vue from 'vue'
import { Toast, Popup } from 'vant'
import { agreeComment, disagreeComment } from 'src/api/user_agree_comment'

Vue.use(Popup)
Vue.use(Toast)
export default {
  name: 'AComment',
  // 在此处，灰代表$color33: #f7f7f7
  props: ['comment', 'background'],
  data () {
    return {
      showPopup: false
    }
  },
  computed: {
    finalComment () {
      const processedComment = JSON.stringify(this.comment)
      const finalComment = JSON.parse(processedComment)
      finalComment.pub_time = formatTime(finalComment.pub_time)
      finalComment.content = parseWeibo(this, finalComment.content)
      return finalComment
    }
  },
  created () {
    window.forwardUserPage = this.forwardUserPage
    window.forwardTopicPage = this.forwardTopicPage
  },
  activated () {
    this.showPopup = false
  },
  methods: {
    agreeComment (commentID, userAgreeCommentID) {
      const userID = this.$store.state.user.id
      if (!userID) {
        this.$store.commit('app/SET_REDIRECT_ROUTE', this.$route.path)
        this.$router.push({ name: 'LoginByEmail' })
      } else {
      //  如果有user_agree_comment_id，代表当前用户已经点赞了，所以接下来会取消点赞
        if (userAgreeCommentID) {
          disagreeComment(userAgreeCommentID).then(res => {
            if (this.$route.name === 'WeiboDetail') {
              this.$parent.getRootCommentList()
            } else {
              this.$parent.getCommentList()
              this.$parent.getCommentDetail()
            }
          })
        } else {
          agreeComment({
            user: userID,
            comment: commentID
          }).then(res => {
            if (this.$route.name === 'WeiboDetail') {
              this.$parent.getRootCommentList()
            } else {
              this.$parent.getCommentList()
              this.$parent.getCommentDetail()
            }
          })
        }
      }
    },
    forwardUserPage (e, user) {
      // 阻止冒泡
      e.stopPropagation()
      this.$router.push({ name: 'User', params: { user } })
    },
    forwardTopicPage (e, topicName) {
      e.stopPropagation()
      this.$router.push({ name: 'Topic', params: { topicName } })
    },
    openPopup (parent) {
      if (this.$route.name === 'RootCommentDetail' && !parent) {} else {
        this.showPopup = true
      }
    },
    closePopup () {
      this.showPopup = false
    },
    reply (commentID, parentCommentID) {
      this.$store.commit('app/SET_REDIRECT_ROUTE', this.$route.path)
      // 如果当前评论没有根评论
      if (!parentCommentID) {
        this.$router.push({ name: 'ReplyRootComment', params: { weiboID: this.$route.params.weiboID, rootCommentID: commentID } })
        return
      }

      // 如果当前评论有根评论
      if (parentCommentID) {
        this.$router.push({ name: 'ReplyChildComment', params: { weiboID: this.$route.params.weiboID, rootCommentID: this.$route.params.rootCommentID, childCommentID: commentID } })
      }
    },
    report () {
      this.showPopup = false
      Toast.success('举报成功')
    },
    showDetail (commentID, weiboID) {
      this.$router.push({ name: 'RootCommentDetail', params: { weiboID, rootCommentID: commentID } })
      this.$emit('recordScrollbarHeight')
    }
  }
}
</script>

<style lang="scss" scoped>
  .a-comment {
    padding: 3.2vw  /* 12/3.75 */;
    display: flex;
    align-items: flex-start;
    background: white;
    position: relative;

    .avatar-authentication {
      position: relative;
      margin-right: 2.13vw  /* 8/3.75 */;

      .avatar {
        width: 8.53vw  /* 32/3.75 */;
        height: 8.53vw  /* 32/3.75 */;
        border-radius: 4.27vw  /* 16/3.75 */;
      }

      .v {
        width: 3.73vw  /* 14/3.75 */;
        height: 3.73vw  /* 14/3.75 */;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .main {
      margin-left: 2.13vw  /* 8/3.75 */;
      flex: 30;

      .nickname {
        font-size: 3.73vw  /* 14/3.75 */;
        color: $color1;
        margin-bottom: 1.6vw  /* 6/3.75 */;
      }

      .content {
        color: $color1;
        margin-bottom: 1.6vw  /* 6/3.75 */;

        /deep/ {
          img {
            width: 4.27vw  /* 16/3.75 */;
            height: 4.27vw  /* 16/3.75 */;
          }

          a {
            color: $color37;
          }
        }
      }

      img {
        width: 26.67vw  /* 100/3.75 */;
        margin-bottom: 1.6vw  /* 6/3.75 */;
      }

      .child-comment-number {
        background: $color33;
        font-size: 3.73vw  /* 14/3.75 */;
        color: $color37;
        padding: 2.13vw  /* 8/3.75 */ 2.67vw  /* 10/3.75 */;
      }

      .time-actions {
        margin-top: 2.13vw  /* 8/3.75 */;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: $color35;

        .actions {
          i {
            margin-right: 3px;
            font-size: 13px;
          }

          .before-agree {
            margin-right: 14px;
          }

          .agreed {
            margin-right: 14px;
            color: orange;
          }
        }
      }

      .show-origin-weibo {
        color: $color27;
        margin-top: 3.73vw  /* 14/3.75 */;
      }
    }

    .line {
      position: absolute;
      bottom: 0;
      right: 0;
      width: calc(100vw - 13.87vw  /* 52/3.75 */);
      height: 0.27vw  /* 1/3.75 */;
      background: $color22;
    }
  }

  .popup {
    background: $color26;

    .hide-btn {
      height: 12.8vw  /* 48/3.75 */;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color1;
      font-size: 4.8vw  /* 18/3.75 */;
      background: white;

      &:last-of-type {
        margin-top: 1.33vw  /* 5/3.75 */;
      }
    }
  }

  .a-grey-comment {
    background: $color33;
  }
</style>
