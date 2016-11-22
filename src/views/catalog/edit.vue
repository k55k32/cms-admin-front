<template lang="jade">
div
  el-form(label-position="top", :rules="rules", :model="from" ref="form")
    el-form-item(label="栏目名称" prop="name")
      el-input(v-model="from.name" size="large")
    el-form-item.el-dialog__footer
      el-button(type="default", @click="$emit('cancel')") 取消
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      from: {name: '', ...this.data},
      rules: {
        name: {required: true}
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
