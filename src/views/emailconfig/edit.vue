<template lang="pug">
  el-form(label-position="top", :rules="rules", :model="form" ref="form")
    el-form-item(label="Email" prop="emailAccount")
      el-input(v-model="form.emailAccount" @change="emailChange")
    el-form-item(label="Password" prop="emailPassword")
      el-input(v-model="form.emailPassword" type="password")
    el-form-item(label="SMTP" prop="smtpHost")
      .flex
        el-input.flex1(v-model="form.smtpHost" placeholder="SMTP服务地址")
        span &nbsp;:&nbsp;
        el-input.input-mini(v-model="form.smtpPort" placeholder="端口")
        el-checkbox(v-model="form.sslEnable" number) 启用SSL
    el-form-item
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      form: {smtpHost: '', smtpPort: 465, sslEnable: true, emailAccount: '', emailPassword: '', ...this.data},
      rules: {
        smtpHost: {required: true},
        smtpPort: {required: true},
        emailAccount: {required: true},
        emailPassword: {required: true}
      }
    }
  },
  methods: {
    emailChange () {
      let email = this.form.emailAccount
      if (email.lastIndexOf('@') > -1) {
        let host = email.substr(email.lastIndexOf('@') + 1)
        this.form.smtpHost = 'smtp.' + host
      }
    },
    saveAction () {
      this.$refs.form.validate((c) => {
        if (c) {
          delete this.form.createTime
          this.$emit('save', this.form)
        } else {
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.input-mini{
  width: 50px;
}
</style>
