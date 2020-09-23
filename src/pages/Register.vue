<template>
  <div class="register">
    <div class="nav-bar">
      <i class="iconfont icon-back"/>
      <span>注册</span>
      <div class="placeholder"></div>
    </div>
    <div class="preview-avatar">
      <van-uploader max-count="1" v-model="fileList" multiple />
    </div>
    <div class="hint">昵称</div>
    <div class="input-container">
      <input v-model="nickname" placeholder="请输入4~8位数字、字母、下划线"/>
    </div>
    <div class="hint">用户名</div>
    <div class="input-container">
      <input v-model="username" placeholder="请输入4~8位数字、字母、下划线"/>
    </div>
    <div class="hint">密码</div>
    <div class="input-container">
      <input v-model="password" :type="inputType" placeholder="请输入4~8位数字、字母、下划线"/>
      <div class="hide-btn-container">
        <div @click="hidePassword" class="hide-btn">{{ hideBtnName }}</div>
      </div>
    </div>
    <div class="register-btn" @click="register">注册</div>
    <div class="agree" @click="agreeDisagree">
      <i v-if="agree" class="iconfont icon-checkbox1"/>
      <i v-else class="iconfont icon-checkbox2"/>
      <span>同意用户协议</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast, Uploader } from 'vant'

Vue.use(Uploader)
Vue.use(Toast)
export default {
  name: 'Register',
  data () {
    return {
      fileList: [],
      nickname: '',
      inputType: 'text',
      hideBtnName: '隐藏',
      username: '',
      password: '',
      agree: false
    }
  },
  methods: {
    register () {
      const agree = this.agree
      if (!agree) {
        Toast.fail('请先同意并勾选相关条款')
      } else {
        const formData = new FormData()
        const username = this.username
        const password = this.password
        const nickname = this.nickname
        const avatar = this.fileList[0].file

        /* eslint-disable */
        // 往formData里面塞东西
        formData.append('nickname', nickname)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('avatar', avatar)

        this.$store.dispatch('user/register', formData).then(result => {
          if (result.data.code === 700) {
            this.$router.push('/')
            Toast.success('注册并登录成功')
          } else {
            Toast.success(result.data)
          }
        })
      }
    },
    agreeDisagree () {
      this.agree = !this.agree
    },
    hidePassword () {
      if (this.inputType === 'text') {
        this.inputType = 'password'
        this.hideBtnName = '显示'
      } else {
        this.inputType = 'text'
        this.hideBtnName = '隐藏'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .register {
    background: $color41;
    min-height: 100vh;

    .nav-bar {
      height: 44px;
      background: $color40;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 7px;

      i {
        font-size: 27px;
      }

      span {
        font-size: 18px;
        color: $color1;
      }

      div {
        width: 27px;
      }
    }

    .preview-avatar {
      display: flex;
      justify-content: center;
      margin-top: 3.2vw  /* 12/3.75 */;
    }

    .hint {
      font-size: 12px;
      color: $color42;
      padding: 12px 12px 8px 12px;
    }

    .input-container {
      border: 1px solid $color43;
      border-left: none;
      border-right: none;
      display: flex;
      align-items: center;
      padding: 0 12px;
      background: white;

      input {
        height: 44px;
        width: 100%;
        border: none;
        outline: none;
      }

      .hide-btn {
        width: 42px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: $color44;
        border: 1px solid $color45;
        background: $color46;
      }
    }

    .register-btn {
      margin: 20px 10px 13px;
      background: $color18;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border-radius: 3px;
      font-size: 17px;
    }

    .agree {
      padding: 0 12px;
      color: $color42;

      span {
        font-size: 14px;
        margin-left: 12px;
      }
    }
  }
</style>
