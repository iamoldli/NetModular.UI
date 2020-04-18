<template>
  <section class="nm-main">
    <div class="nm-main-left">
      <nm-sidebar />
    </div>
    <div class="nm-main-right">
      <nm-tabnav v-if="showTabnav" />
      <section class="nm-content">
        <transition name="fade-transverse">
          <keep-alive v-if="showTabnav" :include="keepAlive">
            <router-view v-if="routerViewVisible" :key="$route.path" />
          </keep-alive>

          <router-view v-if="!showTabnav && routerViewVisible" :key="$route.path" />
        </transition>
      </section>
    </div>
  </section>
</template>
<script>
import NmSidebar from '../sidebar'
import { mapState, mapMutations } from 'vuex'
export default {
  components: { NmSidebar },
  data() {
    return {
      routerViewVisible: true
    }
  },
  computed: {
    ...mapState('app/page', ['keepAlive']),
    ...mapState('app/config', { showTabnav: s => s.component.tabnav.enabled })
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    ...mapMutations('app/page', ['keepAliveRemove']),
    reload(name) {
      this.routerViewVisible = false
      this.keepAliveRemove(name)

      this.$nextTick(() => {
        this.routerViewVisible = true
      })
    }
  }
}
</script>
