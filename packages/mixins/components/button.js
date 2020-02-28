import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/system', { _buttonPermissionEnabled: s => s.config.permission.button }),
    ...mapState('app/account', { _buttons: s => s.buttons })
  },
  methods: {
    _hasButton(btn) {
      if (!this._buttonPermissionEnabled) {
        return true
      }
      return !this._buttons.every(c => c.toLowerCase() !== btn.code.toLowerCase())
    }
  }
}
