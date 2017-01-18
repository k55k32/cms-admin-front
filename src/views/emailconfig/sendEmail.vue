<template lang="pug">
el-form(:inline="true", :rules="rules", :model="form" ref="form")
  el-form-item(label="收件人" prop="email")
    el-input(v-model="form.toEmail" placeholder="Email")
  el-form-item(label="标题" prop="title")
    el-input.email-title(v-model="form.title" placeholder="Title")
  .markdown-editor
    markdown-editor(ref="editor" v-model="form.content", height="100%", z-index="2017")
  el-form-item
    el-button(native-type="submit", type="primary", @click.prevent="saveAction") 发送
</template>

<script>
import 'markdown-it-editor/lib/index.css'
import { MarkdownEditor } from 'markdown-it-editor'
export default {
  components: {MarkdownEditor},
  data () {
    return {
      form: {toEmail: '', title: '', content: ''}
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', {...this.form, content: this.$refs.editor.$refs.preview.html})
    }
  }
}
</script>

<style lang="less">
.email-title{
  width: 500px;
}
</style>
