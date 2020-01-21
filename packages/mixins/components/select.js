export default {
  data() {
    return {
      //初始值
      initValue: this.value,
      value_: this.value,
      options: [],
      action: null,
      loading: false,
      hasInit: false,
      remoteTimer: null
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    // 多选
    multiple: Boolean,
    // 可清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 禁用
    disabled: Boolean,
    // 是否可搜索
    filterable: Boolean,
    // 显示刷新按钮
    showRefresh: Boolean,
    /** 多选时用户最多可以选择的项目数，为 0 则不限制 */
    multipleLimit: {
      type: Number,
      default: 0
    },
    /** 占位符 */
    placeholder: {
      type: String,
      default: '请选择...'
    },
    /** 是否默认选中第一个 */
    checkedFirst: Boolean,
    /** 头部的图标 */
    icon: String,
    /**远程搜索 */
    remote: Boolean,
    /**远程查询间隔，默认800ms */
    remoteQueryInterval: {
      type: Number,
      default: 800
    }
  },
  computed: {
    selection() {
      let list
      if (!this.value_) return list

      if (this.multiple) {
        list = []
        this.value_.forEach(item => {
          for (var i = 0; i < this.options.length; i++) {
            const opt = this.options[i]
            if (opt.value === item) {
              list.push(opt)
              break
            }
          }
        })
      } else {
        for (var i = 0; i < this.options.length; i++) {
          const opt = this.options[i]
          if (opt.value === this.value_) {
            list = opt
            break
          }
        }
      }
      return list
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    // 刷新
    refresh() {
      //远程搜索使用远程方法
      if (this.filterable && this.remote) return

      this.loading = true
      this.action().then(options => {
        this.options = options
        this.loading = false

        if (this.checkedFirst && !this.hasInit && options.length > 0) {
          this.onChange(options[0].value)
          this.hasInit = true
        }
      })
    },
    onChange(val) {
      this.value_ = val
      this.$emit('input', this.value_)
      this.$emit('change', this.value_, this.selection, this.options)
    },
    onVisibleChange(val) {
      this.$emit('visible-change', val)
    },
    onRemoveTag(tag) {
      this.$emit('remove-tag', tag)
    },
    onClear() {
      this.$emit('clear')
    },
    onBlur(event) {
      this.$emit('blur', event)
    },
    onFocus(event) {
      this.$emit('focus', event)
    },
    reset() {
      this.onChange(this.initValue)
    },
    remoteMethod(keyword) {
      if (this.remoteTimer) clearTimeout(this.remoteTimer)
      this.remoteTimer = setTimeout(() => {
        if (keyword !== '') {
          this.loading = true
          this.action(keyword).then(options => {
            this.options = options

            if (this.checkedFirst && options.length > 0) {
              this.value_ = options[0].value
              this.onChange()
            }
            this.loading = false
          })
        } else {
          this.options = []
        }
      }, this.remoteQueryInterval)
    }
  },
  watch: {
    value() {
      this.value_ = this.value
    }
  },
  render(h) {
    let options = []
    if (this.$scopedSlots.default) {
      options = [this.$scopedSlots.default({ options: this.options })]
    } else {
      options = this.options.map(item => {
        return h('el-option', {
          props: {
            label: item.label,
            value: item.value,
            disabled: item.disabled
          }
        })
      })
    }
    if (this.icon) {
      options.push(h('nm-icon', { props: { name: this.icon }, slot: 'prefix' }))
    }
    return h(
      'div',
      {
        class: 'nm-select',
        attrs: {
          'element-loading-background': 'rgba(255, 255, 255, 0.5)'
        },
        directives: [
          {
            name: 'loading',
            value: this.loading
          }
        ]
      },
      [
        h(
          'div',
          {
            class: 'nm-select-input'
          },
          [
            h(
              'el-select',
              {
                props: {
                  value: this.value_,
                  clearable: this.clearable,
                  multiple: this.multiple,
                  disabled: this.disabled,
                  size: this.fontSize,
                  filterable: this.filterable,
                  multipleLimit: this.multipleLimit,
                  placeholder: this.placeholder,
                  remote: this.remote,
                  remoteMethod: this.remoteMethod
                },
                on: {
                  change: this.onChange,
                  'visible-change': this.onVisibleChange,
                  'remove-tag': this.onRemoveTag,
                  clear: this.onClear,
                  blur: this.onBlur,
                  focus: this.onFocus
                }
              },
              options
            )
          ]
        ),
        h(
          'div',
          {
            class: 'nm-select-button'
          },
          [
            h('nm-button', {
              class: '',
              props: {
                icon: 'refresh'
              },
              directives: [
                {
                  name: 'show',
                  value: this.showRefresh
                }
              ],
              on: {
                click: this.refresh
              }
            })
          ]
        )
      ]
    )
    /** JSX方式，老是存在编译不了的情况，取消该方式 */

    // return (
    //   <div
    //     class="nm-select"
    //     v-loading={this.loading}
    //     element-loading-background="rgba(255, 255, 255, 0.5)"
    //   >
    //     <div class="nm-select-input">
    //       <el-select
    //         placeholder="请选择..."
    //         value={this.value_}
    //         clearable={this.clearable}
    //         multiple={this.multiple}
    //         disabled={this.disabled}
    //         size={this.fontSize}
    //         filterable={this.filterable}
    //         multipleLimit={this.multipleLimit}
    //         placeholder={this.placeholder}
    //         vOn:change={this.onChange}
    //         vOn:visible-change={this.onVisibleChange}
    //         vOn:remove-tag={this.onRemoveTag}
    //         vOn:clear={this.onClear}
    //         vOn:blur={this.onBlur}
    //         vOn:focus={this.onFocus}
    //       >
    //         {this.$scopedSlots.default
    //           ? this.$scopedSlots.default({ options: this.options })
    //           : this.options.map(item => {
    //             return (
    //               <el-option
    //                 label={item.label}
    //                 value={item.value}
    //                 disabled={item.disabled}
    //               />
    //             )
    //           })}
    //         {this.icon ? <nm-icon name={this.icon} slot="prefix" /> : ''}
    //       </el-select>
    //     </div>
    //     <div class="nm-select-button">
    //       <nm-button
    //         v-show={this.showRefresh}
    //         icon="refresh"
    //         class="nm-select-botton-refresh"
    //         vOn:click={this.refresh}
    //       />
    //     </div>
    //   </div>
    // )
  }
}
