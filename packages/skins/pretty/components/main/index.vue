<template>
  <section class="nm-main">
    <div class="nm-main-left">
      <nm-sidebar />
    </div>
    <div class="nm-main-right">
      <nm-tabnav />
      <section class="nm-content">
        <transition name="fade-transverse">
          <keep-alive :include="keepAlive">
            <router-view :key="$route.path" />
          </keep-alive>
        </transition>
      </section>
    </div>
  </section>
</template>
<script>
import NmSidebar from '../sidebar'
import { mapState } from 'vuex'
export default {
  components: { NmSidebar },
  computed: {
    ...mapState('app/page', ['keepAlive'])
  }
}
</script>
