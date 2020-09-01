<template>
  <nm-dialog
    class="nm-list-dialog"
    no-scrollbar
    :title="title"
    :icon="icon"
    :width="width"
    :height="height"
    :fullscreen="fullscreen"
    :close-on-click-modal="closeOnClickModal"
    :draggable="draggable"
    :drag-out-page="dragOutPage"
    :drag-min-width="dragMinWidth"
    :visible.sync="visible_"
    v-on="on"
  >
    <template v-slot:title>
      <slot name="title" />
    </template>
    <template v-slot:toolbar>
      <!--刷新按钮-->
      <nm-button icon="refresh" @click="refresh" />
    </template>
    <slot />
  </nm-dialog>
</template>
<script>
import visible from '../../mixins/components/visible.js'
export default {
  name: 'ListDialog',
  mixins: [visible],
  data() {
    return {
      on: {
        open: this.onOpen,
        opened: this.onOpened,
        close: this.onClose,
        closed: this.onClosed
      }
    }
  },
  props: {
    /** 标题 */
    title: String,
    /** 图标 */
    icon: {
      type: String,
      default: 'list'
    },
    /** Dialog 的宽度 */
    width: {
      type: String,
      default: '60%'
    },
    /** Dialog 的高度 */
    height: {
      type: [Number, String],
      default: '80%'
    },
    /** 是否显示全屏按钮 */
    fullscreen: {
      type: Boolean,
      default: true
    },
    /** 是否可以通过点击 modal 关闭 Dialog */
    closeOnClickModal: {
      type: Boolean,
      default: null
    },
    /** 是否可拖拽 */
    draggable: {
      type: Boolean,
      default: null
    },
    /** 是否可拖出页面 */
    dragOutPage: Boolean,
    /** 拖拽出页面后保留的最小宽度 */
    dragMinWidth: Number
  },
  methods: {
    refresh() {
      this.$slots.default.map(slot => {
        if (slot.componentOptions.tag === 'nm-list') {
          slot.componentInstance.refresh()
        }
      })
    },
    onOpen() {
      this.$emit('open')
    },
    onOpened() {
      this.$emit('opened')
    },
    onClose() {
      this.$emit('close')
    },
    onClosed() {
      this.$emit('closed')
    }
  }
}
</script>
