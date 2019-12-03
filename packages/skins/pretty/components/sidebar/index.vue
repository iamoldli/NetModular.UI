<template>
  <section class="nm-sidebar" :class="{ collapse: collapse }">
    <section class="nm-logo-box">
      <img :src="logo" class="nm-logo-img" :alt="title" :title="title" />
      <label class="nm-logo-text">{{ title }}</label>
    </section>
    <section class="nm-menu-wapper">
      <nm-menus />
    </section>
  </section>
</template>
<script>
import NmMenus from '../menus'
import { mapState } from 'vuex'
export default {
  components: { NmMenus },
  computed: {
    ...mapState('app/system', { title: s => s.config.base.title, logo: s => s.config.base.logo }),
    ...mapState('app/skins/pretty/sidebar', ['collapse'])
  }
}
</script>
