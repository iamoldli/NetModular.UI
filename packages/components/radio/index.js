import radio from '../../mixins/components/radio.vue'
export default {
  name: 'Radio',
  mixins: [radio],
  props: {
    // 接口方法
    method: Function
  },
  created() {
    this.action = this.method
  }
}
