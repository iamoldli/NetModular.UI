<template>
  <nm-dialog v-bind="dialog" v-on="dialogOn" :visible.sync="visible_">
    <template v-slot:toolbar>
      <el-input class="nm-icon-picker-panel-filter" v-model="filter" placeholder="请输入英文或中文名称" clearable></el-input>
    </template>
    <section class="nm-icon-picker-panel">
      <el-tooltip v-for="icon in filterList" :key="icon" effect="dark" :open-delay="800" :content="icon" placement="top">
        <div class="nm-icon-picker-panel-item" @click="onSelect(icon)">
          <nm-icon :name="icon" />
        </div>
      </el-tooltip>
    </section>
  </nm-dialog>
</template>
<script>
import visible from '../../mixins/components/visible.js'
export default {
  mixins: [visible],
  data() {
    return {
      list: [],
      filter: '',
      dialog: {
        title: '选择图标',
        icon: 'list',
        height: '60%',
        width: '600px',
        fullscreen: true
      },
      dialogOn: {
        open: this.onOpen,
        opened: this.onOpened,
        close: this.onClose,
        closed: this.onClosed
      }
    }
  },
  computed: {
    filterList() {
      if (!this.filter) {
        return this.list
      }

      let list = []
      this.list.forEach(icon => {
        if (icon.indexOf(this.filter) > -1 || icon.indexOf(this.filter) > -1) {
          list.push(icon)
        }
      })
      return list
    }
  },
  methods: {
    onSelect(icon) {
      this.$emit('success', icon)
      this.hide()
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
  },
  created() {
    var symbols = document.querySelectorAll('body>svg>symbol')
    symbols.forEach(m => {
      this.list.push(m.id.replace('icon-', ''))
    })
  },
  destroyed() {
    this.list = null
  }
}
</script>
