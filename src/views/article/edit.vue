<template lang="jade">
div
  el-form(label-position="top", :rules="rules", :model="from" ref="form")
    el-form-item(label="文章标题" prop="title")
      el-input(v-model="from.title" size="large")
    el-form-item(label="文章内容" prop="content")
      rich-editor(ref="editor" v-model="from.content", filename="file" , :upload="uploadUrl" , :headers="{Authorization: this.$store.state.token}")
    el-form-item.el-dialog__footer
      el-button(type="default", @click="$emit('cancel')") 取消
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
import RichEditor from 'RichEditor'
export default {
  props: ['data'],
  components: { RichEditor },
  data () {
    return {
      uploadUrl: 'http://localhost:8080/upload/img',
      from: {content: '', title: '', ...this.data},
      rules: {
        title: {required: true}
      }
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', this.from)
    }
  }
}
</script>

<style lang="less">
</style>
