<template>
  <nm-dialog class="nm-drag-sort-dialog" :title="title" :icon="icon" :width="width" :height="height" footer :loading="loading" :visible.sync="visible_" @open="onOpen">
    <nm-drag-sort v-model="model.options" />
    <template v-slot:footer>
      <nm-button type="success" text="保存" @click="onUpdate" />
    </template>
  </nm-dialog>
</template>
<script>
import visibleMixins from '../../mixins/components/visible'
export default {
  name: 'DragSortDialog',
  mixins: [visibleMixins],
  data() {
    return {
      model: {
        options: []
      },
      loading: false
    }
  },
  props: {
    title: {
      type: String,
      default: '排序'
    },
    icon: {
      type: String,
      default: 'sort'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '60%'
    },
    queryAction: {
      type: Function,
      required: true
    },
    updateAction: {
      type: Function,
      required: true
    },
    /** 保存成功后关闭 */
    closeOnSuccess: Boolean
  },
  methods: {
    onOpen() {
      this.queryAction().then(data => {
        this.model = data
      })
    },
    onUpdate() {
      this.loading = true
      this.updateAction(this.model)
        .then(() => {
          this.loading = false
          this.$emit('success', this.model.options)
          if (this.closeOnSuccess) {
            this.visible_ = false
          }
        })
        .catch(() => {
          this.loading = false
          this.$emit('error')
        })
    }
  }
}
</script>
