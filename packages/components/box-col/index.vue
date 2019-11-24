<template>
  <section
    :class="['nm-box-col', span ? 'nm-box-col-' + span : '', offset ? 'nm-box-col-offset-' + offset : '', push ? 'nm-box-col-push-' + push : '', pull ? 'nm-box-col-pull-' + pull : '']"
    :style="style"
  >
    <slot />
  </section>
</template>
<script>
export default {
  name: 'BoxCol',
  props: {
    // 栅格占据的列数
    span: {
      type: Number,
      default: 24
    },
    // 栅格左侧的间隔格数
    offset: {
      type: Number,
      default: 0
    },
    // 栅格向右移动格数
    push: {
      type: Number,
      default: 0
    },
    // 栅格向左移动格数
    pull: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      return {
        paddingLeft: this.$parent.gutter_,
        paddingRight: this.$parent.gutter_
      }
    }
  }
}
</script>
