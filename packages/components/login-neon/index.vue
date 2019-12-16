<template>
  <div class="nm-login-neon">
    <div id="particles"></div>
    <div class="login-header">
      <div class="login-logo">
        <img :src="logo" />
      </div>
      <div class="login-title">{{ title }}</div>
    </div>
    <div class="login-form">
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
          <nm-button icon="login" :loading="loading" class="login-btn" @click="tryLogin">登录</nm-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="copyright">{{ copyright }}</div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import particlesJson from '../../../public/lib/particles.js-2.0.0/particles.json'
export default {
  name: 'LoginNeon',
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
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
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

    this.$nextTick(() => {
      particlesJS('particles', particlesJson)
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
