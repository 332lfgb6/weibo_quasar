<template>
  <div class="actions2">
    <div v-if="!commentModeStatus" class="actions" @click="openCommentMode">
      <input class="readonly-input"
             v-model="weiboIDCommentContent[$route.params.weiboID]"
             placeholder="发表评论"/>
    </div>
    <div v-else class="comment-mode">
      <textarea-autosize
        placeholder="发表评论"
        ref="myTextarea"
        v-model="weiboIDCommentContent[$route.params.weiboID]"
        :min-height="30"
        :max-height="350"
        class="content"
        rows="1"
      />
      <div class="emoji-send">
        <div @click="sendComment" class="send-btn" :class="{ 'can-send': canSend }">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from 'src/utils/bus'
import Vue from 'vue'
import VueTextareaAutosize from 'vue-textarea-autosize'
import { addComment } from 'src/api/comment'
Vue.use(VueTextareaAutosize)

export default {
  name: 'Actions2',
  data () {
    return {
      commentModeStatus: false,
      canSend: false,
      IWannaDoSth: false,
      currentHeight: 0,
      weiboIDCommentContent: {}
    }
  },
  computed: {
    currentWeiboIDCommentContent () {
      return this.weiboIDCommentContent[this.$route.params.weiboID]
    }
  },
  watch: {
    currentWeiboIDCommentContent (newValue) {
      if (newValue !== '') {
        this.canSend = true
      } else {
        this.canSend = false
      }
    }
  },
  created () {
    bus.$on('closeCommentMode', () => { this.commentModeStatus = false })
  },
  activated () {
    // if (this.IWannaDoSth) {
    //   this.$parent.$el.children[1].scrollTop = this.currentHeight
    // }
    // if (this.$store.state.app.comment !== '' && this.$store.state.user.isLogin) {
    //   this.sendComment()
    // }
    if (typeof this.weiboIDCommentContent[this.$route.params.weiboID] !== 'string') {
      this.$set(this.weiboIDCommentContent, this.$route.params.weiboID, '')
    }
  },
  deactivated () {
    this.commentModeStatus = false
  },
  methods: {
    openCommentMode () {
      this.commentModeStatus = true
      this.$nextTick(() => this.$refs.myTextarea.$el.focus())
    },
    sendComment () {
      if (this.weiboIDCommentContent[this.$route.params.weiboID] !== '') {
        if (this.$store.state.user.isLogin) {
          const userID = this.$store.state.user.id
          const weiboID = this.$route.params.weiboID
          const content = this.currentWeiboIDCommentContent.replace(/[<|>]/g, '')
          const formData = new FormData()

          formData.append('user', userID)
          formData.append('weibo', weiboID)
          formData.append('content', content)

          addComment(formData).then(res => {
            this.$parent.getRootCommentList()
            this.weiboIDCommentContent[this.$route.params.weiboID] = ''
            this.commentModeStatus = false
          })
        } else {
          this.IWannaDoSth = true
          this.currentHeight = this.$parent.$el.children[1].scrollTop
          this.$store.commit('app/SET_REDIRECT_ROUTE', this.$route.path)
          this.$router.push({ name: 'LoginByEmail' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .actions2 {
    background: white;
    border-top: 0.27vw  /* 1/3.75 */ solid $color22;

    .actions {
      height: 13.33vw  /* 50/3.75 */;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 6.4vw  /* 24/3.75 */ 0 3.2vw  /* 12/3.75 */;

      .readonly-input {
        width: 100%;
        border: none;
        color: $color1;
      }

      i {
        font-size: 5.6vw  /* 21/3.75 */;

        &:last-child {
          margin-left: 6.4vw  /* 24/3.75 */;
        }
      }
    }

    .comment-mode {
      min-height: 24vw  /* 90/3.75 */;
      padding: 3.2vw  /* 12/3.75 */;

      .content {
        outline: none;
        border: none;
        width: 100%;
      }

      .emoji-send {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 2.13vw  /* 8/3.75 */;
        height: 7.73vw  /* 29/3.75 */;

        .icon-xiaolian {
          font-size: 6.4vw  /* 24/3.75 */;
        }

        .send-btn {
          margin-left: 6.4vw  /* 24/3.75 */;
          width: 16.53vw  /* 62/3.75 */;
          height: 7.73vw  /* 29/3.75 */;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: $color12;
          border-radius: 0.53vw  /* 2/3.75 */;
          font-size: 4vw  /* 15/3.75 */;
          opacity: .5;
        }

        .can-send {
          opacity: 1;
        }
      }
    }
  }
</style>
