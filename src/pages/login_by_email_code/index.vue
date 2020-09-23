<template>
  <div class="login">
    <div class="main-part">
      <i @click="$router.back()" class="iconfont icon-close close-btn"/>
      <div class="main">
        <div class="lead">请输入验证码</div>
        <span class="tip">
          验证码已通过邮箱发送至
          {{ $store.state.user.email }}
        </span>
        <div class="input">
          <input type="number" class="fill-code" v-model="code" placeholder="输入验证码"/>
          <div class="input-right">
            <i @click="reset" class="iconfont icon-blank" v-if="canReset"/>
            <div class="placeholder" v-else/>
            <!--一丢-->
            <span @click="regainCode" v-if="canRegain" class="regain">重新获取</span>
            <span v-else class="no-regain">{{ second }}秒后可重新获取</span>
          </div>
          <span class="error-message" v-text="errorMessage"></span>
        </div>
        <div @click="login"
             class="get-code" :class="{ 'can-login': canLogin }">登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeApi } from 'src/api/user'

export default {
  name: 'index',
  props: ['backIcon', 'lead', 'tip', 'placeholder'],
  data () {
    return {
      code: '',
      canLogin: false,
      canRegain: false,
      canReset: false,
      second: 10,
      timer: null,
      errorMessage: ''
    }
  },
  watch: {
    code (newValue, oldValue) {
      const newValueLength = newValue.length
      if (newValueLength === 0) {
        this.canReset = false
      } else if (newValueLength > 0 && newValueLength < 6) {
        this.canReset = true
        this.canReset = true
      } else if (newValueLength === 6) {
        this.canLogin = true
        this.canReset = true
      } else {
        this.code = oldValue
        this.canReset = true
      }
    }
  },
  created () {
    this.setInterval()
  },
  activated () {
    if (!this.timer) {
      this.setInterval()
    }
  },
  deactivated () {
    clearInterval(this.timer)
    this.timer = null
    this.second = 10
  },
  methods: {
    login () {
      this.$store.dispatch('user/login', { loginWay: 'email', code: this.code }).then(res => {
        if (res.data.code === 20) {
          this.$router.push(this.$store.state.app.redirectRoutePath)
        } else {
          this.errorMessage = res.data.message
        }
      })
    },
    setInterval () {
      this.timer = setInterval(() => {
        this.second -= 1
        if (this.second === 0) {
          this.second = 10
          this.canRegain = true
          clearInterval(this.timer)
        }
      }, 1000)
    },
    regainCode () {
      getCodeApi({ email: this.$store.state.user.email }).then(res => {
        this.canRegain = false
        const timer = setInterval(() => {
          this.second -= 1
          if (this.second === 0) {
            this.second = 10
            this.canRegain = true
            clearInterval(timer)
          }
        }, 1000)
      })
    },
    reset () {
      this.code = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-part {
    background: white;

    .close-btn {
      font-size: 8vw /* 30/3.75 */
    ;
      color: $color8;
      margin: 1.87vw /* 7/3.75 */
      0 0 2.67vw /* 10/3.75 */
    ;
    }

    .main {
      padding: 5.87vw /* 22/3.75 */
      6.4vw /* 24/3.75 */
      0;

      .lead {
        font-size: 8vw /* 30/3.75 */
      ;
        margin-bottom: 2.67vw /* 10/3.75 */
      ;
      }

      .tip {
        color: $color5;
        font-size: 4vw /* 15/3.75 */
      ;

        .important-link {
          color: $color9;
        }
      }

      .input {
        display: flex;
        align-items: center;
        margin: 16vw /* 60/3.75 */
        0 17.87vw /* 67/3.75 */
      ;
        position: relative;

        .input-right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          font-size: 3.41vw /* 12.8/3.75 */
        ;

          i {
            color: $color13;
            font-size: 3.73vw /* 14/3.75 */
          ;
          }

          .placeholder {
            width: 1px;
          }

          .regain {
            color: $color9;
          }

          .no-regain {
            color: $color15;
          }
        }

        .error-message {
          position: absolute;
          top: 10.13vw /* 38/3.75 */
        ;
          color: $color14;
          font-size: 3.73vw /* 14/3.75 */
        ;
        }

        input {
          min-width: 0;
          outline: none;
          outline-offset: 0;
          border: none;
          flex: 1;
          font-size: 5.33vw /* 20/3.75 */
        ;
        }

        .fill-code {
          letter-spacing: 2.56vw /* 9.6/3.75 */
        ;
        }

        input::-webkit-input-placeholder {
          /* WebKit browsers */
          color: $color2;
          letter-spacing: 0;
          font-size: 4.27vw /* 16/3.75 */
        ;
        }

        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: $color2;
          letter-spacing: 0;
          font-size: 4.27vw /* 16/3.75 */
        ;
        }

        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: $color2;
          letter-spacing: 0;
          font-size: 4.27vw /* 16/3.75 */
        ;
        }

        input::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: $color2;
          letter-spacing: 0;
          font-size: 4.27vw /* 16/3.75 */
        ;
        }
      }

      .get-code {
        background: $color10;
        width: 100%;
        height: 10.67vw /* 40/3.75 */
      ;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5.6vw /* 21/3.75 */
      ;
        font-size: 4.53vw /* 17/3.75 */
      ;
        color: white;
        margin-bottom: 4vw /* 15/3.75 */
      ;
      }

      .can-login {
        background: $color12;
      }

      .classic {
        color: $color9;
        font-size: 3.73vw /* 14/3.75 */
      ;
      }
    }
  }

  .third-login {
    padding: 18.67vw /* 70/3.75 */
    0 1.33vw /* 5/3.75 */
    0;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      color: $color3;
    }

    .text {
      font-size: 3.73vw /* 14/3.75 */
    ;
      margin-bottom: 2.67vw /* 10/3.75 */
    ;
    }

    i {
      color: $color11;
      font-size: 8vw /* 30/3.75 */
    ;
    }

    .qq {
      font-size: 3.2vw /* 12/3.75 */
    ;
    }
  }
</style>
