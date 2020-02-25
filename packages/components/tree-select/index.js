import mixins from './mixins.vue'
export default {
  name: 'TreeSelect',
  mixins: [mixins],
  props: {
    /**数据请求方法 */
    action: {
      type: Function,
      required: true
    }
  }
}
