<template>
  <div class="nm-login-default">
    <div class="nm-login-bg" />
    <div class="nm-login-box">
      <div class="nm-login-content">
        <div class="nm-login-logo">
          <img class="nm-login-logo-img" :src="logo" />
          <h1 class="nm-login-logo-title">{{ title }}</h1>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item v-if="loginOptions.accountTypes" prop="accountType">
            <el-select v-model="form.accountType" placeholder="账户类型">
              <template v-slot:prefix>
                <nm-icon name="project" />
              </template>
              <el-option v-for="item in loginOptions.accountTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="用户名">
              <template v-slot:prefix>
                <nm-icon name="user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="密码">
              <template v-slot:prefix>
                <nm-icon name="password" />
              </template>
            </el-input>
          </el-form-item>
          <div v-if="loginOptions.verifyCode" class="verifycode">
            <div class="verifycode-input">
              <el-form-item prop="code">
                <el-input v-model="form.code" autocomplete="off" placeholder="验证码">
                  <template v-slot:prefix>
                    <nm-icon name="verifycode"></nm-icon>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <div class="verifycode-img">
              <img title="点击刷新" :src="verifyCodeUrl" @click="refreshVierifyCode" />
            </div>
          </div>
          <el-form-item style="text-align:right;">
            <el-button :loading="loading" class="btn-login" type="primary" @click="tryLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="copyright">{{ copyright }}</div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LoginDefault',
  data() {
    const _this = this
    return {
      verifyCodeUrl: '',
      form: {
        userName: '',
        password: '',
        code: '',
        pictureId: '',
        accountType: 0
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            validator(rule, value, callback) {
              if (_this.loginVerifyCode && value === '') {
                callback(new Error('请输入验证码'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapState('app/system', {
      title: s => s.config.base.title,
      logo: s => s.config.base.logo,
      loginOptions: s => s.config.login,
      getVerifyCode: s => s.actions.getVerifyCode,
      copyright: s => s.config.base.copyright
    })
  },
  mounted() {
    if (this.loginOptions.verifyCode) {
      this.refreshVierifyCode()
    }
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.tryLogin()
      }
    })
  },
  methods: {
    ...mapActions('app/system', ['login']),
    // 刷新验证码
    async refreshVierifyCode() {
      let data = await this.getVerifyCode()
      this.verifyCodeUrl = data.base64String
      this.form.pictureId = data.id
    },
    // 登录
    tryLogin() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          this.login(this.form)
            .then(data => {
              // 初始化令牌
              this.$store.commit('app/token/init', data)

              // 跳转
              let redirect = this.$route.query.redirect
              if (!redirect || redirect === '') {
                redirect = '/'
              }

              this.loading = false

              this.$router.push({
                path: redirect
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.nm-login-default > .nm-login-bg {
  background-image: url('../../../public/images/login/bg3.jpg');
}
</style>
