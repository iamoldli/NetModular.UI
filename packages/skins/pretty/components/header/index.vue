<template>
  <section class="nm-header">
    <section class="nm-header-left">
      <!--Logo-->
      <section class="nm-logo-box">
        <img :src="logoUrl" class="nm-logo-img" :alt="title" :title="title" />
        <div class="nm-logo-text">{{ title }}</div>
      </section>
      <!--折叠按钮-->
      <a class="nm-sidebar-toggle-btn" @click.prevent="sidebarToggle">
        <nm-icon :name="sidebarCollapse ? 'indent-left' : 'indent-right'" />
      </a>
      <!--面包屑-->
      <breadcrumb />
    </section>
    <section class="nm-header-right">
      <!--工具栏-->
      <div class="nm-header-toolbar">
        <nm-toolbar />
      </div>
    </section>
  </section>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Breadcrumb from './components/breadcrumb'
export default {
  components: { Breadcrumb },
  computed: {
    ...mapGetters('app/config', ['logoUrl']),
    ...mapState('app/config', { title: s => s.system.title }),
    ...mapState('app/skins/pretty/sidebar', { sidebarCollapse: 'collapse' })
  },
  methods: {
    ...mapActions('app/skins/pretty/sidebar', { sidebarToggle: 'toggle' })
  }
}
</script>
