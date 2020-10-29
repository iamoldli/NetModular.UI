<template>
  <div class="nm-toolbar-item">
    <nm-button class="nm-toolbar-button" type="text" @click="logout_">
      <nm-icon name="logout" />
    </nm-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app/system', ['logout']),
    logout_() {
      this._confirm('您确认要退出登录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    }
  }
}
</script>
