<template>
  <nm-box page>
    <nm-box-row>
      <nm-box-col :span="6">
        <nm-box-small v-bind="box" @more="onMore" />
      </nm-box-col>
      <nm-box-col :span="6">
        <nm-box-small v-bind="box1" @more="onMore" />
      </nm-box-col>
      <nm-box-col :span="6">
        <nm-box-small v-bind="box2" />
      </nm-box-col>
    </nm-box-row>
  </nm-box>
</template>
<script>
export default {
  data() {
    return {
      box: {
        label: '总消费额',
        value: 12352.11,
        unit: '元',
        icon: 'money',
        more: true
      },
      box1: {
        label: '总收入',
        value: 42352.11,
        unit: '元',
        icon: 'money',
        more: true,
        bgColor: 'warning'
      },
      box2: {
        label: '总支出',
        value: 562352.11,
        unit: '元',
        icon: 'money',
        bgColor: 'primary'
      }
    }
  },
  methods: {
    onMore() {
      this._success('没有更多了~')
    }
  }
}
</script>
