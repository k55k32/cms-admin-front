<template lang="pug">
div
  .actions
    el-button(type="primary" @click="sendLogDialog = true") 查看日志
    el-button(type="primary" @click="sendEmailShow()") 发送邮件
    el-button(type="primary" @click="edit()") 新增
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
    el-table-column(prop="smtpHost" label="Host")
    el-table-column(prop="emailAccount" label="名称")
    el-table-column(label="状态")
      template(scope="scope")
        el-switch(v-model="scope.row.enable" on-text="启用" off-text="禁用" @change="changeEnable(scope.row.id, scope.row.enable)")
    el-table-column(label="操作" )
      template(scope="scope")
        el-button(size="small", @click="edit(scope.row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(scope.row.id)") 删除
  .pagination
    el-pagination(layout="prev, pager, next", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")
  el-dialog(title="新增", v-model="editDialog", v-if="editDialog")
    edit(:data="editData" @save="save" @cancel="editDialog = false" v-loading="saveLoading")
  el-dialog(title="发送邮件", v-model="sendEmailDialog", size="full")
    send-email(@save="sendEmailAction" v-loading="saveLoading")
  el-dialog(title="发送日志", v-model="sendLogDialog" size="large")
    send-log
</template>

<script>
import DTMix from 'mix/DTMix'
import edit from './edit'
import sendEmail from './sendEmail'
import sendLog from './sendLog'
export default {
  mixins: [DTMix],
  components: { edit, sendEmail, sendLog },
  data () {
    return {
      sendEmailDialog: false,
      sendLogDialog: false
    }
  },
  methods: {
    sendEmailAction (form) {
      this.saveLoading = true
      this.$post('email-config/send', form).then(() => {
        this.$message.success('发送成功')
        this.sendEmailDialog = false
      }).finally(() => {
        this.saveLoading = false
      })
    },
    sendEmailShow () {
      this.sendEmailDialog = true
    },
    changeEnable (id, enable) {
      this.$post('email-config/change-enable', {id, enable}).then(() => {
        this.loadPage()
      })
    }
  }
}
</script>

<style lang="less">
</style>
