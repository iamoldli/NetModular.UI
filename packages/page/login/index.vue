<template>
  <div class="nm-login-container">
    <component v-bind:is="`nm-login-${type}`"></component>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/system', { loginOptions: s => s.loginOptions }),
    type() {
      if (!this.loginOptions.type || !this.loginOptions.typeOptions.includes(this.loginOptions.type)) {
        return 'default'
      }
      return this.loginOptions.type
    }
  }
}
</script>
