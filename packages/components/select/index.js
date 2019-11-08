import select from '../../mixins/components/select'
export default {
  name: 'Select',
  mixins: [select],
  props: {
    // 接口方法
    method: Function
  },
  created() {
    this.action = this.method
  }
}
