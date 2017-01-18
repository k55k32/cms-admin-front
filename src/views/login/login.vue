<template lang="pug">
.main-bg
  .login
    el-form.login-form(label-position="top", :rules="rules", :model="user", ref="login", v-loading.body="loading")
      .title LOGIN
      el-form-item(prop="username")
        input.form-input(v-model="user.username" autocomplete="off" placeholder="Email")
      el-form-item(prop="password")
        input.form-input(v-model="user.password" type="password" autocomplete="off" placeholder="Password")
      el-form-item
        button.btn.btn-block(type="submit" @click.prevent="onSubmit") 登录
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query.logout === 'out') {
        vm.$store.dispatch('logout')
      }
    })
    next()
  },
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
      this.$post('user/token', this.user).then(({data}) => {
        let token = data
        return this.$store.dispatch('login', token).then(data => {
          this.$message.success('login success')
          let redirect = this.$route.query.redirect || '/'
          if (redirect) {
            this.$router.replace(redirect)
          }
          return data
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
@import "../../styles/base.less";
.login{
  color: #eee;
  .title{
    font-size: 2em;
    font-weight: 100;
    margin-bottom: 1em;
  }
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  form{
    width: 300px;
  }
}
</style>
