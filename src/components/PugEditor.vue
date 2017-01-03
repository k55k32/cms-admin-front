<template lang="pug">
.pug-editor.flex
  .editor.flex-2
    textarea(v-model="source")
  .preview.flex-1
    textarea(:class="{'has-error': hasError}" 'readonly') {{preview}}
</template>

<script>
import pug from '../utils/PugClientSide'
import html2jade from '../assets/html2jade'

export default {
  props: ['value'],
  created () {
    html2jade.convertHtml(this.value, {bodyless: true}, (ex, jade) => {
      this.source = jade.substr(5)
    })
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
        this.$emit('input', preview)
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
    height: 15em;
    resize: none;
    &.has-error{
      color: red
    }
  }
}
</style>
