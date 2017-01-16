<template lang="pug">
div
  el-form
    el-steps(:space="200", :active="1")
      el-step(title="邮箱配置" description="输入邮箱配置，作为服务器发件方的配置")
      el-step(title="账号配置" description="后台的管理员端账号配置")
      el-step(title="账号验证" description="后台管理端账号验证")
    el-button(type="primary") 下一步
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
