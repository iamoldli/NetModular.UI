<template>
  <div>
    <default v-if="type==='default'" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Default from '../../components/login/default/'
export default {
  components: { Default },
  computed: {
    ...mapState('app/system', { loginOptions: s => s.loginOptions }),
    type() {
      return this.loginOptions.type || 'default'
    }
  }
}
</script>
