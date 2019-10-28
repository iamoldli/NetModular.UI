<template>
  <svg class="nm-icon" :class="iconClass" aria-hidden="true">
    <use :xlink:href="`#icon-${this.name}`" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconClass: String,
    name: String
  }
}
</script>
