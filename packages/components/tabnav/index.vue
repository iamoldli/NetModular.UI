<template>
  <section :class="['nm-tabnav', fontSize]">
    <slot name="before" />
    <div class="nm-tabnav-tabs">
      <el-tabs :value="current.path" type="card" :closable="true" @tab-click="onTabClick" @tab-remove="onTabRemove" @contextmenu.prevent.native="showContextMenu">
        <el-tab-pane v-if="config.showHome" :name="defaultPage">
          <span slot="label"> <nm-icon v-if="config.showIcon" name="home" /> 首页</span>
        </el-tab-pane>
        <el-tab-pane v-for="(item, i) in opened" :key="item.path" :name="item.path"
          ><span slot="label" :index="i"> <nm-icon v-if="config.showIcon && item.icon" :name="item.icon" />{{ item.tabName }}</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="nm-tabnav-control">
      <el-dropdown @command="cmd => handleCommand(cmd)">
        <span class="nm-tabnav-control-btn">
          <nm-icon name="angle-double-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Left"> <nm-icon name="arrow-left" class="nm-tabnav-control-icon" />关闭左侧 </el-dropdown-item>
          <el-dropdown-item command="Right"> <nm-icon name="arrow-right" class="nm-tabnav-control-icon" />关闭右侧 </el-dropdown-item>
          <el-dropdown-item command="Other"> <nm-icon name="other" class="nm-tabnav-control-icon" />关闭其他 </el-dropdown-item>
          <el-dropdown-item command="All"> <nm-icon name="app" class="nm-tabnav-control-icon" />全部关闭 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div ref="contextmenu" class="nm-tabnav-contextmenu" v-show="contextmenu.visible" :style="{ top: contextmenu.top, left: contextmenu.left }">
      <ul>
        <li @click.stop="onRefresh"><nm-icon name="refresh" />重新载入</li>
        <li @click.stop="onClose('')"><nm-icon name="close" />关闭</li>
        <li @click.stop="onClose('Left')"><nm-icon name="arrow-left" />关闭左侧</li>
        <li @click.stop="onClose('Right')"><nm-icon name="arrow-right" />关闭右侧</li>
        <li @click.stop="onClose('Other')"><nm-icon name="other" />关闭其它</li>
        <li @click.stop="onClose('All')"><nm-icon name="app" />关闭全部</li>
      </ul>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { on, off, hasClass } from '../../utils/dom'
export default {
  name: 'Tabnav',
  data() {
    return {
      contextmenu: {
        visible: false,
        top: 0,
        left: 0
      },
      closeParams: { index: 0, router: this.$router }
    }
  },
  computed: {
    ...mapState('app/page', { opened: 'opened', current: 'current', defaultPage: 'default' }),
    ...mapState('app/config', { config: s => s.component.tabnav })
  },
  inject: ['reload'],
  methods: {
    ...mapActions('app/page', ['close', 'closeLeft', 'closeRight', 'closeOther', 'closeAll']),
    showContextMenu(event) {
      const { path } = event
      for (let i = 0; i < path.length; i++) {
        if (hasClass(path[i], 'el-tabs__item')) {
          const index = path[i].querySelector('span').getAttribute('index')
          if (index) {
            this.contextmenu = {
              visible: true,
              top: event.y + 'px',
              left: event.x + 'px'
            }
            this.closeParams.index = parseInt(index)
          }
          break
        }
      }
    },
    hideContextMenu(e) {
      const { target } = e || window.event
      if (this.$refs.contextmenu !== target) this.contextmenu.visible = false
    },
    /**
     * @description 处理关闭标签下拉菜单命令
     * @param {String} cmd 命令
     * @param {String} tagName 选择的标签名称
     */
    handleCommand(cmd) {
      this.closeParams.index = this.opened.findIndex(m => m.path === this.current.path)
      this.onClose(cmd)
    },
    onTabClick(tab) {
      if (tab.name === this.defaultPage && this.current.path !== this.defaultPage) {
        this.$router.push(this.defaultPage)
        return
      }
      if (this.current.path === tab.name) return
      const page = this.opened.find(page => page.path === tab.name)
      if (page) {
        const { name, params, query } = page
        this.$router.push({ name, params, query })
      }
    },
    onTabRemove(path) {
      this.closeParams.index = this.opened.findIndex(m => m.path === path)
      this.onClose()
    },
    onClose(type) {
      this[`close${type || ''}`](this.closeParams)
    },
    onRefresh() {
      this.reload(this.current.name)
    }
  },
  watch: {
    'contextmenu.visible'(val) {
      if (val) {
        on(document, 'mouseup', this.hideContextMenu)
      } else {
        off(document, 'mouseup', this.hideContextMenu)
      }
    }
  }
}
</script>
