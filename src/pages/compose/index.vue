<template>
  <div class="compose">
    <div class="nav-bar">
      <i @click="$router.back()" class="iconfont icon-back"/>
      <img v-if="$route.name === 'Compose' && $store.state.user.isLogin"
           :src="$store.state.user.avatar" alt="">
      <span @click="newWeibo" class="send-btn" :class="{ 'can-send': canSend }">发送</span>
    </div>
    <div class="content-preview">
      <textarea-autosize ref="textarea" v-model="newRecordData.content" placeholder="分享新鲜事..." :min-height="70"/>
      <van-uploader
        v-show="aboutUploadFile.showPreview"
        ref="uploader"
        v-model="aboutUploadFile.files"
        :before-read="beforeRead"
        :after-read="afterRead"
        multiple>
        <template #default>
          <div class="upload-area">
            <i class="iconfont icon-add"/>
          </div>
        </template>
      </van-uploader>
    </div>
    <div ref="action" class="hide-btn">
      <div class="top">
        <div @click="switchPublicState" class="weibo-type">
          <i class="iconfont" :class="publicStateIcon"/>
          {{ newRecordData.public_state }}
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
import { newWeibo } from 'src/api/weibo'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)
Vue.use(Uploader)

Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  name: 'index',
  data () {
    return {
      aboutUploadFile: {
        showPreview: false,
        files: []
      },
      newRecordData: {
        content: '',
        public_state: '公开'
      },
      publicStateIcon: 'icon-public',
      canSend: false,
      showEmojiBar: false,
      emotions: emotionsArray,
      textArea: null
    }
  },
  computed: {
    swipeItemNumber () {
      return Math.ceil(this.emotions.length / 21)
    }
  },
  watch: {
    'newRecordData.content' (newValue) {
      if (newValue !== '') {
        this.canSend = true
      } else {
        this.canSend = false
      }
    }
  },
  methods: {
    afterRead () {
      this.aboutUploadFile.showPreview = true
    },
    beforeRead () {
      return true
    },
    chooseFile () {
      this.$refs.uploader.chooseFile()
    },
    newWeibo () {
      const formData = new window.FormData()
      if (this.newRecordData.content === '' && this.aboutUploadFile.files.length > 0) {
        this.newRecordData.content = '分享图片'
      }
      if (this.aboutUploadFile.files.length > 0) {
        this.newRecordData.type = '图片'
      }
      const weiboContent = this.newRecordData.content.replace(/[<|>]/g, '')
      weiboContent.replace(/#(.*?)#/g, function () {
        formData.append('topic_name', arguments[1])
        return arguments[0]
      })
      formData.append('content', weiboContent)
      formData.append('type', this.newRecordData.type)
      formData.append('public_state', this.newRecordData.public_state)
      formData.append('user', parseInt(this.$store.state.user.id))
      const images = this.aboutUploadFile.files.map(item => item.file)
      for (const image of images) {
        formData.append('images', image)
      }
      newWeibo(formData).then(res => {
        this.newRecordData.content = ''
        this.publicStateIcon = 'icon-public'
        this.showEmojiBar = false
        this.$router.back()
        Toast.success('发布成功')
      })
    },
    switchPublicState () {
      switch (this.newRecordData.public_state) {
        case '公开':
          this.newRecordData.public_state = '朋友圈'
          this.publicStateIcon = 'icon-friend'
          break
        case '朋友圈':
          this.newRecordData.public_state = '私密'
          this.publicStateIcon = 'icon-private'
          break
        case '私密':
          this.newRecordData.public_state = '公开'
          this.publicStateIcon = 'icon-public'
          break
      }
    },
    confirmEmotion (value) {
      if (window.getSelection) {
        // 非IE浏览器
        this.textArea.focus()
        this.textArea.setRangeText(value)
        // 在未选中文本的情况下，重新设置光标位置
        this.textArea.selectionStart += value.length
        this.newRecordData.content = this.textArea.value
      } else if (document.selection) {
        // IE浏览器
        this.textarea.focus()
        const sel = document.selection.createRange()
        sel.text = value
        this.newRecordData.content = this.textArea.value
      }
    },
    toggleEmojiBar () {
      this.showEmojiBar = !this.showEmojiBar
      this.textArea = this.$refs.textarea.$el
      this.textArea.focus()
    },
    filterEmotions (item) {
      // slice: 切片
      const perNum = 21
      return this.emotions.slice(perNum * (item - 1), perNum * item)
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
      border-bottom: 1px /* 1/3.75 */
      solid $border-color;

      i {
        margin-left: 0.53vw  /* 2/3.75 */;
      }

      img {
        width: 7.47vw /* 28/3.75 */
      ;
        height: 7.47vw /* 28/3.75 */
      ;
        border-radius: 3.73vw /* 14/3.75 */
      ;
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
          opacity: .5;

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
    }

    .hide-btn {
      background: white;

      .top {
        padding: 2.8vw /* 10.5/3.75 */
        2.53vw /* 9.5/3.75 */
      ;
        display: flex;
        flex-direction: row-reverse;

        .weibo-type {
          border: 1px /* 1/3.75 */
          solid $weibo-type-border;
          color: $weibo-type;
          font-size: 3.2vw /* 12/3.75 */
        ;
          border-radius: 3.73vw /* 14/3.75 */
        ;
          padding: 0.53vw /* 2/3.75 */
          1.6vw /* 6/3.75 */
        ;

          i {
            color: $weibo-type;
            font-size: 3.2vw /* 12/3.75 */
          ;
            margin-right: 3.2vw /* 12/3.75 */
          ;
          }
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
