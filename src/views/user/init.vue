<template lang="pug">
.user-init(v-loading="loading")
  el-steps(:space="200", :active="step")
    el-step(title="邮箱配置" description="输入邮箱配置，作为服务器发件方的配置")
    el-step(title="账号配置" description="后台的管理员端账号配置")
  .init-wrapper
    email-config-edit(v-if="step === 1" @save="saveConfig", :data="emailConfig")
    template(v-if="step === 2")
      el-form(label-position="top", :rules="rules", :model="userForm" ref="form")
        el-form-item(label="用户名" prop="username")
          el-input(v-model="userForm.username" type="email" placeholder="Email")
        el-form-item(label="密码" prop="password")
          el-input(v-model="userForm.password" type="password" placeholder="Password")
        el-form-item(label="邮箱验证码" prop="code")
          .flex
            el-input.flex-1(v-model="userForm.code")
            el-button(@click="sendCode") 发送邮箱验证码
        el-form-item
          el-button(type="primary" @click="pre") 上一步
          el-button(native-type="submit", type="primary" @click.prevent="saveUser") 保存
</template>

<script>
import EmailConfigEdit from '../emailconfig/edit'
export default {
  components: {EmailConfigEdit},
  data () {
    return {
      loading: false,
      step: 2,
      emailConfig: {},
      userForm: {username: '', password: '', code: ''},
      rules: {
        username: {required: true, type: 'email'},
        password: {required: true},
        code: {required: true}
      }
    }
  },
  created () {
    this.$get('user/init-email-config').then(({data}) => {
      if (data) {
        this.emailConfig = data
        this.step = 2
      }
    })
  },
  methods: {
    load () {
      this.loading = true
    },
    loaded () {
      this.loading = false
    },
    sendCode () {
      this.$refs.form.validateField('username', (s) => {
        if (!s) {
          this.load()
          this.$post('user/init-send-email', {email: this.userForm.username}).then(() => {
            this.$message.success('发送验证码成功')
          }).finally(this.loaded)
        }
      })
    },
    saveUser () {
      this.$refs.form.validate(c => {
        if (c) {
          this.load()
          this.$post('user/init-register', this.userForm).then(() => {
            this.$message.success('注册成功')
            this.$router.replace({name: 'login'})
          }).finally(this.loaded)
        }
      })
    },
    saveConfig (form) {
      this.load()
      this.emailConfig = form
      this.$post('user/init-step-email-config', form).then(({data}) => {
        this.emailConfig = data
        this.step = 2
      }).finally(() => this.loaded())
    },
    pre () {
      this.step --
    },
    next () {
      this.step ++
    }
  }
}
</script>

<style lang="less">
.user-init{
  width: 600px;
  margin: auto;
  padding-top: 120px;
}
.init-wrapper{
  margin-top: 2em;
}
</style>
