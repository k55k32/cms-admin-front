<template lang="pug">
.pug-editor
  .editor
    textarea(v-model="source")
  .preview
    textarea(:class="{'has-error': hasError}" 'readonly') {{preview}}
</template>

<script>
import pug from '../utils/PugClientSide'
import html2jade from '../assets/html2jade'

export default {
  props: ['value'],
  watch: {
    value (newVal, old) {
      if (!old) {
        html2jade.convertHtml(newVal, {bodyless: true}, (ex, jade) => {
          this.source = jade.substr(5)
        })
      }
    }
  },
  data () {
    return {
      source: '',
      hasError: false
    }
  },
  computed: {
    preview () {
      let preview
      try {
        this.hasError = false
        preview = pug.render(this.source)
        this.$emit('value', preview)
      } catch (e) {
        this.hasError = true
        preview = e
      }
      return preview
    }
  }
}
</script>

<style lang="less">
.pug-editor{
  textarea{
    width: 100%;
    height: 8em;
    resize: none;
    &.has-error{
      color: red
    }
  }
}
</style>
