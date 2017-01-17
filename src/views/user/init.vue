<template lang="pug">
div(v-loading="loading")
  el-steps(:space="200", :active="step")
    el-step(title="邮箱配置" description="输入邮箱配置，作为服务器发件方的配置")
    el-step(title="账号配置" description="后台的管理员端账号配置")
    el-step(title="账号验证" description="后台管理端账号验证")
  email-config-edit(v-if="step === 1" @save="saveConfig", :data="emailConfig")
  el-button(type="primary" @click="pre" v-if="step > 1") 上一步
  el-button(type="primary" @click="finish" v-if="step === 3") 完成
</template>

<script>
import EmailConfigEdit from '../emailconfig/edit'
export default {
  components: {EmailConfigEdit},
  data () {
    return {
      loading: false,
      step: 1,
      emailConfig: {}
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
    saveConfig (form) {
      this.load()
      this.emailConfig = form
      this.$post('user/init-step-email-config', form).then(({data}) => {
        this.emailConfig = data
        this.step = 2
      }).finally(() => this.loaded())
    },
    finish () {
      console.log('finish')
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

<style lang="css">
</style>
