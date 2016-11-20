<template lang="jade">
div.rich-editor-wrapper
  div.rich-editor
</template>

<script>
import Editor from '../assets/wang-editor/js/wangEditor.js'
let editor = {}
export default {
  props: ['upload', 'uploadParams', 'headers', 'value', 'filename'],
  mounted () {
    this.$nextTick(() => {
      let dom = this.$el.querySelector('.rich-editor')
      editor = new Editor(dom)
      editor.config.uploadImgFileName = this.filename
      editor.config.uploadImgUrl = this.upload
      editor.config.uploadParams = this.uploadParams
      editor.config.uploadHeaders = this.headers
      editor.onchange = () => {
        this.$emit('input', this.getData())
      }
      editor.create()
      this.setData(this.value)
    })
  },
  methods: {
    setData (data) {
      editor.$txt.html(data)
    },
    getData () {
      return editor.$txt.html()
    }
  }
}
</script>

<style lang="less">
.rich-editor-wrapper{
}
.rich-editor{
  height: 400px;
}
</style>
