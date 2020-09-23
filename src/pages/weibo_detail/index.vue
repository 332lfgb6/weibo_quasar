<template>
  <div class="weibo-detail">
    <nav-bar @click.native="closeCommentMode"/>
    <div @click="closeCommentMode" ref="container" class="container">
      <a-weibo :weibo="weiboDetail"/>
      <PlaceHolder/>
      <div class="actions">
        <div class="action"
             v-for="action in actions"
             :key="action.actionName"
             :class="{ 'activated-action': currentActionName === action.actionName }">
          {{ action.actionName }}{{ action.number }}
        </div>
      </div>

      <!--根评论列表-->
      <div class="comment-weibo-list">
        <a-comment v-for="rootComment in rootCommentList"
                   :key="rootComment.id"
                   :comment="rootComment"/>
      </div>
    </div>
    <Actions2 @pushNewRootComment="pushNewRootComment"/>
  </div>
</template>

<script>
import NavBar from 'pages/weibo_detail/NavBar'
import AWeibo from 'components/AWeibo'
import { getWeiboDetail } from 'src/api/weibo'
import PlaceHolder from 'pages/weibo_detail/Placeholder'
import { getCommentList } from 'src/api/comment'
import Actions2 from 'pages/weibo_detail/Actions2'
import { bus } from 'src/utils/bus'
import AComment from 'components/AComment'
export default {
  name: 'index',
  components: { AComment, Actions2, PlaceHolder, NavBar, AWeibo },
  data () {
    return {
      showPopup: false,
      weiboDetail: {
        user: {},
        images: []
      },
      show: true,
      rootCommentList: [],
      scrollBarHeight: 0,
      currentActionName: '评论',
      insertShareWeiboList: false,
      insertAgreeWeiboList: false,
      shareWeiboList: []
    }
  },
  computed: {
    actions () {
      // eslint-disable-next-line
      const { share_number, comment_number, agree_number } = this.weiboDetail
      return [
        { actionName: '转发', number: share_number },
        { actionName: '评论', number: comment_number },
        { actionName: '赞', number: agree_number }
      ]
    }
  },
  activated () {
    this.getWeiboDetail()
    this.getRootCommentList()
  },
  deactivated () {
    this.currentActionName = '评论'
  },
  methods: {
    pushNewRootComment (newRootComment) {
      this.rootCommentList.push(newRootComment)
    },
    closeCommentMode () {
      bus.$emit('closeCommentMode')
    },
    getWeiboDetail () {
      const weiboID = this.$route.params.weiboID
      getWeiboDetail(weiboID).then(res => {
        this.weiboDetail = res.data
      })
    },
    getRootCommentList () {
      getCommentList({
        weibo: this.$route.params.weiboID,
        parent: 0
      }).then(res => {
        this.rootCommentList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .test {
    width: 100px;
    height: 100px;
    background: green;
  }

  .weibo-detail {
    background: $color22;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .container {
      flex: 1;
      overflow-y: scroll;

      .actions {
        height: 10.67vw  /* 40/3.75 */;
        margin-top: 2.13vw  /* 8/3.75 */;
        padding-left: 3.2vw  /* 12/3.75 */;
        display: flex;
        background: white;
        font-size: 3.73vw  /* 14/3.75 */;
        color: $color24;
        border-bottom: 1px solid $color22;

        .action {
          margin-right: 6.4vw  /* 24/3.75 */;
          display: flex;
          align-items: center;
          position: relative;

          .line {
            width: 3.73vw  /* 14/3.75 */;
            height: 0.53vw  /* 2/3.75 */;
            position: absolute;
            bottom: 1.07vw  /* 4/3.75 */;
            left: 1.07vw  /* 4/3.75 */;
          }
        }

        .activated-action {
          color: $color23;

          .line {
            background: $color23;
          }
        }
      }
    }
  }
</style>
