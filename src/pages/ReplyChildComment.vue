<template>
  <div class="compose">
    <div class="nav-bar">
      <i @click="$router.back()" class="iconfont icon-back"/>
      <span class="share-weibo">回复评论</span>
      <span @click="newRecord" class="send-btn" :class="{ 'can-send': canSend }">发送</span>
    </div>
    <div class="content-preview">
      <textarea-autosize @focus.native="textareaGetFocus"
                         rows="3"
                         ref="textarea"
                         v-model="content[$route.params.childCommentID]" :placeholder="placeholder"/>
      <van-uploader
        v-show="showPreview"
        ref="uploader"
        max-count="1"
        v-model="files"
        :before-read="beforeRead"
        :after-read="afterRead"
        multiple>
        <template #default>
          <div class="upload-area">
            <i class="iconfont icon-add"/>
          </div>
        </template>
      </van-uploader>
      <div class="placeholder"></div>
      <div class="about-the-weibo">
        <img :src="weibo.user.avatar" alt="">
        <div class="right">
          <div class="nickname">@{{ weibo.user.nickname }}</div>
          <div class="content ellipsis-2-lines" v-html="weibo.content"></div>
        </div>
      </div>
    </div>
    <div ref="action" class="hide-btn">
      <div class="top">
        <div @click="toggleSameTimeShareStatus" class="same-time-share">
          <i v-if="!isSameTimeShare" class="iconfont icon-checkbox2"/>
          <i v-else class="iconfont icon-checkbox1"/>
          <span>同时转发</span>
        </div>
      </div>
      <div class="center">
        <i @click="chooseFile" class="iconfont icon-tupian"/>
        <i @click="toggleEmojiBar" class="iconfont icon-xiaolian"/>
      </div>
      <div v-if="showEmojiBar" class="bottom">
        <van-swipe>
          <van-swipe-item v-for="item in swipeItemNumber" :key="item">
            <div class="img-container-container">
              <div class="emotion-container" :key="emotion.value" v-for="emotion in filterEmotions(item)">
                <img class="emotion"
                     @click="confirmEmotion(emotion.value)"
                     :src="emotion.icon"
                     :key="emotion.value"
                     :alt="item.value"/>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Uploader, Toast } from 'vant'
import { emotionsArray } from 'assets/emotions.array'
import { getWeiboDetail, newWeibo } from 'src/api/weibo'
import VueTextareaAutosize from 'vue-textarea-autosize'
import { parseWeibo } from 'src/utils/parse.weibo'
import { addComment, getCommentDetail } from 'src/api/comment'

