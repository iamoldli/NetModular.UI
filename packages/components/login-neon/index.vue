<template>
  <div class="nm-login-neon">
    <div class="login-header">
      <div class="login-logo">
        <img :src="logoUrl" />
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
            <el-form-item prop="verifyCode.code">
              <el-input v-model="form.verifyCode.code" autocomplete="off" placeholder="验证码">
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
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'LoginNeon',
  data() {
    const _this = this
    return {
      verifyCodeUrl: '',
      form: {
        userName: '',
        password: '',
        accountType: 0,
        verifyCode: {
          id: '',
          code: ''
        }
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
    ...mapGetters('app/config', ['logoUrl']),
    ...mapState('app/config', {
      title: s => s.system.title,
      copyright: s => s.system.copyright,
      loginOptions: s => s.component.login
    }),
    ...mapState('app/system', {
      getVerifyCode: s => s.actions.getVerifyCode
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
      this.form.verifyCode.id = data.id
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

              this.$router.push({
                path: redirect
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  },
  watch: {
    loginOptions: {
      immediate: true,
      handler(val) {
        this.form.accountType = val.defaultAccountType
      }
    }
  }
}
</script>
