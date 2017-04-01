<template lang="pug">
div
  el-form(label-position="top", :rules="rules", :model="from" ref="form")
    el-alert(type="info", :closable="false", :title="'评论内容: ' + comment.content")
    br
    el-form-item(label="请输入回复内容" prop="content")
      el-input(v-model="from.content" type="textarea", :rows="5")
    el-form-item.el-dialog__footer
      el-button(type="default", @click="$emit('cancel')") 取消
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 回复
</template>

<script>
export default {
  props: ['data', 'comment'],
  data () {
    return {
      from: {content: '', id: '', ...this.data},
      rules: {
        content: {required: true}
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
