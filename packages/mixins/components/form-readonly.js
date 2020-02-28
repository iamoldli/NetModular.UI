export default {
  data() {
    return {
      id_: '',
      form: {
        model: {},
        disabled: true,
        loading: false
      },
      on: {
        open: this.onOpen
      }
    }
  },
  props: {
    id: [String, Number]
  },
  methods: {
    onOpen() {
      if (this.id !== this.id_) {
        this.form.loading = true
        this.action(this.id)
          .then(data => {
            this.form.model = data
            this.form.loading = false
          })
          .catch(() => {
            this.form.loading = false
          })
      }
    }
  }
}
