<template lang="pug">
div
  el-form(label-position="top", :rules="rules", :model="form" ref="form")
    el-form-item(label="用户名" prop="name")
      el-input(v-model="form.username" size="large", :disabled="true")
    el-form-item(label="密码" prop="password")
      el-input(v-model="form.password" size="large" type="password")
    el-form-item.el-dialog__footer
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      form: {password: '', username: this.data.username},
      rules: {
        name: {required: true}
      }
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', { ...this.form })
      this.form.password = ''
    }
  }
}
</script>

<style lang="less">
</style>
