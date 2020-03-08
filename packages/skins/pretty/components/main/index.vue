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
            <router-view v-if="routerViewVisible" :key="$route.path" />
          </keep-alive>
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
    ...mapState('app/page', ['keepAlive'])
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
