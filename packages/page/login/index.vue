<template>
  <div class="nm-login-container">
    <component v-bind:is="`nm-login-${type}`"></component>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/config', { loginOptions: s => s.component.login }),
    type() {
      if (!this.loginOptions.pageType || !this.loginOptions.pageTypeOptions.includes(this.loginOptions.pageType)) {
        return 'neon'
      }
      return this.loginOptions.pageType
    }
  }
}
</script>