Vue.use(VueTextareaAutosize)
Vue.use(Uploader)

Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  name: 'index',
  data () {
    return {
      isSameTimeShare: false,
      placeholder: '',
      rootCommentDetail: {},
      childCommentDetail: {},
      replyToCommentDetail: {},
      showPreview: false,
      files: [],
      publicState: '公开',
      publicStateIcon: 'icon-public',
      canSend: false,
      showEmojiBar: false,
      emotions: emotionsArray,
      textArea: null,
      weibo: {
        user: {}
      },
      commentSameTime: false,
      content: {}
    }
  },
  computed: {
    swipeItemNumber () {
      return Math.ceil(this.emotions.length / 21)
    },
    safeContent () {
      if (this.content[this.$route.params.childCommentID]) {
        return this.content[this.$route.params.childCommentID].replace(/[<|>]/g, '')
      } else {
        return this.content[this.$route.params.childCommentID]
      }
    }
  },
  watch: {
    files (newValue) {
      if (newValue.length === 0) {
        this.showPreview = false
      } else if (newValue.length === 1) {
        this.showPreview = true
      }
    },
    safeContent (newValue) {
      if (newValue !== '') {
        this.canSend = true
      } else {
        this.canSend = false
      }
    }
  },
  created () {
    window.forwardUserPage = this.forwardUserPage
    window.forwardTopicPage = this.forwardTopicPage
  },
  activated () {
    this.getRootCommentDetail()
    this.getWeiboDetail()
  },
  methods: {
    toggleSameTimeShareStatus () {
      this.isSameTimeShare = !this.isSameTimeShare
    },
    textareaGetFocus () {
      this.showEmojiBar = false
    },
    forwardUserPage (e, user) {
      // 阻止冒泡
      e.stopPropagation()
      this.$router.push({ name: 'User', params: { user } })
    },
    forwardTopicPage (e, topic) {
      e.stopPropagation()
      this.$router.push({ name: 'Topic', params: { topic } })
    },
    getWeiboDetail () {
      getWeiboDetail(this.$route.params.weiboID).then(res => {
        this.weibo = res.data
        this.weibo.content = parseWeibo(this, this.weibo.content)
      })
    },
    afterRead () {
      this.showPreview = true
    },
    beforeRead () {
      return true
    },
    chooseFile () {
      this.$refs.uploader.chooseFile()
      if (this.files.length === 1) {
        Toast.fail('评论区最多只能放一张图片')
      }
    },
    load () {
      console.log('加载完毕')
    },
    newRecord () {
      // 点击发送按钮时，如果没有输入任何内容并且没有上传任何图片，那么将什么也不做。
      let content = this.content[this.$route.params.childCommentID]
      if (content === '' && this.files.length === 0) {} else {
        // 如果没有登录，跳转到登录页
        const userID = this.$store.state.user.id
        if (!userID) {
          const routePath = this.$route.path
          this.$store.commit('app/SET_REDIRECT_ROUTE', routePath)
          this.$router.push({ name: 'LoginByEmail' })
        } else {
          const formData = new window.FormData()
          if (content === '') {
            content = '转发微博'
          }
          const prefix = `回复@${this.childCommentDetail.user.nickname}:`
          formData.append('content', prefix + content)
          formData.append('user', parseInt(this.$store.state.user.id))
          formData.append('weibo', parseInt(this.$route.params.weiboID))
          formData.append('parent', parseInt(this.$route.params.rootCommentID))
          formData.append('reply_to', parseInt(this.$route.params.childCommentID))
          const images = this.files.map(item => item.file)
          for (const image of images) {
            formData.append('images', image)
          }
          // 用户没有把“同时转发”勾上
          if (!this.isSameTimeShare) {
            addComment(formData).then(res => {
              this.content[this.$route.params.childCommentID] = ''
              this.showEmojiBar = false
              this.isSameTimeShare = false
              this.files = []
              this.$router.back()
            })
          } else {
            // 用户把同时转发勾上了
            const newWeiboFormData = new window.FormData()
            newWeiboFormData.append('content', `${content}//@${this.rootCommentDetail.user.nickname} ${this.rootCommentDetail.content}//@${this.childCommentDetail.user.nickname} ${this.childCommentDetail.content}`)
            newWeiboFormData.append('user', parseInt(this.$store.state.user.id))
            newWeiboFormData.append('related_weibo', parseInt(this.$route.params.weiboID))
            const images = this.files.map(item => item.file)
            for (const image of images) {
              newWeiboFormData.append('images', image)
            }
            Promise.all([addComment(formData), newWeibo(newWeiboFormData)]).then(res => {
              this.content[this.$route.params.childCommentID] = ''
              this.showEmojiBar = false
              this.isSameTimeShare = false
              this.files = []
              this.$router.back()
            })
          }
        }
      }
    },
    switchPublicState () {
      switch (this.publicState) {
        case '公开':
          this.publicState = '朋友圈'
          this.publicStateIcon = 'icon-friend'
          break
        case '朋友圈':
          this.publicState = '私密'
          this.publicStateIcon = 'icon-private'
          break
        case '私密':
          this.publicState = '公开'
          this.publicStateIcon = 'icon-public'
          break
      }
    },
    confirmEmotion (value) {
      if (window.getSelection) {
        // 非IE浏览器
        this.textArea.setRangeText(value)
        // 在未选中文本的情况下，重新设置光标位置
        this.textArea.selectionStart += value.length
        this.content[this.$route.params.childCommentID] = this.textArea.value
      } else if (document.selection) {
        // IE浏览器
        const sel = document.selection.createRange()
        sel.text = value
        this.content[this.$route.params.childCommentID] = this.textArea.value
      }
    },
    toggleEmojiBar () {
      this.showEmojiBar = !this.showEmojiBar
      this.textArea = this.$refs.textarea.$el
    },
    filterEmotions (item) {
      // slice: 切片
      const perNum = 21
      return this.emotions.slice(perNum * (item - 1), perNum * item)
    },
    getRootCommentDetail () {
      getCommentDetail(this.$route.params.rootCommentID).then(res => {
        this.rootCommentDetail = res.data
        // this.content = `//@${this.rootCommentDetail.user.nickname} ${this.rootCommentDetail.content}`
        const childCommentID = this.$route.params.childCommentID
        getCommentDetail(childCommentID).then(res => {
          this.childCommentDetail = res.data
          this.placeholder = `@${this.childCommentDetail.user.nickname}`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .compose {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .nav-bar {
      height: 12.27vw /* 46/3.75 */;
      padding: 2.27vw /* 8.5/3.75 */ 2.53vw /* 9.5/3.75 */;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $color21;
      border-bottom: 1px /* 1/3.75 */ solid $border-color;

      i {
        margin-left: 0.53vw  /* 2/3.75 */;
      }

      img {
        width: 7.47vw /* 28/3.75 */;
        height: 7.47vw /* 28/3.75 */;
        border-radius: 3.73vw /* 14/3.75 */;
      }

      .share-weibo {
        color: $color20;
      }

      .send-btn {
        color: $color12;
        opacity: .5;
      }

      .can-send {
        opacity: 1;
      }
    }

    .content-preview {
      background: white;
      flex: 7;
      overflow-y: scroll;
      padding: 2.56vw  /* 9.6/3.75 */;

      textarea {
        outline: 0;
        border: none;
        resize: none;
        display: block;
        padding: 0.53vw  /* 2/3.75 */;
        margin-top: 2.8vw  /* 10.5/3.75 */;
        width: 100%;
        min-height: 17.87vw !important /* 67/3.75 */
      ;
        /*height: auto;*/
      }

      textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        color: $color2;
      }

      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: $color2;
      }

      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: $color2;
      }

      textarea::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: $color2;
      }

      .van-uploader {
        width: 100%;

        .upload-area {
          width: 30vw;
          height: 30vw;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px dashed $color1;
          opacity: .3;

          i {
            font-size: 8vw /* 30/3.75 */
          ;
            color: $color1;
          }
        }

        /deep/ .van-uploader__wrapper {
          display: flex;
          flex-wrap: wrap;

          /deep/ .van-uploader__preview {
            width: 30vw;
            height: 30vw;
            margin: 0 1.8vw 1.8vw 0;

            &:nth-of-type(3n) {
              margin-right: 0;
            }

            /* ×外面的容器 */
            .van-uploader__preview-delete {
              border-radius: 0;
              width: 5.6vw /* 21/3.75 */
            ;
              height: 5.6vw /* 21/3.75 */
            ;
              display: flex;
              align-items: center;
              justify-content: center;

              i {
                position: relative;
                top: auto;
                right: auto;
                font-size: 4.8vw /* 18/3.75 */
              ;
                transform: scale(1);
              }
            }

            /deep/ .van-uploader__preview-image {
              width: 100%;
              height: 100%;
              margin: 0;
            }
          }
        }
      }

      .placeholder {
        height: 10.67vw  /* 40/3.75 */;
      }

      .about-the-weibo {
        margin: 2.67vw  /* 10/3.75 */ 0 1.6vw  /* 6/3.75 */ 0;
        display: flex;

        img {
          width: 22.4vw  /* 84/3.75 */;
          height: 22.4vw  /* 84/3.75 */;
        }

        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          margin: 0 2.67vw  /* 10/3.75 */;
          flex: 1;
          background: $color33;

          .nickname {
            color: $color1;
          }

          .content {
            color: $color3;
            font-size: 3.47vw  /* 13/3.75 */;

            /deep/ {
              img {
                width: 4.27vw  /* 16/3.75 */;
                height: 4.27vw  /* 16/3.75 */;
              }
            }
          }
        }
      }
    }

    .hide-btn {
      background: white;

      .top {
        padding: 2.8vw /* 10.5/3.75 */
        2.53vw /* 9.5/3.75 */;
        display: flex;
        justify-content: space-between;

        span {
          margin-left: 1.07vw  /* 4/3.75 */;
        }
      }

      .center {
        padding: 2.8vw /* 10.5/3.75 */
        5.33vw /* 20/3.75 */
      ;

        i {
          margin-right: 12.8vw /* 48/3.75 */
        ;
          font-size: 6.4vw /* 24/3.75 */
        ;
        }
      }

      .bottom {
        .van-swipe-item {
          height: 45.33vw /* 170/3.75 */
        ;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;

          .img-container-container {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;

            .emotion-container {
              width: 14.2vw;
              height: 14.2vw;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 8.53vw /* 32/3.75 */
              ;
                height: 8.53vw /* 32/3.75 */
              ;
              }
            }
          }
        }
      }
    }
  }
</style>
