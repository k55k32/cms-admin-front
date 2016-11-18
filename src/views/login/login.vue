<template lang="jade">
.login
  el-form.login-form(label-position="top", :rules="rules", :model="user", ref="login", v-loading.body="loading")
    h2 Login
    el-form-item(label="用户名" prop="username")
      el-input(v-model="user.username" size="large")
    el-form-item(label="密码" prop="password")
      el-input(v-model="user.password" size="large" type="password")
    el-form-item
      el-button.btn-block(native-type="submit", type="primary", @click.prevent="onSubmit") 登录

</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: {required: true},
        password: {required: true}
      },
      loading: false
    }
  },
  methods: {
    onSubmit (e) {
      this.loading = true
      this.post('user/token', this.user).then(({data}) => {
        let token = data
        return this.$store.dispatch('login', token).then(data => {
          this.$message.success('login success')
          let redirect = this.$route.query.redirect || '/'
          if (redirect) {
            this.$router.replace(redirect)
          }
          return data
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
@import "../../styles/base.less";
.login{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  .login-form{
    width: 600px;
    padding: 20px;
    border: @border;
  }
  .btn-block{
    display: block;
    width: 100%;
  }
}
</style>
