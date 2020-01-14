<template>
  <section class="nm-sidebar" :class="{ collapse: collapse }">
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
    ...mapState('app/skins/pretty/sidebar', ['collapse'])
  }
}
</script>
