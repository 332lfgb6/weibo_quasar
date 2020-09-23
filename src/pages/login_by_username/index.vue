<template>
  <div class="login-by-username">
    <i class="iconfont icon-close close-btn" @click="$router.back()"/>
    <div class="img-container">
      <img src="../../assets/logo.png" alt="">
    </div>
    <div class="input-area">
      <div class="input-container username">
        <i class="iconfont icon-username"/>
        <input v-model="username" placeholder="请输入用户名"/>
      </div>
      <div class="input-container password">
        <i class="iconfont icon-password"/>
        <input type="password" v-model="password" placeholder="请输入密码"/>
      </div>
    </div>
    <div class="login-btn" @click="login">登录</div>
    <div class="register-account" @click="$router.push({ name: 'Register' })">注册账号</div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/login', {
        username: this.username,
        password: this.password,
        loginWay: 'username'
      }).then(res => {
        this.$router.push(this.$store.state.app.redirectRoute)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-by-username {
    background: $color16;
    min-height: 100vh;
    overflow: hidden;

    .close-btn {
      font-size: 5.87vw  /* 22/3.75 */;
      display: block;
      margin: 4.27vw  /* 16/3.75 */ 5.33vw  /* 20/3.75 */;
    }

    .img-container {
      display: flex;
      justify-content: center;

      img {
        width: 18.67vw  /* 70/3.75 */;
        height: 18.67vw  /* 70/3.75 */;
        border: 1px  /* 1/3.75 */ solid rgba(black, .1);
        margin-top: 4.27vw  /* 16/3.75 */;
        margin-bottom: 7.2vw  /* 27/3.75 */;
        box-shadow: 0 1px  /* 1/3.75 */ 1px  /* 1/3.75 */ rgba(black, .17);
      }
    }

    .input-area {
      border-top: 1px  /* 1/3.75 */ solid $color17;
      border-bottom: 1px  /* 1/3.75 */ solid $color17;
      padding:0 4.27vw  /* 16/3.75 */;
      background: white;

      .input-container {
        height: 10.67vw  /* 40/3.75 */;
        display: flex;
        align-items: center;
        font-size: 3.96vw  /* 14.84/3.75 */;

        i {
          font-size: 5.33vw  /* 20/3.75 */;
          color: $color1;
          margin-right: 7.2vw  /* 27/3.75 */;
        }

        input {
          border: none;
          outline-offset: 0;
          outline: none;
        }
      }

      .username {
        border-bottom: 1px  /* 1/3.75 */ solid $color17;
      }
    }

    .login-btn {
      width: 91.47vw  /* 343/3.75 */;
      height: 12vw  /* 45/3.75 */;
      background: $color18;
      margin: 5.33vw  /* 20/3.75 */ 4.27vw  /* 16/3.75 */ 4vw  /* 15/3.75 */;
      border: 1px  /* 1/3.75 */ solid $color19;
      border-radius: 0.8vw  /* 3/3.75 */;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }

    .register-account {
      margin-top: 7.2vw  /* 27/3.75 */;
      color: $color47;
      font-size: 3.73vw  /* 14/3.75 */;
      text-align: center;
    }
  }
</style>
