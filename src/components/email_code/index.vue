<template>
  <div class="login">
    <div class="main-part">
      <i @click="$router.back()" class="iconfont close-btn" :class="backIcon"/>
      <div class="main">
        <div class="lead" v-text="lead"></div>
        <span class="tip">
          {{ tip }}
          <slot name="after"></slot>
        </span>
        <div class="input">
          <input v-model="inputContent" :placeholder="placeholder"/>
          <i @click="reset" class="iconfont icon-blank" v-show="canGetCode"/>
          <span class="error-message" v-text="errorMessage"></span>
        </div>
        <div @click="$emit('blueBtnClick', inputContent)"
             class="get-code" :class="{ 'can-get-code': canGetCode }">获取验证码
        </div>
        <span class="classic">用账号密码登录</span>
      </div>
    </div>
    <div class="third-login" v-if="false">
      <span class="text">其它登录方式</span>
      <i class="iconfont icon-qq"/>
      <span class="qq">QQ</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['backIcon', 'errorMessage', 'lead', 'tip', 'placeholder'],
  data () {
    return {
      inputContent: '',
      canGetCode: false
    }
  },
  watch: {
    inputContent (newValue) {
      this.canGetCode = newValue.length > 0
    }
  },
  methods: {
    reset () {
      this.inputContent = ''
      this.$emit('resetErrorMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-part {
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

      }

      .input {
        display: flex;
        margin: 16vw /* 60/3.75 */
        0 17.87vw /* 67/3.75 */
      ;
        position: relative;

        .error-message {
          position: absolute;
          top: 10.13vw /* 38/3.75 */
        ;
          color: $color14;
          font-size: 3.73vw /* 14/3.75 */
        ;
        }

        i {
          color: $color13;
          font-size: 3.73vw /* 14/3.75 */
        ;
          margin-right: 13.33vw /* 50/3.75 */
        ;
        }

        input {
          outline: none;
          outline-offset: 0;
          border: none;
          flex: 100;
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

      .can-get-code {
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
